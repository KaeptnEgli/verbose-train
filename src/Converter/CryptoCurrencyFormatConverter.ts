// TODO: BigNuber depedency to ledger live sdk https://github.com/LedgerHQ/live-app-sdk/blob/main/package.json - not good
import { BigNumber } from "bignumber.js";

class CryptoCurrencyFormatConverter {
    cryptoCurrencyNameToSymbolActionMap = {
        ethereum: 'ETH',
        bitcoin: 'BTC',
    }

    cryptoCurrencySymbolToNameActionMap = {
        ETH: 'ethereum',
        BTC: 'bitcoin',
    }

    cryptoCurrencyNumberFormatActionMap = {
        ethereum: 18, //10^18
        bitcoin: 8, //10^8
    }

    //TODO: acoid any type for action map use cryptoCurrencyNameToSymbolActionMap - typescript handbook
    public convertNametoSymbol(this: any, cryptoCurrency: string): string {
        return this.cryptoCurrencyNameToSymbolActionMap[cryptoCurrency];
    }

    public convertSymboltoName(this: any, cryptoCurrency: string): string {
        return this.cryptoCurrencySymbolToNameActionMap[cryptoCurrency];
    }

    //TODO: dito above
    public convertNumberFormat(this: any, cryptoCurrency: string, amount: BigNumber): BigNumber {
        return amount.dividedBy(new BigNumber(10).exponentiatedBy(this.cryptoCurrencyNumberFormatActionMap[cryptoCurrency]));
    }
}

export default CryptoCurrencyFormatConverter;