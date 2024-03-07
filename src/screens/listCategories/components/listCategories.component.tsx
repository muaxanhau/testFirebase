import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, forwardRef, useImperativeHandle, useRef} from 'react';
import {ComponentBaseModel} from 'models';
import {useDeleteCategoryRepo, useGetAllCategoriesRepo} from 'repositories';
import {
  ButtonComponent,
  FlatListComponent,
  ImageSharedComponent,
  TextComponent,
} from 'components';
import {colors, valueStyles} from 'values';
import {useMainStackNavigation, utils} from 'utils';
import {Swipeable} from 'react-native-gesture-handler';

export const ListCategoriesComponent: FC<ComponentBaseModel> = () => {
  const {categories} = useGetAllCategoriesRepo();
  const refCategoriesList = useRef<CategoryRefProps[]>([]);

  const onScrollBeginDrag = () => {
    refCategoriesList.current.forEach(item => item.closeRightActions());
  };

  return (
    <FlatListComponent
      data={categories}
      onScrollBeginDrag={onScrollBeginDrag}
      contentContainerStyle={styles.container}
      renderItem={({item, index}) => {
        const {name, image} = item.data()!;

        return (
          <CategoryComponent
            key={item.id}
            ref={ref => ref && (refCategoriesList.current[index] = ref)}
            id={item.id}
            name={name}
            image={image}
          />
        );
      }}
    />
  );
};

type CategoryRefProps = {
  closeRightActions: () => void;
};
type CategoryProps = ComponentBaseModel<{
  id: string;
  name: string;
  image?: string;
}>;
const CategoryComponent = forwardRef<CategoryRefProps, CategoryProps>(
  ({id, name, image}, ref) => {
    const navigation = useMainStackNavigation();
    const {deleteCategory, isPending} = useDeleteCategoryRepo();
    const refSwipeable = useRef<Swipeable>(null);

    const closeRightActions = () => refSwipeable.current?.close();

    const onPress = () => navigation.navigate('DetailCategory', {id});
    const onPressEdit = () => navigation.navigate('EditCategory', {id});
    const onPressDelete = () => deleteCategory({id});

    useImperativeHandle(ref, () => ({closeRightActions}), []);

    return (
      <Swipeable
        ref={refSwipeable}
        renderRightActions={() => (
          <RightActionsComponent
            onPressEdit={onPressEdit}
            onPressDelete={onPressDelete}
            isLoadingDelete={isPending}
          />
        )}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <TextComponent>{name}</TextComponent>

            <ImageSharedComponent
              sharedTransitionTag={id}
              url={image}
              style={styles.itemImage}
            />
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  },
);

type RightActions = ComponentBaseModel<{
  onPressEdit: () => void;
  onPressDelete: () => void;
  isLoadingDelete: boolean;
}>;
const RightActionsComponent: FC<RightActions> = ({
  onPressEdit,
  onPressDelete,
  isLoadingDelete,
}) => {
  return (
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
        isLoading={isLoadingDelete}
      />
    </View>
  );
};

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
