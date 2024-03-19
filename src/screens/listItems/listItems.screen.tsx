import {StyleSheet} from 'react-native';
import React from 'react';
import {ScreenBaseModel} from 'models';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {ListItemsComponent} from './components';
import {useMainStackNavigation} from 'utils';
import {valueStyles} from 'values';

export const ListItemsScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();

  const onPress = () => navigation.navigate('ListCarts');

  return (
    <ScreenLayoutComponent title="Items" disablePaddingTop>
      <ListItemsComponent />

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
