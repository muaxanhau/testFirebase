import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TabLayoutComponent,
} from 'components';
import {ListItemsComponent} from './components';
import {useMainStackNavigation} from 'utils';
import {valueStyles} from 'values';
import {useGetAllCategoriesWithItemsRepo} from 'repositories';

export const ListItemsScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();
  const {categoriesWithItems} = useGetAllCategoriesWithItemsRepo();

  const titles = categoriesWithItems?.map(category => category.name) || [];
  const contents = (
    categoriesWithItems?.map(category => category.id) || []
  ).map(id => <ListItemsComponent id={id} />);

  const onPress = () => navigation.navigate('ListCarts');

  return (
    <ScreenLayoutComponent title="Items" disablePaddingTop>
      <TabLayoutComponent titles={titles} contents={contents} />

      <ButtonComponent
        title="Cart"
        onPress={onPress}
        type="outline"
        style={styles.button}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: valueStyles.margin2,
  },
});
