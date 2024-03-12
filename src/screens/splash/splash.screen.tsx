import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent, TextComponent} from 'components';

export const SplashScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent style={styles.container}>
      <TextComponent type="h1">Splash</TextComponent>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
