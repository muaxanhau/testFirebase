import {ClientFirestoreBaseModel, ItemModel} from 'models';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type CartModel = {
  itemId: FirebaseFirestoreTypes.DocumentReference<ItemModel>;
  date: Date;
};
export type CartIdModel = ClientFirestoreBaseModel<CartModel>;
