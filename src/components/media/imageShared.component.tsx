import {ImageProps} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import Animated from 'react-native-reanimated';

type ImageSharedProps = ComponentBaseModel<
  {
    sharedTransitionTag: string;
  } & ImageProps
>;
export const ImageSharedComponent: FC<ImageSharedProps> = ({
  sharedTransitionTag,
  ...rest
}) => {
  return <Animated.Image sharedTransitionTag={sharedTransitionTag} {...rest} />;
};
