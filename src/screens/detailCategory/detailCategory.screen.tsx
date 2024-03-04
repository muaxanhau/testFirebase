import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetCategoryRepo} from 'repositories';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, valueStyles} from 'values';
import {useMainStackNavigation} from 'utils';
import {TextComponent} from 'components';

export const DetailCategoryScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'DetailCategory'>>();
  const {id} = params;
  const {category} = useGetCategoryRepo({id});
  const data = category?.data();

  return (
    <SafeAreaView style={styles.container}>
      <TextComponent>{data?.name}</TextComponent>
      <TextComponent>{data?.description}</TextComponent>
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
