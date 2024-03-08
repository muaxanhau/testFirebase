import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {utils} from 'utils';

type ConfirmOtpProps = {onSuccess?: () => void} | void;
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
      await utils.sleep(devToolConfig.delayFetching);

      const user = await confirmation.confirm(otp);
      return user;
    },
    ...props,
  });

  return {confirmOtp, ...rest};
};
