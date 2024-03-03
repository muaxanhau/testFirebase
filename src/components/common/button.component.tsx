import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {TextComponent} from './text.component';
import {colors, valueStyles} from 'values';

type TypeType = 'default' | 'outline';
type ColorType = 'default' | 'success' | 'warning' | 'fail';
type ButtonProps = ComponentBaseModel<{
  title: string;
  onPress: () => void;
  type?: TypeType;
  color?: ColorType;
}>;
type ColorObjModel = {
  [key in ColorType]: {
    [key in TypeType]: {
      background: string;
      color: string;
    };
  } & {
    borderColor: string;
  };
};
const colorObj: ColorObjModel = {
  default: {
    default: {
      background: colors.primary,
      color: colors.white,
    },
    outline: {
      background: colors.primary100,
      color: colors.primary700,
    },
    borderColor: colors.primary,
  },
  success: {
    default: {
      background: colors.green,
      color: colors.white,
    },
    outline: {
      background: colors.green100,
      color: colors.green700,
    },
    borderColor: colors.green,
  },
  warning: {
    default: {
      background: colors.yellow,
      color: colors.white,
    },
    outline: {
      background: colors.yellow100,
      color: colors.yellow700,
    },
    borderColor: colors.yellow,
  },
  fail: {
    default: {
      background: colors.red,
      color: colors.white,
    },
    outline: {
      background: colors.red100,
      color: colors.red700,
    },
    borderColor: colors.red,
  },
};

export const ButtonComponent: FC<ButtonProps> = ({
  title,
  onPress,
  type = 'default',
  color = 'default',
  style,
}) => {
  const {background: backgroundColor, color: titleColor} =
    colorObj[color][type];
  const {borderColor} = colorObj[color];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
        },
        style,
      ]}>
      <TextComponent style={{color: titleColor}}>{title}</TextComponent>
    </TouchableOpacity>
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
