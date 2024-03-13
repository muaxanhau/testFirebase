import {FirestoreIdBaseModel} from 'models';

export type ItemModel = {
  id: string;
  name: string;
  color: string;
};
export type ItemIdModel = FirestoreIdBaseModel<ItemModel>;
