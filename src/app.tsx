import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from 'navigations';
import {useFirstCheckNavigation, useFirstSetupApp, withProvider} from 'utils';
import {LoaderComponent} from 'components';

export const App: FC = withProvider(() => {
  useFirstSetupApp();
  useFirstCheckNavigation();

  return (
    <>
      <StatusBar hidden translucent />

      {/* don't need use global loader anymore */}
      {/* <LoaderComponent /> */}

      <MainStackNavigation />
    </>
  );
});
