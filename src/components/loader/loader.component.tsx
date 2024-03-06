import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {useIsFetching, useIsMutating} from '@tanstack/react-query';
import {ActivityIndicatorComponent} from './activityIndicator.component';
import {Modal, StyleSheet, View} from 'react-native';
import {utils} from 'utils';
import {colors} from 'values';

type LoaderProps = ComponentBaseModel;
export const LoaderComponent: FC<LoaderProps> = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return (
    <Modal visible={isLoading} transparent>
      <View style={styles.container}>
        <ActivityIndicatorComponent size={90} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: utils.opacityColor(colors.black, 0.3),
    zIndex: 999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
