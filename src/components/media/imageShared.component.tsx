import {Image, ImageProps} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import Animated from 'react-native-reanimated';
import {utils} from 'utils';

type ImageSharedProps = ComponentBaseModel<
  {
    sharedTransitionTag: string;
    url: string | undefined;
  } & ImageProps
>;
export const ImageSharedComponent: FC<ImageSharedProps> = ({
  sharedTransitionTag,
  url,
  ...rest
}) => {
  if (utils.isAndroid()) {
    // have problem on android, so we use default image
    return <Image source={utils.imageUrl(url)} {...rest} />;
  }

  return (
    <Animated.Image
      sharedTransitionTag={sharedTransitionTag}
      source={utils.imageUrl(url)}
      {...rest}
    />
  );
};
