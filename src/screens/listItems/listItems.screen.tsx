import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {ListItemsComponent} from './components';
import {useMainStackNavigation} from 'utils';
import {valueStyles} from 'values';

export const ListItemsScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();

  const onPress = () => navigation.navigate('ListCarts');

  return (
    <ScreenLayoutComponent title="Items">
      <ButtonComponent
        title="Cart"
        onPress={onPress}
        type="outline"
        style={styles.button}
      />

      <ListItemsComponent />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: valueStyles.margin2,
  },
});
