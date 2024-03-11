import {Alert} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {useMainStackNavigation, useResetMainStackNavigation} from 'utils';
import {useGetUserRepo, useLogoutRepo} from 'repositories';

export const ProfileScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {user} = useGetUserRepo();
  const {logout, isPending} = useLogoutRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Logout successful');
      resetMainStackNavigation('Login');
    },
  });

  const title = user?.role.toUpperCase();

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable title={title}>
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
