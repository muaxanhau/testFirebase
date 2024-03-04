import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {
  MainStackNavigationModel,
  ScreenBaseModel,
  editCategoryFormSchema,
} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEditCategoryRepo, useGetCategoryRepo} from 'repositories';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, valueStyles} from 'values';
import {ButtonComponent, InputTextComponent, TextComponent} from 'components';
import {useHookForm, useMainStackNavigation} from 'utils';

export const EditCategoryScreen: FC<ScreenBaseModel> = () => {
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'EditCategory'>>();
  const {id} = params;
  const navigation = useMainStackNavigation();
  const {category} = useGetCategoryRepo({id});
  const {editCategory} = useEditCategoryRepo({
    onSuccess: () => navigation.navigate('ListCategories'),
  });
  const {control, handleSubmit} = useHookForm({
    schema: editCategoryFormSchema,
    defaultValues: {
      name: category?.data()?.name,
      description: category?.data()?.description,
      image: category?.data()?.image,
    },
  });

  const onPress = handleSubmit(({name, description, image}) =>
    editCategory({id, name, description, image}),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextComponent type="h2">Edit</TextComponent>

      <InputTextComponent
        control={control}
        name={'name'}
        title="Name"
        placeholder="Aa..."
      />

      <InputTextComponent
        control={control}
        name={'description'}
        title="Description"
        placeholder="Aa..."
      />

      <ButtonComponent title="Submit" onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: valueStyles.padding2,
    gap: valueStyles.gap,
    backgroundColor: colors.white,
  },
});
