import auth from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type LogoutProps = {
  onSuccess?: () => void;
} | void;
type LogoutOutput = null;
export const useLogoutRepo = (props: LogoutProps) => {
  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await auth().signOut();
      return null;
    },
    ...props,
  });

  return {logout, ...rest};
};
