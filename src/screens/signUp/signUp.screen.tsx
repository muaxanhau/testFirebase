import {Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGoBackScreen, useHookForm} from 'utils';
import {loginFormSchema} from 'models';
import {ButtonComponent, InputTextComponent, TextComponent} from 'components';
import {colors, valueStyles} from 'values';
import {useSignUpRepo} from 'repositories';

export const SignUpScreen: FC = () => {
  const goBack = useGoBackScreen();
  const {control, handleSubmit} = useHookForm({schema: loginFormSchema});
  const {signUp} = useSignUpRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Sign up successful');
      goBack();
    },
  });

  const onPressSignUp = handleSubmit(data => signUp(data));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <TextComponent type="h1">Sign up</TextComponent>

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

        <ButtonComponent title="Sign up" onPress={onPressSignUp} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: valueStyles.padding2,
    backgroundColor: colors.white,
  },
  wrapper: {
    gap: valueStyles.gap,
  },
});
