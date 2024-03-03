import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel, EnteringAnimationEnum} from 'models';
import {useGetAllCategoriesRepo} from 'repositories';
import {TextComponent, ViewAnimationComponent} from 'components';
import {colors, valueStyles} from 'values';
import {utils} from 'utils';

export const ListCategoriesComponent: FC<ComponentBaseModel> = () => {
  const {categories} = useGetAllCategoriesRepo();

  return (
    <FlatList
      keyExtractor={i => i.name}
      data={categories}
      renderItem={({item: {name, image, description}, index}) => (
        <CategoryComponent
          index={index}
          name={name}
          image={image}
          description={description}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

type CategoryProps = ComponentBaseModel<{
  index: number;
  name: string;
  image: string;
  description: string;
}>;
const CategoryComponent: FC<CategoryProps> = ({
  index,
  name,
  image,
  description,
}) => {
  return (
    <TouchableOpacity>
      <ViewAnimationComponent
        style={styles.itemContainer}
        entering={EnteringAnimationEnum.FLIP_IN_Y_RIGHT}
        delay={index * 100}>
        <TextComponent>{name}</TextComponent>
        <Image source={{uri: image}} style={styles.itemImage} />
      </ViewAnimationComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap2,
  },
  itemContainer: {
    padding: valueStyles.padding2,
    backgroundColor: colors.primary100,
    borderWidth: valueStyles.line,
    borderColor: colors.green700,
    borderRadius: valueStyles.borderRadius10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    resizeMode: 'contain',
    width: utils.wp(40),
    aspectRatio: 3 / 2,
    borderRadius: valueStyles.borderRadius10,
  },
});
