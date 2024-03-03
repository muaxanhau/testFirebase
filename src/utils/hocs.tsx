import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();
export const withProvider =
  (Component: FC): FC =>
  () =>
    (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Component />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </NavigationContainer>
      </QueryClientProvider>
    );
