import {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {Prettify} from 'utils';

/**
 * screen
 */
export type ScreenBaseModel<T = {}> = Readonly<T>;

/**
 * component
 */
export type ComponentBaseModel<T = {}> = Readonly<
  T & {
    style?: ViewStyle;
  }
>;
export type ComponentWithChildBaseModel<T = {}> = PropsWithChildren<
  ComponentBaseModel<T>
>;

/**
 * global store
 */
export type ActionStoreBaseModel<TAction> = Readonly<
  TAction & {
    reset: () => void;
  }
>;

/**
 * client collection for firebase model
 */
export type FirestoreIdBaseModel<T> = Prettify<{id: string} & T>;

/**
 *
 */
export type ErrorResponseBaseModel = {
  statusCode: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  timestamp: Date;
  message: string[];
};
