import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel, ItemIdModel} from 'models';
import {useAddCartRepo, useGetAllCategoriesAndItemsRepo} from 'repositories';
import {FlatListComponent, TextComponent} from 'components';
import {colors, valueStyles} from 'values';

export const ListItemsComponent: FC<ComponentBaseModel> = () => {
  const {categoriesWithItems} = useGetAllCategoriesAndItemsRepo();

  return (
    <FlatListComponent
      data={categoriesWithItems}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <SectionCategoryComponent
          key={item.id}
          title={item.name}
          items={item.items}
        />
      )}
    />
  );
};

type SectionCategoryProps = ComponentBaseModel<{
  title: string;
  items: ItemIdModel[];
}>;
const SectionCategoryComponent: FC<SectionCategoryProps> = ({title, items}) => {
  return (
    <View style={styles.categoryContainer}>
      <TextComponent type="h3" style={styles.title}>
        {title}
      </TextComponent>

      <FlatListComponent
        data={items}
        horizontal
        contentContainerStyle={styles.categoryWrapper}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ItemComponent key={item.id} id={item.id} name={item.name} />
        )}
        ListEmptyComponent={<TextComponent>Empty...</TextComponent>}
      />
    </View>
  );
};

type ItemProps = ComponentBaseModel<{
  id: string;
  name: string;
}>;
const ItemComponent: FC<ItemProps> = ({id, name}) => {
  const {addCart} = useAddCartRepo({
    onSuccess: () => Alert.alert('Alert', 'Item is added to your cart'),
  });

  const onPress = () => addCart({itemId: id});

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <TextComponent>{name}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap,
    paddingTop: valueStyles.padding2,
  },
  categoryContainer: {},
  categoryWrapper: {
    gap: valueStyles.gap2,
    paddingHorizontal: valueStyles.padding2,
  },
  title: {
    paddingLeft: valueStyles.padding2,
  },
  itemContainer: {
    padding: valueStyles.padding2,
    backgroundColor: colors.green100,
    borderRadius: valueStyles.borderRadius2,
    borderColor: colors.green,
    borderWidth: valueStyles.line2,
  },
});
