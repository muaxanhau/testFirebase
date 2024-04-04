import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppQueryClient} from './hooks';

export const withProvider = (Component: FC): FC =>
  withNavigationContainer(() => {
    const appQueryClient = useAppQueryClient();

    return (
      <QueryClientProvider client={appQueryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <Component />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  });

const withNavigationContainer =
  (Component: FC): FC =>
  () => {
    return (
      <NavigationContainer>
        <Component />
      </NavigationContainer>
    );
  };
