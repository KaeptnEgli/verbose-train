// PasswordInput.tsx
//import withValidation from "./WithValidation";
//import Input from "./Input";

class BityAccountValidator {
  account: string;
  //valiadte: boolean

  constructor(account: string) {
    this.account = account;
  }

  public validate(): boolean {
     return this.requiredValidator(this.account);
  }

  private requiredValidator (value?: string): boolean {
    if (!value)
      return false;
    return true;
  }

}

export default BityAccountValidator;