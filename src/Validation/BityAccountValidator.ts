class BityAccountValidator {
  validation: boolean

  constructor() {
    this.validation = false;
  }

  public validate(account: string): boolean {
     return this.requiredValidator(account);
  }

  private requiredValidator (value?: string): boolean {
    if (!value)
      return false;
    return true;
  }

}

export default BityAccountValidator;