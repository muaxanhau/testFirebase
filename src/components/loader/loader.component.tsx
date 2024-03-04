import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {
  ComponentBaseModel,
  EnteringAnimationEnum,
  ExitingAnimationEnum,
} from 'models';
import {useIsFetching, useIsMutating} from '@tanstack/react-query';
import {utils} from 'utils';
import {colors} from 'values';
import {ViewAnimationComponent} from 'components/common';

type LoaderProps = ComponentBaseModel;
export const LoaderComponent: FC<LoaderProps> = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching || isMutating;

  if (!isLoading) {
    return null;
  }

  return (
    <ViewAnimationComponent
      style={styles.container}
      entering={EnteringAnimationEnum.FADE_IN}
      exiting={ExitingAnimationEnum.FADE_OUT}>
      <View style={styles.loader}></View>
    </ViewAnimationComponent>
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
  loader: {
    width: 150,
    aspectRatio: 1,
    backgroundColor: 'orange',
    borderRadius: 75,
  },
});
