export interface IAccessToken {
  accessToken: string;
}

export interface IJWTPayload {
  username: string;
  role?: string;
  userId: number;
}

export interface ISignUpRes {
  message: string;
}

export interface ISignInRes {
  accessToken: string;
  role: string;
}
