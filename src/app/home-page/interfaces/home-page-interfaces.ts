export interface Token {
  iat: number;
  exp: number;
  sub: string;
  email: string;
}

export interface User {
  id: number;
  profileImgUrl: string;
  email: string;
}
