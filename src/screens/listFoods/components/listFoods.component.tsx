import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {FlatListComponent, TextComponent} from 'components';
import {valueStyles} from 'values';
import {useGetAllFoodsRepo} from 'repositories';
import {useMainStackNavigation} from 'utils';

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
    const navigation = useMainStackNavigation();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [subCategoryId, setSubCategoryId] = useState<string>('');
    const {foods} = useGetAllFoodsRepo({
      restaurantId,
      categoryId: selectedCategoryId,
      subCategoryId,
    });

    const reset = () => {
      setSelectedCategoryId('');
      setSubCategoryId('');
    };
    const setCategoryId = (id: string) => {
      setSelectedCategoryId(id);
      setSubCategoryId('');
    };

    const onPressFood = (id: string) => () => {
      navigation.navigate('StatusFood');
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
        renderItem={({item: {id, name}}) => (
          <TouchableOpacity onPress={onPressFood(id)}>
            <TextComponent style={styles.itemWrapper}>{name}</TextComponent>
          </TouchableOpacity>
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
