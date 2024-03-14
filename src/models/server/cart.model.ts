import {FirestoreIdBaseModel} from 'models';

export type CartModel = {
  userId: string;
  itemId: string;
  createdAt: Date;
  paidAt?: Date;
};
export type CartIdModel = FirestoreIdBaseModel<CartModel>;
