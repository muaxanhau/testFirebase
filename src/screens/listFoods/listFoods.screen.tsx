import React, {useEffect, useState} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  FlatListComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {
  useGetAllCategoriesRepo,
  useGetAllFoodsRepo,
  useGetAllSubCategoriesRepo,
} from 'repositories';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {utils} from 'utils';
import {colors, valueStyles} from 'values';
import {RouteProp, useRoute} from '@react-navigation/native';

export const ListFoodsScreen: ScreenBaseModel = () => {
  const {params} = useRoute<RouteProp<MainStackNavigationModel, 'ListFoods'>>();
  const {restaurantId} = params;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>('');
  const {categories} = useGetAllCategoriesRepo();
  const {subCategories} = useGetAllSubCategoriesRepo();
  const {foods} = useGetAllFoodsRepo({
    restaurantId,
    categoryId: selectedCategoryId,
    subCategoryId: selectedSubCategoryId,
  });

  const onPressCategory = (id: string) => () => {
    setSelectedCategoryId(id);
  };
  const onPressSubCategory = (id: string) => () => {
    setSelectedSubCategoryId(id);
  };

  return (
    <ScreenLayoutComponent title="Foods" paddingHorizontal>
      <View style={styles.header}>
        <View style={styles.columnLeft} />
        <FlatListComponent
          horizontal
          contentContainerStyle={[styles.listContainer, styles.listHeader]}
          keyExtractor={({id}) => id}
          data={categories}
          renderItem={({item}) => {
            const selected = item.id === selectedCategoryId;
            const borderColor = selected ? colors.red : colors.primary300;

            return (
              <TouchableOpacity onPress={onPressCategory(item.id)}>
                <TextComponent style={{...styles.itemWrapper, borderColor}}>
                  {item.name}
                </TextComponent>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.columnLeft}>
          <FlatListComponent
            contentContainerStyle={styles.listContainer}
            keyExtractor={({id}) => id}
            data={subCategories}
            renderItem={({item}) => {
              const selected = item.id === selectedSubCategoryId;
              const borderColor = selected ? colors.red : colors.primary300;

              return (
                <TouchableOpacity onPress={onPressSubCategory(item.id)}>
                  <TextComponent style={{...styles.itemWrapper, borderColor}}>
                    {item.name}
                  </TextComponent>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <FlatListComponent
          contentContainerStyle={styles.listContainer}
          keyExtractor={({id}) => id}
          data={foods}
          renderItem={({item}) => (
            <TextComponent style={styles.itemWrapper}>
              {item.name}
            </TextComponent>
          )}
        />
      </View>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: valueStyles.gap2,
  },
  listHeader: {
    paddingBottom: valueStyles.gap2,
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
  listContainer: {
    gap: valueStyles.gap,
  },
  itemWrapper: {
    padding: valueStyles.gap,
    borderWidth: valueStyles.line2,
    borderRadius: valueStyles.borderRadius2,
  },
});
