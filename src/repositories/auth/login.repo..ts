import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type LoginProps = {onSuccess?: () => void} | void;
type LoginInput = {email: string; password: string};
type LoginOutput = FirebaseAuthTypes.UserCredential;
export const useLoginRepo = (props: LoginProps) => {
  const {mutate: login, ...rest} = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.LOGIN],
    mutationFn: async ({email, password}) => {
      const user = await auth().signInWithEmailAndPassword(email, password);
      return user;
    },
    ...props,
  });

  return {login, ...rest};
};
