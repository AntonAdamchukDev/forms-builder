export class InputDefault {
  public type?: string;
  public required?: boolean;
  public placeholder?: string;
  constructor(public label: string = '') {}
}

export class InputEmail extends InputDefault {
  override type?: string | undefined = 'email';
}

export class InputPassword extends InputDefault {
  override type?: string | undefined = 'password';
}
