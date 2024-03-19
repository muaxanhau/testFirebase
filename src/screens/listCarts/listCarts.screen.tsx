import React from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {ListCartsComponent} from './components';

export const ListCartsScreen: ScreenBaseModel = () => {
  return (
    <ScreenLayoutComponent disablePaddingTop>
      <ListCartsComponent />
    </ScreenLayoutComponent>
  );
};
