import { Currency } from './Currency';
import { Account } from "@ledgerhq/live-app-sdk";

export type AccountsCurrencies = {
    //loading: boolean;
    accounts: Account[];
    currencies: Currency[];
}