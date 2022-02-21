export class InputDefault {
  public type: string = '';
  public required?: boolean;
  public placeholder?: string;
  constructor(public label: string = '', public formControl: string = '') {}
}

export class InputEmail extends InputDefault {
  override type: string = 'email';
}

export class InputPassword extends InputDefault {
  override type: string = 'password';
}
