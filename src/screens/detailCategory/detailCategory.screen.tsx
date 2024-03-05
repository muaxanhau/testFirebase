import React, {FC} from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetCategoryRepo} from 'repositories';
import {utils} from 'utils';
import {
  ImageSharedComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {StyleSheet} from 'react-native';
import {valueStyles} from 'values';

export const DetailCategoryScreen: FC<ScreenBaseModel> = () => {
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'DetailCategory'>>();
  const {id} = params;
  const {category} = useGetCategoryRepo({id});
  const data = category?.data();

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent>{data?.name}</TextComponent>
      <TextComponent>{data?.description}</TextComponent>

      <ImageSharedComponent
        sharedTransitionTag={id}
        url={data?.image}
        style={styles.image}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: utils.hp(30),
    resizeMode: 'cover',
    borderRadius: valueStyles.borderRadius,
  },
});
