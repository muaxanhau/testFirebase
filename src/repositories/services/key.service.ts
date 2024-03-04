export enum FirestoreCollectionService {
  CATEGORIES = 'categories',
}

export enum KeyService {
  // auth
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  LOGOUT = 'LOGOUT',
  LOGIN_WITH_PHONE = 'LOGIN_WITH_PHONE',

  // categories
  GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES',
  ADD_CATEGORY = 'ADD_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  EDIT_CATEGORY = 'EDIT_CATEGORY',
  GET_CATEGORY = 'GET_CATEGORY',

  // users
  LIST_USERS = 'LIST_USERS',
}
