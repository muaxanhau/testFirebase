import {RoleEnum} from 'models/enums';
import {ClientFirestoreBaseModel} from 'models';

export type UserModel = {
  role: RoleEnum;
};
export type UserIdModel = ClientFirestoreBaseModel<UserModel>;
