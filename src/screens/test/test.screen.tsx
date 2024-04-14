import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useUnauthorizeRepo, stripePaymentRepo} from 'repositories';

export const TestScreen: ScreenBaseModel = () => {
  const {unauthorize, isPending: isLoadingAuthorize} = useUnauthorizeRepo();
  const {getStripePaymentUrl, isPending: isLoadingStripePayment} =
    stripePaymentRepo();

  return (
    <ScreenLayoutComponent style={styles.container} title="Test" gap>
      <TextComponent type="h1">Test</TextComponent>

      <ButtonComponent
        title="Force logout server"
        onPress={unauthorize}
        isLoading={isLoadingAuthorize}
        color="fail"
      />

      <ButtonComponent
        title="Get payment url"
        onPress={getStripePaymentUrl}
        isLoading={isLoadingStripePayment}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
