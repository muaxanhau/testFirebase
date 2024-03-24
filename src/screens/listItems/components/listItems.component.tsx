import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel, ItemIdModel} from 'models';
import {useAddCartRepo, useGetAllCategoriesAndItemsRepo} from 'repositories';
import {FlatListComponent, TextComponent} from 'components';
import {colors, valueStyles} from 'values';
import {utils} from 'utils';

export const ListItemsComponent: FC<ComponentBaseModel> = () => {
  const {categoriesWithItems} = useGetAllCategoriesAndItemsRepo();

  return (
    <FlatListComponent
      data={categoriesWithItems}
      contentContainerStyle={styles.container}
      keyExtractor={({id}) => id}
      renderItem={({item}) => (
        <SectionCategoryComponent title={item.name} items={item.items} />
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
        keyExtractor={({id}) => id}
        renderItem={({item: {name, id, color}}) => (
          <ItemComponent id={id} name={name} color={color} />
        )}
        ListEmptyComponent={<TextComponent>Empty...</TextComponent>}
      />
    </View>
  );
};

type ItemProps = ComponentBaseModel<{
  id: string;
  name: string;
  color: string;
}>;
const ItemComponent: FC<ItemProps> = ({id, name, color}) => {
  const {addCart} = useAddCartRepo({
    onSuccess: () => Alert.alert('Alert', 'Item is added to your cart'),
  });

  const onPress = () => addCart({itemId: id, quantity: 1});

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <TextComponent style={styles.itemTitle}>{name}</TextComponent>
        <TextComponent>({color})</TextComponent>
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
    backgroundColor: colors.green100,
    borderRadius: valueStyles.borderRadius2,
    borderColor: colors.green,
    borderWidth: valueStyles.line2,
    minWidth: utils.wp(38),
    aspectRatio: 3 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});
