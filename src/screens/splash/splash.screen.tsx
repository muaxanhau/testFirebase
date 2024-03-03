import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {colors, valueStyles} from 'values';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMainStackNavigation} from 'utils';
import {ButtonComponent} from 'components';

export const SplashScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ButtonComponent
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <ButtonComponent
        title="Home"
        color="success"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <ButtonComponent
        title="Friend"
        color="warning"
        onPress={() => {
          navigation.navigate('Friend');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: valueStyles.gap,
    padding: valueStyles.padding2,
    justifyContent: 'center',
  },
});
