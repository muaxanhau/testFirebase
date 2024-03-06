import React, {FC} from 'react';
import {ListUserComponent} from './components';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';

export const FriendScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent>
      <ListUserComponent />
    </ScreenLayoutComponent>
  );
};
