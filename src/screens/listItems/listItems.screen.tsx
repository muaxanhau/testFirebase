import {StyleSheet, Text} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {useGetAllCategoriesAndItemsRepo} from 'repositories';

export const ListItemsScreen: FC<ScreenBaseModel> = () => {
  const {categoriesWithItems} = useGetAllCategoriesAndItemsRepo();

  useEffect(() => {
    console.log(categoriesWithItems?.[0]?.items);
  }, [categoriesWithItems]);

  return (
    <ScreenLayoutComponent disablePaddingTop title="Items">
      <Text>ListItemsScreen</Text>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
