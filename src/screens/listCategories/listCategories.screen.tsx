import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {valueStyles} from 'values';
import {ListCategoriesComponent} from './components';
import {ButtonComponent, ScreenLayoutComponent} from 'components';
import {useMainStackNavigation} from 'utils';

export const ListCategoriesScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();

  const onPress = () => navigation.navigate('AddCategory');

  return (
    <ScreenLayoutComponent disablePaddingTop title="Swipe to edit/delete">
      <ListCategoriesComponent />

      <ButtonComponent
        title="Add new category"
        onPress={onPress}
        style={styles.button}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  button: {marginHorizontal: valueStyles.margin2},
});
