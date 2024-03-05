import React, {FC} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetCategoryRepo} from 'repositories';
import {useMainStackNavigation} from 'utils';
import {ScreenLayoutComponent, TextComponent} from 'components';

export const DetailCategoryScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'DetailCategory'>>();
  const {id} = params;
  const {category} = useGetCategoryRepo({id});
  const data = category?.data();

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent>{data?.name}</TextComponent>
      <TextComponent>{data?.description}</TextComponent>
    </ScreenLayoutComponent>
  );
};
