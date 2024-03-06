import React, {FC} from 'react';
import {ScreenBaseModel, addCategoryFormSchema} from 'models';
import {useHookForm, useMainStackNavigation} from 'utils';
import {
  ButtonComponent,
  InputTextComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useAddCategoryRepo} from 'repositories';
import {KeyboardAvoidingView} from 'react-native';

export const AddCategoryScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const {control, handleSubmit} = useHookForm({schema: addCategoryFormSchema});
  const {addCategory, isPending} = useAddCategoryRepo({
    onSuccess: () => navigation.navigate('ListCategories'),
  });

  const onPress = handleSubmit(data => addCategory(data));

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent type="h2">Add category</TextComponent>

      <KeyboardAvoidingView>
        <InputTextComponent
          control={control}
          name="name"
          title="Name"
          placeholder="Aa..."
        />

        <InputTextComponent
          control={control}
          name="description"
          title="Description"
          placeholder="Aa..."
        />

        <ButtonComponent title="Add" onPress={onPress} isLoading={isPending} />
      </KeyboardAvoidingView>
    </ScreenLayoutComponent>
  );
};
