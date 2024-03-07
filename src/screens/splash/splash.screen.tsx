import React, {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent, TextComponent} from 'components';
import {useFirstCheckNavigation} from 'utils';

export const SplashScreen: FC<ScreenBaseModel> = () => {
  const navigate = useFirstCheckNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 1000);
  }, []);

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
