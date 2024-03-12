import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {useGetAllUserCartsRepo} from 'repositories/carts/getAllUserCarts.repo';

export const ListCartsScreen: FC<ScreenBaseModel> = () => {
  const {carts} = useGetAllUserCartsRepo();

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return (
    <ScreenLayoutComponent>
      <Text>ListCartsScreen</Text>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
