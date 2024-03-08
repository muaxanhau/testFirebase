import {ClientFirestoreBaseModel} from 'models';

export type CategoryModel = {
  name: string;
  image?: string;
  description?: string;
};
export type CategoryIdModel = ClientFirestoreBaseModel<CategoryModel>;
