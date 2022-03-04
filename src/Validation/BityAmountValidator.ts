class BityAmountValidator {
  validation: boolean;

  constructor() {
    this.validation = false;
  }

  public validateField(amount: string | number): boolean {
    this.validation = this.requiredValidator(amount);
    this.validation = this.nonZeroOrNegativeValidator(amount)
    return this.validation;
  }

  private requiredValidator(value: string | number): boolean {
    if (!value)
      return false;
    return true;
  }

  private nonZeroOrNegativeValidator(value: string | number): boolean {
    if (value <= 0) 
      return false;
    return true;
  }
}

export default BityAmountValidator;