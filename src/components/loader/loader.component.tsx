import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';

type LoaderProps = ComponentBaseModel;
export const LoaderComponent: FC<LoaderProps> = () => {
  return (
    <View>
      <Text>LoaderCustom</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
