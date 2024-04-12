import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {FlatListComponent, TextComponent} from 'components';
import {useGetAllCategoriesRepo} from 'repositories';
import {colors, valueStyles} from 'values';
import {utils} from 'utils';

export type ListCategoriesRefProps = {
  reset: () => void;
};
type ListCategoriesProps = ComponentBaseModel<{
  restaurantId: string;
  onChangeCategoryId: (id: string) => void;
}>;
export const ListCategoriesComponent = forwardRef<
  ListCategoriesRefProps,
  ListCategoriesProps
>(({restaurantId, onChangeCategoryId}, ref) => {
  const {categories} = useGetAllCategoriesRepo({restaurantId});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const reset = () => setSelectedCategoryId('');

  const onPressCategory = (id: string) => () => {
    setSelectedCategoryId(id);
    onChangeCategoryId(id);
  };

  useImperativeHandle(ref, () => ({reset}), []);

  return (
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
  );
});

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
