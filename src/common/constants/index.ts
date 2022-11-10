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
