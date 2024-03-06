import {StyleSheet} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ComponentBaseModel} from 'models';
import {TextComponent} from './text.component';
import {colors, valueStyles} from 'values';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type TypeType = 'default' | 'outline';
type ColorType = 'default' | 'success' | 'warning' | 'fail';
type ColorObjModel = {
  [key in ColorType]: {
    [key in TypeType]: {
      background: string;
      text: string;
    };
  } & {
    border: string;
  };
};
const colorObj: ColorObjModel = {
  default: {
    default: {
      background: colors.primary,
      text: colors.white,
    },
    outline: {
      background: colors.primary100,
      text: colors.primary700,
    },
    border: colors.primary,
  },
  success: {
    default: {
      background: colors.green,
      text: colors.white,
    },
    outline: {
      background: colors.green100,
      text: colors.green700,
    },
    border: colors.green,
  },
  warning: {
    default: {
      background: colors.yellow,
      text: colors.white,
    },
    outline: {
      background: colors.yellow100,
      text: colors.yellow700,
    },
    border: colors.yellow,
  },
  fail: {
    default: {
      background: colors.red,
      text: colors.white,
    },
    outline: {
      background: colors.red100,
      text: colors.red700,
    },
    border: colors.red,
  },
};

type ButtonProps = ComponentBaseModel<{
  title: string;
  onPress: () => void;
  type?: TypeType;
  color?: ColorType;
  disabled?: boolean;
}>;
export const ButtonComponent: FC<ButtonProps> = ({
  style,
  title,
  onPress,
  type = 'default',
  color = 'default',
  disabled = false,
}) => {
  const disabledValue = useSharedValue(0);
  const isActive = useSharedValue(false);
  const {background, text} = colorObj[color][type];
  const {border} = colorObj[color];
  const titleColor = disabled ? colors.neutral : text;

  const gesture = Gesture.Tap()
    .maxDuration(3000)
    .onBegin(() => (isActive.value = true))
    .onEnd(() => !disabled && runOnJS(onPress)())
    .onFinalize(() => (isActive.value = false));

  const layoutStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isActive.value ? 0.5 : 1),
    transform: [{scale: withSpring(isActive.value ? 0.9 : 1)}],
  }));
  const disabledStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      disabledValue.value,
      [0, 1],
      [background, colors.neutral100],
    ),
    borderColor: interpolateColor(
      disabledValue.value,
      [0, 1],
      [border, colors.neutral700],
    ),
  }));

  useEffect(() => {
    disabledValue.value = withTiming(disabled ? 1 : 0);
  }, [disabled]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, style, layoutStyle, disabledStyle]}>
        <TextComponent style={{color: titleColor}}>{title}</TextComponent>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: valueStyles.padding2,
    borderRadius: valueStyles.borderRadius10,
    alignItems: 'center',
    borderWidth: valueStyles.line2,
  },
});
