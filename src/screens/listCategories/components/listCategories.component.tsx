import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, forwardRef, useImperativeHandle, useRef} from 'react';
import {
  ComponentBaseModel,
  EnteringAnimationEnum,
  ExitingAnimationEnum,
} from 'models';
import {useDeleteCategoryRepo, useGetAllCategoriesRepo} from 'repositories';
import {
  ButtonComponent,
  TextComponent,
  ViewAnimationComponent,
} from 'components';
import {colors, valueStyles} from 'values';
import {useMainStackNavigation, utils} from 'utils';
import {Swipeable} from 'react-native-gesture-handler';

export const ListCategoriesComponent: FC<ComponentBaseModel> = () => {
  const {categories} = useGetAllCategoriesRepo();
  const refCategoriesList = useRef<CategoryRefProps[]>([]);

  const onScrollBeginDrag = () => {
    refCategoriesList.current.forEach(item => item.closeRightAction());
  };

  return (
    <FlatList
      data={categories}
      onScrollBeginDrag={onScrollBeginDrag}
      renderItem={({item, index}) => {
        const {name, image} = item.data()!;
        return (
          <CategoryComponent
            key={item.id}
            ref={ref => ref && (refCategoriesList.current[index] = ref)}
            index={index}
            id={item.id}
            name={name}
            image={image}
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
  id: string;
  name: string;
  image?: string;
}>;
const CategoryComponent = forwardRef<CategoryRefProps, CategoryProps>(
  ({index, id, name, image}, ref) => {
    const navigation = useMainStackNavigation();
    const {deleteCategory} = useDeleteCategoryRepo();
    const refSwipeable = useRef<Swipeable>(null);

    const closeRightAction = () => refSwipeable.current?.close();

    const onPress = () => navigation.navigate('DetailCategory', {id});
    const onPressEdit = () => navigation.navigate('EditCategory', {id});
    const onPressDelete = () => deleteCategory({id});

    useImperativeHandle(ref, () => ({closeRightAction}), []);

    return (
      <Swipeable
        ref={refSwipeable}
        renderRightActions={() => (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title="Edit"
              color="warning"
              type="outline"
              onPress={onPressEdit}
            />
            <ButtonComponent
              title="Delete"
              color="fail"
              type="outline"
              onPress={onPressDelete}
            />
          </View>
        )}>
        <TouchableOpacity onPress={onPress}>
          <ViewAnimationComponent
            style={styles.itemContainer}
            entering={EnteringAnimationEnum.FADE_IN_RIGHT}
            exiting={ExitingAnimationEnum.FADE_OUT_RIGHT}
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
    paddingTop: valueStyles.padding2,
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
    resizeMode: 'cover',
    width: utils.wp(40),
    aspectRatio: 3 / 2,
    borderRadius: valueStyles.borderRadius10,
  },
  buttonContainer: {
    marginRight: valueStyles.margin2,
    justifyContent: 'center',
    gap: valueStyles.gap2,
  },
});
