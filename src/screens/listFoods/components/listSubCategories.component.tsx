import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {FlatListComponent, TextComponent} from 'components';
import {colors, valueStyles} from 'values';
import {utils} from 'utils';
import {useGetAllSubCategoriesRepo} from 'repositories';

export type ListSubCategoriesRefProps = {
  setCategoryId: (id: string) => void;
  reset: () => void;
};
type ListSubCategoriesProps = ComponentBaseModel<{
  restaurantId: string;
  onChangeSubCategoryId: (id: string) => void;
}>;
export const ListSubCategoriesComponent = forwardRef<
  ListSubCategoriesRefProps,
  ListSubCategoriesProps
>(({restaurantId, onChangeSubCategoryId}, ref) => {
  const [categoryId, setCategoryId] = useState<string>('');
  const {subCategories} = useGetAllSubCategoriesRepo({
    restaurantId,
    categoryId,
  });
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>('');

  const reset = () => {
    setCategoryId('');
    setSelectedSubCategoryId('');
  };

  const onPressSubCategory = (id: string) => () => {
    setSelectedSubCategoryId(id);
    onChangeSubCategoryId(id);
  };

  useImperativeHandle(ref, () => ({setCategoryId, reset}), []);

  return (
    <View style={styles.columnLeft}>
      <FlatListComponent
        contentContainerStyle={styles.listContainer}
        keyExtractor={({id}) => id}
        data={subCategories}
        showsVerticalScrollIndicator={false}
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
  );
});

const styles = StyleSheet.create({
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
