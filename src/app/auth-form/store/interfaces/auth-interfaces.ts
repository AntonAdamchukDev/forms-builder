export interface SignInformation {
  authorized: boolean;
  message: String;
}

export interface SignInSuccessInformation {
  expiresIn: number;
  idToken: string;
}
