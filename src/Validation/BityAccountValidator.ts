import { BigNumber } from "bignumber.js";
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import CryptoCurrencyFormatConverter from "../Converter/CryptoCurrencyFormatConverter";

class BityAccountValidator {
  validation: boolean
  converter: CryptoCurrencyFormatConverter

  constructor() {
    this.validation = false;
    this.converter = new CryptoCurrencyFormatConverter;
  }

  public validateField(account: string): boolean {
     return this.requiredValidator(account);
  }

  public validateAccount(account: Account, minimumAmount: BigNumber) {
    return this.hasSufficientFunds(account, minimumAmount);
  }

  private requiredValidator (value?: string): boolean {
    if (!value)
      return false;
    return true;
  }

  private hasSufficientFunds(account: Account, minimumAmount: BigNumber) {
    const fundsAvailable = this.converter.convertNumberFormat(account!.currency, account!.spendableBalance);
    console.log(fundsAvailable +" "+ minimumAmount);
    return fundsAvailable.isGreaterThan(minimumAmount);
  }

}

export default BityAccountValidator;