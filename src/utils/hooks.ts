import {DefaultValues, FieldValues, Path, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Alert, AppState, LayoutChangeEvent, LogBox} from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {MainStackNavigationModel} from 'models';
import {StorageEnum} from 'models';
import {utils} from './utils';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {
  MutationCache,
  onlineManager,
  QueryCache,
  QueryClient,
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from '@tanstack/react-query';
import {z} from 'zod';
import {storageUtil} from './storage.util';
import auth from '@react-native-firebase/auth';
import {resetAllStores, useAuthStore} from 'stores';
import {config} from 'config';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIos from '@react-native-community/push-notification-ios';

export const useAppQueryClient = () => {
  const reset = useResetMainStackNavigation();
  const {androidSetBadge} = usePushNotification();

  const getMessageError = (error: unknown) => {
    if (!error) return undefined;

    if (typeof error === 'string') {
      return error;
    }

    if (typeof error !== 'object') {
      return 'Wrong formatter error';
    }

    if ('message' in error) {
      return error.message as string;
    }

    return 'Unknown error';
  };

  const onError = (error: unknown) => {
    const msg = getMessageError(error);
    if (!msg) return;

    Alert.alert('Warning', msg);
    if (msg.includes('Unauthorized')) {
      reset('Login');

      resetAllStores();
      queryClient.clear();
      androidSetBadge(0);
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: config.staleTime,
          },
        },
        queryCache: new QueryCache({onError}),
        mutationCache: new MutationCache({onError}),
      }),
  );

  return queryClient;
};

export const usePushNotification = () => {
  const setupAndroidChannel = () => {
    if (utils.isIos()) return;

    PushNotification.createChannel(androidChanel, () => {});
  };
  const androidIncreaseBadge = () => {
    PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
      PushNotification.setApplicationIconBadgeNumber(badgeNumber + 1);
    });
  };
  const androidDecreaseBadge = () => {
    PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
      PushNotification.setApplicationIconBadgeNumber(badgeNumber - 1);
    });
  };
  const androidSetBadge = (badge: number) => {
    PushNotification.setApplicationIconBadgeNumber(badge);
  };
  const androidLocalNotification = (title: string, body: string) => {
    PushNotification.localNotification({
      channelId: androidChanel.channelId,
      title,
      message: body || '',
    });
  };
  const iosLocalNotification = (
    messageId: string,
    title: string,
    body: string,
  ) => {
    PushNotificationIos.addNotificationRequest({id: messageId, title, body});
  };
  return {
    setupAndroidChannel,
    androidIncreaseBadge,
    androidDecreaseBadge,
    androidSetBadge,
    androidLocalNotification,
    iosLocalNotification,
  };
};

const useFirstCheckNavigation = () => {
  const resetMainStackNavigation = useResetMainStackNavigation();

  useTimeout(() => {
    const isAuthorized = auth().currentUser !== null;
    resetMainStackNavigation(isAuthorized ? 'Home' : 'Login');
  }, 1000);
};
const useFirstConfigQueryClient = () => {
  useLayoutEffect(() => {
    // event for re-online => refetch data
    onlineManager.setEventListener(setOnline =>
      NetInfo.addEventListener(state => setOnline(!!state.isConnected)),
    );
  }, []);
};
const useFirstConfigAutoClearAppData = () => {
  const {setAuth} = useAuthStore();
  const queryClient = useQueryClient();
  const {androidSetBadge} = usePushNotification();

  useLayoutEffect(() => {
    const tokenListener = auth().onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        setAuth({token});
        return;
      }

      resetAllStores();
      queryClient.clear();
      androidSetBadge(0);
    });

    return () => tokenListener();
  }, []);
};
const androidChanel = {
  channelId: 'TestFirebaseNotificationChanel',
  channelName: 'TestFirebaseNotificationChanel',
} as const;
const useFirstConfigNotification = () => {
  const {
    setupAndroidChannel,
    androidLocalNotification,
    iosLocalNotification,
    androidIncreaseBadge,
    androidDecreaseBadge,
  } = usePushNotification();

  useLayoutEffect(setupAndroidChannel, []);
  useLayoutEffect(() => {
    const unsubscribe = messaging().onMessage(
      async ({notification, messageId}) => {
        if (!notification || !messageId) return;

        const {title, body} = notification;
        if (utils.isIos()) {
          iosLocalNotification(messageId, title || '', body || '');
          return;
        }

        androidLocalNotification(title || '', body || '');
        androidIncreaseBadge();
      },
    );

    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    const unsubscribe =
      messaging().onNotificationOpenedApp(androidDecreaseBadge);

    return unsubscribe;
  }, []);
};

export const useFirstSetupApp = () => {
  useFirstConfigQueryClient();
  useFirstConfigAutoClearAppData();
  useFirstConfigNotification();
  useFirstCheckNavigation();
  useLayoutEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
};

/**
 * It returns an object with a status property that is either 'active' or 'inactive' depending on the
 * current state of the app
 * @returns An object with a status property.
 */
export const useAppState = () => {
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    const subscribe = AppState.addEventListener('change', nextAppState => {
      setStatus(
        prev =>
          (prev = nextAppState.match(/inactive|background/)
            ? 'inactive'
            : 'active'),
      );
    });

    return subscribe.remove;
  }, []);

  return status;
};

export const useAppNetwork = (): 'online' | 'offline' => {
  const {isConnected} = useNetInfo();

  return isConnected ? 'online' : 'offline';
};

export const useCurrentRouteName = (): string => {
  const [name, setName] = useState<string>('Splash');
  const routes = useNavigationState(item => item?.routes || []);

  const routesLength = routes.length;

  useEffect(() => {
    if (!routesLength) {
      return;
    }

    setName(routes[routesLength - 1].name);
  }, [routesLength]);

  return name;
};

type UseHookFormProps<T> = {
  schema: z.Schema<T>;
  defaultValues?: DefaultValues<T>;
};
export const useHookForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: UseHookFormProps<T>) => {
  const {setValue, getValues, ...rest} = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const checkAllFieldsAreNotDataYet = () => {
    const data = getValues();
    const allEmpty = !Object.entries(data).filter(
      ([, value]) => value !== undefined,
    ).length;
    return allEmpty;
  };
  const setDefaultValues = (data?: Partial<T>) => {
    if (!data) return;
    const notDataYet = checkAllFieldsAreNotDataYet();
    if (!notDataYet) return;

    // just can be setDefaultValues when all field are empty
    const values = Object.entries(data).filter(
      ([, value]) => value !== undefined,
    );

    values.forEach(([field, value]) => {
      setValue(field as Path<T>, value);
    });
  };

  return {setValue, getValues, setDefaultValues, ...rest};
};

export const useLocalStorage = <T>(key: StorageEnum) => {
  const [value, setValue] = useState<T>();

  const retrieveItem = useCallback((key: StorageEnum) => {
    const value = storageUtil.retrieve<T>(key);
    setValue(value);
  }, []);
  const set = useCallback(
    (value: T) => {
      storageUtil.store(key, value);
      setValue(value);
    },
    [key],
  );
  const clear = useCallback(() => {
    storageUtil.remove(key);
    setValue(undefined);
  }, [key]);

  useEffect(() => {
    retrieveItem(key);
  }, [key]);

  return {
    value,
    set,
    clear,
    refresh: retrieveItem,
  };
};

export const useTimeout = (callback: () => void, delay: number) => {
  const refCallback = useRef<() => void>(callback);
  const refTimeout = useRef<NodeJS.Timeout>();

  const set = useCallback(() => {
    refTimeout.current = setTimeout(() => refCallback.current(), delay);
  }, [delay]);
  const clear = useCallback(() => {
    refTimeout.current && clearTimeout(refTimeout.current);
  }, []);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    set();

    return clear;
  }, []);

  return {reset, clear};
};

export const useDebounce = (
  callback: () => void,
  delay: number,
  deps?: React.DependencyList,
) => {
  const {clear, reset} = useTimeout(callback, delay);

  useEffect(reset, [deps, reset]);
  useEffect(clear, []);
};

export const useScreenFocusedEffect = (
  callback: () => void,
  type: 'everyTime' | 'afterFirstTime' = 'everyTime',
) => {
  const isFocused = useIsFocused();
  const refCallback = useRef<() => void>(callback);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    type === 'everyTime' && isFocused && refCallback.current();
  }, [isFocused]);
  useEffect(() => {
    if (type !== 'afterFirstTime') {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    isFocused && refCallback.current();
  }, [isFocused]);
};

export const useMainStackNavigation = () =>
  useNavigation<NavigationProp<MainStackNavigationModel>>();

export const useResetMainStackNavigation = () => {
  const navigation = useMainStackNavigation();

  const reset = (name: keyof MainStackNavigationModel) =>
    navigation.reset({index: 0, routes: [{name}]});
  return reset;
};

export const useGoBackScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    const canGoBack = navigation.canGoBack();

    if (!canGoBack) {
      utils.log(
        'can go back',
        "call from 'hooks.ts' - useGoBackScreen",
        'danger',
      );
      return;
    }

    navigation.goBack();
  };

  return goBack;
};

/**
 *
 * @param value initial value
 * @returns curr state, prev state, setState method
 */
export const usePreviousState = <T>(value: T): [T, T, (state: T) => void] => {
  const [currState, setCurrState] = useState<T>(value);
  const refPrevState = useRef<T>(value);

  const setState = (state: T) => {
    refPrevState.current = currState;
    setCurrState(state);
  };

  return [currState, refPrevState.current, setState];
};

/**
 * detect when fetch api/firebase
 * @returns isLoading
 */
export const useIsLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return isLoading;
};

export const useLayout = () => {
  const [measure, setMeasure] = useState({width: 0, height: 0, x: 0, y: 0});
  const refFirstSetHeight = useRef(false);

  const onLayout = (event: LayoutChangeEvent) => {
    if (refFirstSetHeight.current) return;

    const {height, width} = event.nativeEvent.layout;
    if (width === 0 || height === 0) return;

    refFirstSetHeight.current = true;
    setMeasure(event.nativeEvent.layout);
  };

  return {
    x: measure.x,
    y: measure.y,
    width: measure.width,
    height: measure.height,
    onLayout,
  };
};
