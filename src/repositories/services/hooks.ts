import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {config} from 'config';
import {useEffect} from 'react';
import {Alert} from 'react-native';

const useErrorEffect = (error?: string | null) => {
  useEffect(() => {
    if (!error) return;

    // do something here
    Alert.alert('Warning', error);
  }, [error]);
};

type ApiQueryProps<Output> = UseQueryOptions<Output, string, Output, QueryKey>;
export const useApiQuery = <Output>(props: ApiQueryProps<Output>) => {
  const {error, ...rest} = useQuery<Output, string>({
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
  string,
  Input
>;
export const useApiMutation = <Output, Input = void>(
  props: ApiMutationProps<Output, Input>,
) => {
  const {error, ...rest} = useMutation<Output, string, Input>(props);

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};
