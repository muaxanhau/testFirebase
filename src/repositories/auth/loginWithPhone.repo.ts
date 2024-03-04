import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type LoginWithPhoneProps = {
  onSuccess?: (data: LoginWithPhoneOutput) => void;
} | void;
type LoginWithPhoneInput = {phone: string};
type LoginWithPhoneOutput = FirebaseAuthTypes.ConfirmationResult;
export const useLoginWithPhoneRepo = (props: LoginWithPhoneProps) => {
  const {mutate: loginWithPhone, ...rest} = useApiMutation<
    LoginWithPhoneOutput,
    LoginWithPhoneInput
  >({
    mutationKey: [KeyService.LOGIN_WITH_PHONE],
    mutationFn: async ({phone}) => {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      return confirmation;
    },
    ...props,
  });

  return {loginWithPhone, ...rest};
};
