import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListUserComponent} from './components';
import {ScreenBaseModel} from 'models';
import {SafeAreaView} from 'react-native-safe-area-context';

export const FriendScreen: FC<ScreenBaseModel> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListUserComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
