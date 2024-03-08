import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {ListItemsComponent} from './components';

export const ListItemsScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent disablePaddingTop title="Items">
      <ListItemsComponent />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
