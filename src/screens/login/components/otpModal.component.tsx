import {Alert, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {ComponentBaseModel} from 'models';
import {
  ButtonComponent,
  InputOTPComponent,
  InputOTPRefProps,
  ModalComponent,
  ModalRefProps,
  TextComponent,
} from 'components';
import {commonStyles} from 'values';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useResetMainStackNavigation} from 'utils';

export type OtpModalRefProps = {
  open: (confirmation: FirebaseAuthTypes.ConfirmationResult) => void;
  close: () => void;
};
type OtpModalProps = ComponentBaseModel;
export const OtpModalComponent = forwardRef<OtpModalRefProps, OtpModalProps>(
  ({}, ref) => {
    const resetMainStackNavigation = useResetMainStackNavigation();
    const refOtp = useRef<InputOTPRefProps>(null);
    const refModal = useRef<ModalRefProps>(null);
    const refConfirmation = useRef<FirebaseAuthTypes.ConfirmationResult | null>(
      null,
    );

    const open = (confirmation: FirebaseAuthTypes.ConfirmationResult) => {
      refConfirmation.current = confirmation;
      refModal.current?.open();
    };
    const close = () => {
      refConfirmation.current = null;
      refModal.current?.close();
    };
    const verifyOtp = async (otp: string) => {
      try {
        await refConfirmation.current?.confirm(otp);
        close();
        Alert.alert('Alert', 'Login successful');
        resetMainStackNavigation('Home');
      } catch (e) {
        Alert.alert('Warning', 'Invalid OTP. Please try again');
      }
    };

    const onPress = () => {
      const otp = refOtp.current?.getValue();
      if (!otp) {
        Alert.alert('Warning', 'Please fill OTP');
        return;
      }

      verifyOtp(otp);
    };
    const onShow = () => {
      setTimeout(() => {
        refOtp.current?.focus();
      }, 100);
    };
    const onDismiss = () => refOtp.current?.clearValue();

    useImperativeHandle(ref, () => ({open, close}), []);

    return (
      <ModalComponent ref={refModal} onDismiss={onDismiss} onShow={onShow}>
        <View style={commonStyles.modalContainer}>
          <TextComponent type="h2">Confirm OTP</TextComponent>

          <InputOTPComponent ref={refOtp} onFullOtp={verifyOtp} />

          <ButtonComponent title={'Confirm OTP'} onPress={onPress} />
        </View>
      </ModalComponent>
    );
  },
);
