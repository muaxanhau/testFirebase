import {KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {
  MainStackNavigationModel,
  ScreenBaseModel,
  editCategoryFormSchema,
} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEditCategoryRepo, useGetCategoryRepo} from 'repositories';
import {
  ButtonComponent,
  InputTextComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useHookForm, useMainStackNavigation} from 'utils';

export const EditCategoryScreen: ScreenBaseModel = () => {
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'EditCategory'>>();
  const {id} = params;
  const navigation = useMainStackNavigation();
  const {category} = useGetCategoryRepo({id});
  const {editCategory, isPending} = useEditCategoryRepo({
    onSuccess: () => navigation.navigate('ListCategories'),
  });
  const {control, handleSubmit} = useHookForm({
    schema: editCategoryFormSchema,
    defaultValues: {
      name: category?.name,
      description: category?.description,
      image: category?.image,
    },
  });

  const onPress = handleSubmit(({name, description, image}) =>
    editCategory({id, name, description, image}),
  );

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent type="h2">Edit</TextComponent>

      <KeyboardAvoidingView>
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

        <ButtonComponent
          title="Submit"
          onPress={onPress}
          isLoading={isPending}
        />
      </KeyboardAvoidingView>
    </ScreenLayoutComponent>
  );
};
