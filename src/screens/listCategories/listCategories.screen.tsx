import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {SafeAreaView} from 'react-native-safe-area-context';
import {valueStyles} from 'values';
import {ListCategoriesComponent} from './components';
import {ButtonComponent} from 'components';
import {useMainStackNavigation} from 'utils';

export const ListCategoriesScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();

  const onPress = () => navigation.navigate('AddCategory');

  return (
    <SafeAreaView style={styles.container}>
      <ListCategoriesComponent />

      <ButtonComponent title="Add new category" onPress={onPress} />
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
