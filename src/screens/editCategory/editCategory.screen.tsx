import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetCategoryRepo} from 'repositories';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, valueStyles} from 'values';
import {TextComponent} from 'components';

export const EditCategoryScreen: FC<ScreenBaseModel> = () => {
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'EditCategory'>>();
  const {id} = params;
  const {category} = useGetCategoryRepo({id});

  return (
    <SafeAreaView style={styles.container}>
      <TextComponent>{category?.data()?.name}</TextComponent>
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
