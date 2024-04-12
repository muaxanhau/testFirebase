import {StyleSheet} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {FlatListComponent, TextComponent} from 'components';
import {valueStyles} from 'values';
import {useGetAllFoodsRepo} from 'repositories';

export type ListFoodsRefProps = {
  setCategoryId: (id: string) => void;
  setSubCategoryId: (id: string) => void;
  reset: () => void;
};
type ListFoodsProps = ComponentBaseModel<{
  restaurantId: string;
}>;
export const ListFoodsComponent = forwardRef<ListFoodsRefProps, ListFoodsProps>(
  ({restaurantId}, ref) => {
    const [categoryId, setCategoryId] = useState<string>('');
    const [subCategoryId, setSubCategoryId] = useState<string>('');
    const {foods} = useGetAllFoodsRepo({
      restaurantId,
      categoryId,
      subCategoryId,
    });

    const reset = () => {
      setCategoryId('');
      setSubCategoryId('');
    };

    useImperativeHandle(
      ref,
      () => ({setCategoryId, setSubCategoryId, reset}),
      [],
    );

    return (
      <FlatListComponent
        contentContainerStyle={styles.listContainer}
        keyExtractor={({id}) => id}
        data={foods}
        renderItem={({item}) => (
          <TextComponent style={styles.itemWrapper}>{item.name}</TextComponent>
        )}
      />
    );
  },
);

const styles = StyleSheet.create({
  listContainer: {
    gap: valueStyles.gap,
  },
  itemWrapper: {
    padding: valueStyles.gap,
    borderWidth: valueStyles.line2,
    borderRadius: valueStyles.borderRadius2,
  },
});
