import { createContext } from "react";
import { Account } from "@ledgerhq/live-app-sdk";
import { Currency } from '../Types/Currency';

type ValidateObject = {
    label: string; 
    validate: boolean; 
    defaultValidation: boolean;
}

type StringSetterCallBack = {
    (account: string): void
}

type ValidateObjectArraySetterCallBack = {
    (inputField: ValidateObject[]): void
}

type AccountArraySetterCallBack = {
    (accounts: Account[]): void
}

type CurrenciesSetterCallBack = {
    (currencies: Currency[]): void
}

type ConversionCurrencySetterCallBack = {
    (conversionCurrency: Currency): void
}

export type AppDataContextType = {
    outputAccount: string;
    inputAccount: string;
    outputAmount: string;
    inputAmount: string;
    validate: ValidateObject[];
    accounts: Account[]
    currencies: Currency[]
    conversionCurrency: Currency
    setOutputAccount: StringSetterCallBack;
    setInputAccount: StringSetterCallBack;
    setOutputAmount: StringSetterCallBack;
    setInputAmount: StringSetterCallBack;
    setValidate: ValidateObjectArraySetterCallBack;
    setAccounts: AccountArraySetterCallBack;
    setCurrencies: CurrenciesSetterCallBack;
    setConversionCurrency: ConversionCurrencySetterCallBack;
}

export const AppDataContext = createContext<AppDataContextType>({} as AppDataContextType);
