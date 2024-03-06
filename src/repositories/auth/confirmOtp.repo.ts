import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyService, useApiMutation} from 'repositories/services';

type ConfirmOtpProps = {
  onSuccess?: () => void;
} | void;
type ConfirmOtpInput = {
  confirmation: FirebaseAuthTypes.ConfirmationResult;
  otp: string;
};
type ConfirmOtpOutput = FirebaseAuthTypes.UserCredential | null;
export const useConfirmOtpRepo = (props: ConfirmOtpProps) => {
  const {mutate: confirmOtp, ...rest} = useApiMutation<
    ConfirmOtpOutput,
    ConfirmOtpInput
  >({
    mutationKey: [KeyService.CONFIRM_OTP],
    mutationFn: async ({confirmation, otp}) => {
      const user = await confirmation.confirm(otp);
      return user;
    },
    ...props,
  });

  return {confirmOtp, ...rest};
};
