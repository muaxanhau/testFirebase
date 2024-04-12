import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {
  useTestQueryRepo,
  useTestMutationRepo,
  useUnauthorizeRepo,
} from 'repositories';

export const StatusFoodScreen: ScreenBaseModel = () => {
  return (
    <ScreenLayoutComponent gap>
      <TextComponent type="h1">Food</TextComponent>
    </ScreenLayoutComponent>
  );
};
