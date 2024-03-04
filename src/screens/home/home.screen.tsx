import {StyleSheet, View} from 'react-native';
import React, {FC, useRef} from 'react';
import {ScreenBaseModel} from 'models';
import {useMainStackNavigation} from 'utils';
import {
  BottomSheetComponent,
  BottomSheetRefProps,
  ButtonComponent,
} from 'components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, valueStyles} from 'values';

export const HomeScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const refBottomSheet = useRef<BottomSheetRefProps>(null);

  const onPressProfile = () => navigation.navigate('Profile');
  const onPressCategories = () => navigation.navigate('ListCategories');

  return (
    <>
      <BottomSheetComponent ref={refBottomSheet}>
        <View style={styles.bsContainer} />
      </BottomSheetComponent>

      <SafeAreaView style={styles.container}>
        <ButtonComponent title="Profile" onPress={onPressProfile} />

        <ButtonComponent
          title="Categories"
          color="success"
          onPress={onPressCategories}
        />

        <ButtonComponent
          title="Open BS"
          type="outline"
          onPress={() => refBottomSheet.current?.open()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: valueStyles.padding2,
    gap: valueStyles.gap,
    backgroundColor: colors.white,
  },
  bsContainer: {
    flex: 1,
    backgroundColor: colors.red300,
  },
});
