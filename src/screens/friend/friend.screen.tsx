import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListUserComponent} from './components';
import {ScreenBaseModel} from 'models';
import {colors} from 'values';
import {ScreenLayoutComponent} from 'components';

export const FriendScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent>
      <ListUserComponent />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
