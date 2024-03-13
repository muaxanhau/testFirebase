import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {config} from 'config';
import {ResponseErrorModel} from 'models';
import {useEffect} from 'react';
import {Alert} from 'react-native';

const useErrorEffect = (error: ResponseErrorModel | null) => {
  useEffect(() => {
    if (!error) return;

    Alert.alert('Warning', error.message);
  }, [error]);
};

type ApiQueryProps<Output> = UseQueryOptions<
  Output,
  ResponseErrorModel,
  Output,
  QueryKey
>;
export const useApiQuery = <Output>(props: ApiQueryProps<Output>) => {
  const {error, ...rest} = useQuery<Output, ResponseErrorModel>({
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
  ResponseErrorModel,
  Input
>;
export const useApiMutation = <Output, Input = void>(
  props: ApiMutationProps<Output, Input>,
) => {
  const {error, ...rest} = useMutation<Output, ResponseErrorModel, Input>(
    props,
  );

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};
