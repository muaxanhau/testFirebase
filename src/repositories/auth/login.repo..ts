import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type LoginProps = {
  onSuccess?: () => void;
};
type LoginInput = {email: string; password: string};
type LoginOutput = FirebaseAuthTypes.UserCredential;
export const useLoginRepo = ({onSuccess}: LoginProps) => {
  const {mutate: login, ...rest} = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.LOGIN],
    mutationFn: async ({email, password}) => {
      const user = await auth().signInWithEmailAndPassword(email, password);
      return user;
    },
    onSuccess,
  });

  return {login, ...rest};
};
