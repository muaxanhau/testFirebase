import firestore from '@react-native-firebase/firestore';
import {CartModel, CategoryModel, ItemModel, UserModel} from 'models';
import {CollectionService} from './key.service';

export const categoriesCollectionService =
  firestore().collection<CategoryModel>(CollectionService.CATEGORIES);

export const itemsCollectionService = firestore().collection<ItemModel>(
  CollectionService.ITEMS,
);

export const usersCollectionService = firestore().collection<UserModel>(
  CollectionService.USERS,
);

export const cartsCollectionService = firestore().collection<CartModel>(
  CollectionService.CARTS,
);
