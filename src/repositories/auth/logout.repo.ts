import auth from '@react-native-firebase/auth';
import {useQueryClient} from '@tanstack/react-query';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {resetAllStores} from 'stores';
import {utils} from 'utils';

type LogoutProps = {onSuccess?: () => void} | void;
type LogoutOutput = void;
export const useLogoutRepo = (props: LogoutProps) => {
  const queryClient = useQueryClient();

  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await auth().signOut();
    },
    onSuccess: () => {
      resetAllStores();
      queryClient.clear();

      if (typeof props === 'undefined') return;
      props.onSuccess?.();
    },
  });

  return {logout, ...rest};
};
