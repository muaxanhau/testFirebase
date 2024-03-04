import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, forwardRef, useImperativeHandle, useRef} from 'react';
import {
  CategoryFirestoreModel,
  ComponentBaseModel,
  EnteringAnimationEnum,
} from 'models';
import {useDeleteCategoryRepo, useGetAllCategoriesRepo} from 'repositories';
import {
  ButtonComponent,
  TextComponent,
  ViewAnimationComponent,
} from 'components';
import {colors, valueStyles} from 'values';
import {utils} from 'utils';
import {Swipeable} from 'react-native-gesture-handler';

export const ListCategoriesComponent: FC<ComponentBaseModel> = () => {
  const {categories} = useGetAllCategoriesRepo();
  const refCategoriesList = useRef<CategoryRefProps[]>([]);

  const onScrollBeginDrag = () => {
    refCategoriesList.current.forEach(item => item.closeRightAction());
  };

  return (
    <FlatList
      keyExtractor={i => i.id}
      data={categories}
      onScrollBeginDrag={onScrollBeginDrag}
      renderItem={({item, index}) => {
        return (
          <CategoryComponent
            ref={ref => ref && (refCategoriesList.current[index] = ref)}
            index={index}
            item={item}
          />
        );
      }}
      contentContainerStyle={styles.container}
    />
  );
};

type CategoryRefProps = {
  closeRightAction: () => void;
};
type CategoryProps = ComponentBaseModel<{
  index: number;
  item: CategoryFirestoreModel;
}>;
const CategoryComponent = forwardRef<CategoryRefProps, CategoryProps>(
  ({index, item}, ref) => {
    const {deleteCategory} = useDeleteCategoryRepo();
    const refSwipeable = useRef<Swipeable>(null);
    const {name, description, image} = item.data()!;

    const closeRightAction = () => refSwipeable.current?.close();

    const onPress = () => deleteCategory(item);

    useImperativeHandle(ref, () => ({closeRightAction}), []);

    return (
      <Swipeable
        ref={refSwipeable}
        renderRightActions={() => (
          <ButtonComponent
            title="Delete"
            color="fail"
            type="outline"
            onPress={onPress}
            style={styles.buttonDelete}
          />
        )}>
        <TouchableOpacity>
          <ViewAnimationComponent
            style={styles.itemContainer}
            entering={EnteringAnimationEnum.FLIP_IN_Y_RIGHT}
            delay={index * 100}>
            <TextComponent>{name}</TextComponent>
            <Image source={utils.imageUrl(image)} style={styles.itemImage} />
          </ViewAnimationComponent>
        </TouchableOpacity>
      </Swipeable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap2,
  },
  itemContainer: {
    padding: valueStyles.padding2,
    marginHorizontal: valueStyles.margin2,
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
  buttonDelete: {
    marginRight: valueStyles.margin2,
    alignSelf: 'center',
  },
});
