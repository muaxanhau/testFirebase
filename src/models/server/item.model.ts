import {CategoryModel, ClientFirestoreBaseModel} from 'models';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type ItemModel = {
  name: string;
  color: string;
  categoryId: FirebaseFirestoreTypes.DocumentReference<CategoryModel>;
};
export type ItemIdModel = ClientFirestoreBaseModel<ItemModel>;
