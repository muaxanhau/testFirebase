import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {utils} from 'utils';

export const ListFooterComponent: FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: utils.hp(30),
  },
});
