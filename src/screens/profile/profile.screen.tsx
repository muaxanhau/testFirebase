import {Alert, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {colors, valueStyles} from 'values';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {useMainStackNavigation, useResetMainStackNavigation} from 'utils';
import {useLogoutRepo} from 'repositories';

export const ProfileScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {logout} = useLogoutRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Logout successful');
      resetMainStackNavigation('Login');
    },
  });

  const onPress = () => logout();

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable>
      <ButtonComponent
        title="Friend"
        color="warning"
        onPress={() => {
          navigation.navigate('Friend');
        }}
      />

      <ButtonComponent title="Logout" color="fail" onPress={onPress} />
    </ScreenLayoutComponent>
  );
};
