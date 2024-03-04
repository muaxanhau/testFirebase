import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';

type SkeletonProps = ComponentBaseModel<{}>;
export const SkeletonComponent: FC<SkeletonProps> = () => {
  return (
    <View>
      <Text>SkeletonComponent</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
