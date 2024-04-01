import {useResetMainStackNavigation} from 'utils';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  InfiniteData,
} from '@tanstack/react-query';
import {config} from 'config';
import {useEffect} from 'react';
import {Alert} from 'react-native';

const useErrorEffect = (error: unknown) => {
  const reset = useResetMainStackNavigation();
  useEffect(() => {
    if (!error) return;

    // do something else here

    if (typeof error === 'string') {
      Alert.alert('Warning', error);

      error.includes('Unauthorized') && reset('Login');
      return;
    }

    // for firebase exception
    const e = error as {message: string; code: string};
    Alert.alert('Warning', e.message);
  }, [error]);
};

type ApiQueryProps<Output> = UseQueryOptions<Output, unknown, Output, QueryKey>;
export const useApiQuery = <Output>(props: ApiQueryProps<Output>) => {
  const {error, ...rest} = useQuery<Output, unknown>({
    ...props,
    staleTime: config.staleTime,
  });

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};

type ApiMutationProps<Output, Input> = UseMutationOptions<
  Output,
  unknown,
  Input
>;
export const useApiMutation = <Output, Input = void>(
  props: ApiMutationProps<Output, Input>,
) => {
  const {error, ...rest} = useMutation<Output, unknown, Input>(props);

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};

type ApiInfiniteQueryProps<Output> = UseInfiniteQueryOptions<
  Output,
  unknown,
  InfiniteData<Output, unknown>,
  Output,
  QueryKey,
  number
>;
export const useApiInfiniteQuery = <Output>(
  props: ApiInfiniteQueryProps<Output>,
) => {
  const {error, ...rest} = useInfiniteQuery<
    Output,
    unknown,
    InfiniteData<Output>,
    QueryKey,
    number
  >({...props, staleTime: config.staleTime});

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};
