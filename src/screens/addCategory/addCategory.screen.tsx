import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel, addCategoryFormSchema} from 'models';
import {SafeAreaView} from 'react-native-safe-area-context';
import {valueStyles} from 'values';
import {useHookForm} from 'utils';
import {ButtonComponent, InputTextComponent, TextComponent} from 'components';

export const AddCategoryScreen: FC<ScreenBaseModel> = () => {
  const {control, handleSubmit} = useHookForm({schema: addCategoryFormSchema});

  const onPress = handleSubmit(({name, description, image}) => {
    console.log(name);
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextComponent type="h2">Add category</TextComponent>

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

      <ButtonComponent title="Add" onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: valueStyles.padding2,
    gap: valueStyles.gap,
  },
});
