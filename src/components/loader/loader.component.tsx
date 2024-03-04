import React, {FC} from 'react';
import {
  ComponentBaseModel,
  EnteringAnimationEnum,
  ExitingAnimationEnum,
} from 'models';
import {useIsFetching, useIsMutating} from '@tanstack/react-query';
import {ActivityIndicatorComponent} from './activityIndicator.component';
import {StyleSheet} from 'react-native';
import {utils} from 'utils';
import {colors} from 'values';
import {ViewAnimationComponent} from 'components';

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
      <ActivityIndicatorComponent size={90} />
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
});
