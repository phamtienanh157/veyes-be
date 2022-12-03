export enum EErrorCode {
  'ConflictException' = '23505',
}

export enum ERole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EOrderStatus {
  WAITING_FOR_CONFIRM,
  WAITING_FOR_SHIP,
  SHIPPING,
  SHIP_SUCCESS,
  CANCELLED,
  COMPLETED,
}

export const weight = {
  gender: 3,
  age: 3,
  faceForm: 6,
  glassForm: 6,
  material: 6,
};

export const totalWeight = 24;

export const faceFormType1 = [1, 3, 6];
export const faceFormType2 = [2, 4, 5];

export const glassFormType1 = [1, 2, 5, 7];
export const glassFormType2 = [3, 4, 6, 8];

export const matType1 = [1, 3, 4, 5, 6, 7];
export const matType2 = [2, 8, 9];

export enum ESuggestion {
  gender = 'gender',
  age = 'age',
  faceForm = 'faceForm',
  glassForm = 'glassForm',
  material = 'material',
}

export const LimitCount = 8;

export enum EStatus {
  ACTIVE,
  INACTIVE,
}
