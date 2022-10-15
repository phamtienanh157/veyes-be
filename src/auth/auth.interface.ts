export interface IAccessToken {
  accessToken: string;
}

export interface IJWTPayload {
  username: string;
  role?: string;
}

export interface ISignUpRes {
  message: string;
}

export interface ISignInRes {
  accessToken: string;
  userId: number;
}
