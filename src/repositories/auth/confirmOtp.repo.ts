import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {useCreateUserRepo} from 'repositories/users';
import {utils} from 'utils';

type ConfirmOtpProps = {onSuccess?: () => void} | void;
type ConfirmOtpInput = {
  confirmation: FirebaseAuthTypes.ConfirmationResult;
  otp: string;
};
type ConfirmOtpOutput = FirebaseAuthTypes.UserCredential | null;
export const useConfirmOtpRepo = (props: ConfirmOtpProps) => {
  const {createUser} = useCreateUserRepo();

  const {mutate: confirmOtp, ...rest} = useApiMutation<
    ConfirmOtpOutput,
    ConfirmOtpInput
  >({
    mutationKey: [KeyService.CONFIRM_OTP],
    mutationFn: async ({confirmation, otp}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await confirmation.confirm(otp);

      user &&
        createUser({id: user.user.uid, phone: user.user.phoneNumber || ''});

      return user;
    },
    ...props,
  });

  return {confirmOtp, ...rest};
};
