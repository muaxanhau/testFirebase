import {Alert} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
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

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable>
      <ButtonComponent
        title="Friend"
        color="warning"
        onPress={() => navigation.navigate('Friend')}
      />
      <ButtonComponent title="Map" onPress={() => navigation.navigate('Map')} />

      <ButtonComponent title="Logout" color="fail" onPress={logout} />
    </ScreenLayoutComponent>
  );
};
