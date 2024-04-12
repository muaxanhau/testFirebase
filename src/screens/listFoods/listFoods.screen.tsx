import React, {useRef} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {ScreenLayoutComponent, TextComponent} from 'components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {utils} from 'utils';
import {colors, valueStyles} from 'values';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  ListCategoriesComponent,
  ListCategoriesRefProps,
  ListFoodsComponent,
  ListFoodsRefProps,
  ListSubCategoriesComponent,
  ListSubCategoriesRefProps,
} from './components';

export const ListFoodsScreen: ScreenBaseModel = () => {
  const {
    params: {restaurantId, restaurantName},
  } = useRoute<RouteProp<MainStackNavigationModel, 'ListFoods'>>();
  const refListCategories = useRef<ListCategoriesRefProps>(null);
  const refListSubCategories = useRef<ListSubCategoriesRefProps>(null);
  const refListFoods = useRef<ListFoodsRefProps>(null);

  const onPressClear = () => {
    refListCategories.current?.reset();
    refListSubCategories.current?.reset();
    refListFoods.current?.reset();
  };
  const onChangeCategoryId = (id: string) => {
    refListSubCategories.current?.setCategoryId(id);
    refListFoods.current?.setCategoryId(id);
    refListFoods.current?.setSubCategoryId('');
  };
  const onChangeSubCategoryId = (id: string) => {
    refListFoods.current?.setSubCategoryId(id);
  };

  return (
    <ScreenLayoutComponent title={restaurantName} paddingHorizontal>
      <View style={styles.header}>
        <TouchableOpacity style={styles.columnLeft} onPress={onPressClear}>
          <TextComponent
            style={{
              ...styles.itemWrapper,
              borderColor: colors.primary,
              textAlign: 'center',
            }}>
            Clear
          </TextComponent>
        </TouchableOpacity>

        <ListCategoriesComponent
          ref={refListCategories}
          restaurantId={restaurantId}
          onChangeCategoryId={onChangeCategoryId}
        />
      </View>

      <View style={styles.main}>
        <ListSubCategoriesComponent
          ref={refListSubCategories}
          restaurantId={restaurantId}
          onChangeSubCategoryId={onChangeSubCategoryId}
        />

        <ListFoodsComponent ref={refListFoods} restaurantId={restaurantId} />
      </View>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: valueStyles.gap2,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: valueStyles.gap2,
  },
  columnLeft: {
    width: utils.wp(25),
    minWidth: 100,
  },
  itemWrapper: {
    padding: valueStyles.gap,
    borderWidth: valueStyles.line2,
    borderRadius: valueStyles.borderRadius2,
  },
});
