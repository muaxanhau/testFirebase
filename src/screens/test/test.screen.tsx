import React from 'react';
import {StyleSheet, Linking, Alert} from 'react-native';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useUnauthorizeRepo, stripePaymentRepo} from 'repositories';
import {useMainStackNavigation} from 'utils';

export const TestScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();
  const {unauthorize, isPending: isLoadingAuthorize} = useUnauthorizeRepo();
  const {getStripePaymentUrl, isPending: isLoadingStripePayment} =
    stripePaymentRepo({
      onSuccess: ({url}) => {
        const invalidUrl = !url?.length;
        if (invalidUrl) {
          Alert.alert('Warning', 'Server generate payment fail');
          return;
        }

        navigation.navigate('Payment', {
          url,
          onSuccess: () => {
            Alert.alert('Alert', 'Payment success');
            navigation.goBack();
          },
          onCancel: navigation.goBack,
        });
      },
    });

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
        title="Deep link Profile"
        onPress={() => Linking.openURL('testfirebase://app/profile')}
      />
      <ButtonComponent
        title="Deep link Detail Category"
        onPress={() => {
          Linking.openURL(
            'testfirebase://app/detail-category/6gZZFarUAetYvYWLAsxD',
          );
        }}
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
