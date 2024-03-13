import {CategoryModel, FirestoreIdBaseModel} from 'models';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type ItemModel = {
  name: string;
  color: string;
  categoryId: FirebaseFirestoreTypes.DocumentReference<CategoryModel>;
};
export type ItemIdModel = FirestoreIdBaseModel<ItemModel>;
