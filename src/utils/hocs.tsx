import React, {FC} from 'react';
import {NavigationContainer, PathConfigMap} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppQueryClient} from './hooks';
import {MainStackNavigationModel} from 'models';

export const withProvider =
  (Component: FC): FC =>
  () => {
    const appQueryClient = useAppQueryClient();

    return (
      <QueryClientProvider client={appQueryClient}>
        <SafeAreaProvider>
          <Component />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  };

const pathConfig: PathConfigMap<MainStackNavigationModel> = {
  Profile: 'profile',
  DetailCategory: {
    path: 'detail-category/:id',
    parse: {
      id: id => id,
    },
  },
};
export const withNavigationContainer =
  (Component: FC): FC =>
  () => {
    return (
      <NavigationContainer<MainStackNavigationModel>
        linking={{
          prefixes: ['testfirebase://app'],
          config: {screens: pathConfig},
        }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Component />
        </GestureHandlerRootView>
      </NavigationContainer>
    );
  };
