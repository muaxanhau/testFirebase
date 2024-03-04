import {Alert, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {colors, valueStyles} from 'values';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonComponent} from 'components';
import {useMainStackNavigation, useResetMainStackNavigation} from 'utils';
import {useLogoutRepo} from 'repositories';

export const ProfileScreen: FC<ScreenBaseModel> = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {logout} = useLogoutRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Logout successful');
      resetMainStackNavigation('Login');
    },
  });

  const onPress = () => logout({});

  return (
    <SafeAreaView style={styles.container}>
      <ButtonComponent
        title="Friend"
        color="warning"
        onPress={() => {
          navigation.navigate('Friend');
        }}
      />

      <ButtonComponent title="Logout" color="fail" onPress={onPress} />
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
