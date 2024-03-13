import {FirestoreIdBaseModel} from 'models';

export type CartModel = {
  date: Date;
};
export type CartIdModel = FirestoreIdBaseModel<CartModel>;
