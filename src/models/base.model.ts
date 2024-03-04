import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';

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
 * collection for firebase model
 */
export type FirestoreBaseModel<T extends {}> =
  FirebaseFirestoreTypes.DocumentSnapshot<T>;
