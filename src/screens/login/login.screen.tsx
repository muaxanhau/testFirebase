import {Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
import React, {FC, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useHookForm,
  useMainStackNavigation,
  useResetMainStackNavigation,
} from 'utils';
import {loginFormSchema} from 'models';
import {
  ButtonComponent,
  InputTextComponent,
  ModalRefProps,
  TextComponent,
} from 'components';
import {colors, valueStyles} from 'values';
import {LoginPhoneModalComponent} from './components';
import {useLoginRepo} from 'repositories';

export const LoginScreen: FC = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {control, handleSubmit} = useHookForm({schema: loginFormSchema});
  const refLoginPhoneModal = useRef<ModalRefProps>(null);
  const {login} = useLoginRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Login successful');
      resetMainStackNavigation('Home');
    },
  });

  const onPressLogin = handleSubmit(data => login(data));
  const onPressSignUp = () => navigation.navigate('SignUp');
  const onPressLoginWithPhone = () => refLoginPhoneModal.current?.open();

  return (
    <>
      <LoginPhoneModalComponent ref={refLoginPhoneModal} />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper} enabled>
          <TextComponent type="h1">Login</TextComponent>

          <InputTextComponent
            control={control}
            name="email"
            title="Email"
            placeholder="Email"
            autoCapitalize="none"
          />

          <InputTextComponent
            control={control}
            name="password"
            title="Password"
            placeholder="Password"
            secureTextEntry
          />

          <ButtonComponent title="Login" onPress={onPressLogin} />
        </KeyboardAvoidingView>

        <ButtonComponent
          title="Sign up"
          type="outline"
          onPress={onPressSignUp}
        />
        <ButtonComponent
          title="Login with Phone"
          color="warning"
          type="outline"
          onPress={onPressLoginWithPhone}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: valueStyles.padding2,
    gap: valueStyles.gap,
    backgroundColor: colors.white,
  },
  wrapper: {
    gap: valueStyles.gap,
  },
});
