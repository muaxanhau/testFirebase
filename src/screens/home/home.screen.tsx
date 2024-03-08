import {StyleSheet, View} from 'react-native';
import React, {FC, useRef} from 'react';
import {ScreenBaseModel} from 'models';
import {useMainStackNavigation} from 'utils';
import {
  BottomSheetComponent,
  BottomSheetRefProps,
  ButtonComponent,
  ScreenLayoutComponent,
} from 'components';
import {colors} from 'values';

export const HomeScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const refBottomSheet = useRef<BottomSheetRefProps>(null);

  const onPressProfile = () => navigation.navigate('Profile');
  const onPressItems = () => navigation.navigate('ListItems');
  const onPressCategories = () => navigation.navigate('ListCategories');

  return (
    <>
      <BottomSheetComponent ref={refBottomSheet}>
        <View style={styles.bsContainer} />
      </BottomSheetComponent>

      <ScreenLayoutComponent paddingHorizontal gap scrollable>
        <ButtonComponent title="Profile" onPress={onPressProfile} />
        <ButtonComponent
          title="CRUD Categories"
          color="success"
          type="outline"
          onPress={onPressCategories}
        />
        <ButtonComponent title="Items" color="success" onPress={onPressItems} />
        <ButtonComponent
          title="Open BS"
          type="outline"
          onPress={() => refBottomSheet.current?.open()}
        />
      </ScreenLayoutComponent>
    </>
  );
};

const styles = StyleSheet.create({
  bsContainer: {
    flex: 1,
    backgroundColor: colors.red300,
  },
});
