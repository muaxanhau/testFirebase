import {FirestoreBaseModel} from 'models';

export type CategoryModel = {
  name: string;
  image?: string;
  description?: string;
};
export type CategoryFirestoreModel = FirestoreBaseModel<CategoryModel>;
