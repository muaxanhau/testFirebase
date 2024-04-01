import React from 'react';
import {ScreenBaseModel} from 'models';
import {useMainStackNavigation} from 'utils';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';

export const HomeScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();

  const onPressProfile = () => navigation.navigate('Profile');
  const onPressItems = () => navigation.navigate('ListItems');
  const onPressCategories = () => navigation.navigate('ListCategories');

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable>
      <ButtonComponent title="Profile" onPress={onPressProfile} />

      <ButtonComponent title="Items" color="success" onPress={onPressItems} />

      <ButtonComponent
        title="CRUD Categories"
        color="success"
        type="outline"
        onPress={onPressCategories}
      />
    </ScreenLayoutComponent>
  );
};
