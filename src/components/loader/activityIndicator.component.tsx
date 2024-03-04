import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ComponentBaseModel} from 'models';
import {colors} from 'values';
import {utils} from 'utils';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const values = {
  gap: 8, // percent % of container's width
};
type ActivityIndicatorProps = ComponentBaseModel<{
  size?: number;
}>;
export const ActivityIndicatorComponent: FC<ActivityIndicatorProps> = ({
  size = 40,
  style,
}) => {
  const rotation = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));
  const box1Styles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));
  const box2Styles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));
  const box3Styles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));
  const box4Styles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false,
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {width: size, gap: (size * values.gap) / 100},
        style,
        containerStyle,
      ]}>
      <View style={[styles.box, {backgroundColor: colors.green300}]} />
      <View style={[styles.box, {backgroundColor: colors.primary300}]} />
      <View style={[styles.box, {backgroundColor: colors.yellow300}]} />
      <View style={[styles.box, {backgroundColor: colors.red300}]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    flexWrap: 'wrap',
  },
  box: {
    width: `${50 - values.gap / 2}%`,
    aspectRatio: 1,
  },
});
