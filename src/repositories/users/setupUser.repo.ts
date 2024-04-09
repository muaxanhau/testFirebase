import {KeyService, service, useApiQuery} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import messaging from '@react-native-firebase/messaging';

export type SetupUserOutput = null;
export type SetupUserInput = {deviceId: string};
export const useSetupUserRepo = () => {
  const query = useApiQuery<SetupUserOutput>({
    queryKey: [KeyService.SETUP_USER],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const result = await requestUserPermission();
      if (!result) return null;

      const deviceId = await getFCMToken();
      const response = await service.post<SetupUserOutput, SetupUserInput>(
        'users/setup',
        {
          deviceId,
        },
      );
      return response.data;
    },
  });

  return query;
};

const requestUserPermission = async () => {
  if (utils.isAndroid()) return true;

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
  }

  return enabled;
};

const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};
