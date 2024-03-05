import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';

export const MapScreen: FC<ScreenBaseModel> = () => {
  return <ScreenLayoutComponent disablePaddingTop></ScreenLayoutComponent>;
};

const styles = StyleSheet.create({});
