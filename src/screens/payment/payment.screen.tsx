import React from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {RouteProp, useRoute} from '@react-navigation/native';
import WebView, {WebViewNavigation} from 'react-native-webview';

export const PaymentScreen: ScreenBaseModel = () => {
  const {params} = useRoute<RouteProp<MainStackNavigationModel, 'Payment'>>();
  const {url, onSuccess, onCancel} = params;

  const onNavigationStateChange = (e: WebViewNavigation) => {
    const url = e.url.toLowerCase();

    const isSuccess = url.includes('success');
    if (isSuccess) {
      onSuccess();
      return;
    }

    const isCancel = url.includes('cancel');
    if (isCancel) {
      onCancel();
      return;
    }
  };

  return (
    <ScreenLayoutComponent disablePaddingTop>
      <WebView
        source={{uri: url}}
        onNavigationStateChange={onNavigationStateChange}
      />
    </ScreenLayoutComponent>
  );
};
