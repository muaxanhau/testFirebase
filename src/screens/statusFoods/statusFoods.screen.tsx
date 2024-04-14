import React from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {StatusFoodsListComponent} from './components';

export const StatusFoodsScreen: ScreenBaseModel = () => {
  return (
    <ScreenLayoutComponent gap title="Buyer - Seller" disablePaddingTop>
      <StatusFoodsListComponent />
    </ScreenLayoutComponent>
  );
};
