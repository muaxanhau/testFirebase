import firestore from '@react-native-firebase/firestore';
import {CategoryModel, ItemModel} from 'models';
import {CollectionService} from './key.service';

export const categoriesCollectionService =
  firestore().collection<CategoryModel>(CollectionService.CATEGORIES);

export const itemsCollectionService = firestore().collection<ItemModel>(
  CollectionService.ITEMS,
);
