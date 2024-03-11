import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';

export const ListCartsScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent>
      <Text>ListCartsScreen</Text>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
