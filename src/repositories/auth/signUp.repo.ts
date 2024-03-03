import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type LoginProps = {
  onSuccess?: () => void;
};
type LoginInput = {email: string; password: string};
type LoginOutput = FirebaseAuthTypes.UserCredential;
export const useSignUpRepo = ({onSuccess}: LoginProps) => {
  const {mutate: signUp, ...rest} = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.SIGN_UP],
    mutationFn: async ({email, password}) => {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      return user;
    },
    onSuccess,
  });

  return {signUp, ...rest};
};
