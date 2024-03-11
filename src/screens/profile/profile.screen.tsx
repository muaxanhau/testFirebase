import {Alert} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {useMainStackNavigation, useResetMainStackNavigation} from 'utils';
import {useLogoutRepo} from 'repositories';

export const ProfileScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {logout, isPending} = useLogoutRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Logout successful');
      resetMainStackNavigation('Login');
    },
  });

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable>
      <ButtonComponent title="Map" onPress={() => navigation.navigate('Map')} />

      <ButtonComponent
        title="Logout"
        color="fail"
        onPress={logout}
        isLoading={isPending}
      />
    </ScreenLayoutComponent>
  );
};
