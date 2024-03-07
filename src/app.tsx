import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from 'navigations';
import {useFirstSetupApp, withProvider} from 'utils';

export const App: FC = withProvider(() => {
  useFirstSetupApp();

  return (
    <>
      <StatusBar hidden translucent />

      {/* don't need to use global loader anymore */}
      {/* <LoaderComponent /> */}

      <MainStackNavigation />
    </>
  );
});
