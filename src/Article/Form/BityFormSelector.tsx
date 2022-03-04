import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAccountValidator from './../../Validation/BityAccountValidator';
import { BigNumber } from "bignumber.js";
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import BityAPIDataService from "./../../API/BityAPIDataService";
import CryptoCurrencyFormatConverter from '../../Converter/CryptoCurrencyFormatConverter';

const MESSAGES = [
  'Total founds available in your account: 12 Eth = 1212.11 Other',
  'Field must not be empty.'
]

type Currency = {
  code: string;
  tags: string | string[];
}

type CurrencySetterCallBack = {
  (currency: Currency): void
}

type CurrenciesSetterCallBack = {
  (currency: Currency[]): void
}

type AccountsSetterCallBack = {
  (account: Account[]): void
}

type AccountSetterCallBack = {
  (account: Account[]): void
}

type StringSetterCallBack = {
  (account: string): void
}

type BooleanSetterCallBack = {
  (bool: boolean): void
}

type BooleanArraySetterCallBack = {
  (inputField: { label: string; validate: boolean; defaultValidation: boolean }[]): void
}

type BityFormSelector = {
  label: string;
  account: string;
  accounts: Account[];
  currencies: Currency[];
  conversionCurrency: Currency;
  validate: { label: string; validate: boolean; defaultValidation: boolean }[];
  defaultCurrency: boolean;
  disabled: boolean;
  setAccount: StringSetterCallBack;
  setAccounts: AccountsSetterCallBack;
  setValidate: BooleanArraySetterCallBack;
  setCurrencies: CurrenciesSetterCallBack;
  setConversionCurrency: CurrencySetterCallBack;
}

// TODO: props.label is a bit clunky try to change that

const BityFormSelector: React.FC<BityFormSelector> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [conversionAmount, setConversionAmount] = React.useState(0);
  const [minimumAmount, setMinimumAmount] = React.useState(new BigNumber(0));
  const [hasSufficientFunds, setHasSufficientFunds] = React.useState(true);
  const llapi = new LedgerLiveApi(new WindowMessageTransport());

  React.useEffect(() => {
    const loadAccounts = async () => {
      llapi.connect();
      setLoading(true);
      const response = await llapi.listAccounts()
      props.setAccounts(response);
      setLoading(false);
    }

    const loadCurrencies = async () => {
      const responseCurrencies = await BityAPIDataService.getCurrenciesCrypto();
      props.setCurrencies(responseCurrencies);
    }

    const loadConversionAmount = async () => {
      const converter = new CryptoCurrencyFormatConverter();
      const account = getActiveAccount();
      if (account && props.label === 'outputAccount') {
        console.log('here');
        let result = await BityAPIDataService.postEstimateOrder(
          `${String(converter.convertNumberFormat(account!.currency, account!.spendableBalance))}`,
          converter.convertNametoSymbol(account!.currency),
          props.conversionCurrency.code);
        setConversionAmount(result.output.amount);
        setMinimumAmount(result.input.minimum_amount);
      }
    }

    loadAccounts();
    loadCurrencies();
    loadConversionAmount();
  }, [props.account, props.conversionCurrency]); // runs on first render en every time props.account is changed.

  //TODO: use filter to only show available accounts.
  function renderMenuItem(): JSX.Element[] | undefined {
    if (!loading) {
      if (props.label === 'outputAccount') {
        return props.accounts.map((account) =>
          <MenuItem key={account.id} value={account.name}>
            {account.name}
          </MenuItem>)
      } else {
        return props.currencies.map((currency) =>
          <MenuItem key={currency.code} value={currency.code}>
            {currency.code}
          </MenuItem>
        )
      }
    }
    return;
  }

  // TODO: use Account type from ledger sdk or a wrapper type BityAccount / BityCurrency so not translation is needed. Translate on render
  function getActiveAccount(activeAccountName: string = props.account): Account {
    return (props.accounts.find((account: Account) =>
      account.name === activeAccountName)!
    );
  }

  // TODO: performance issues to many rerenders here
  function getHelperText(): string {
    const converter = new CryptoCurrencyFormatConverter();
    if (props.account && props.label === 'outputAccount') {
      console.log('there');
      const account = getActiveAccount();
      const fundsAvailable = converter.convertNumberFormat(account!.currency, account!.spendableBalance);
      const currencySymbol = converter.convertNametoSymbol(account!.currency);
      if (!findValidation() && !findDefaultValidation()) {
        return `Insufficient funds of account ${account!.currency}: ${fundsAvailable}. Minimum amount needed for ${currencySymbol} is ${minimumAmount}`;
      } else if (props.label === 'outputAccount') {
        return `Total funds available in your account: ${fundsAvailable} ${currencySymbol} = ${conversionAmount} ${props.conversionCurrency.code}`;
      }
    } else if (!findValidation() && !findDefaultValidation()) {
      return 'Field must not be empty.';
    }
    return '';
  }

  function findDefaultValidation(): boolean {
    return props.validate.find((inputField) =>
      inputField.label === props.label)!.defaultValidation;
  }

  function findValidation(): boolean {
    return props.validate.find((inputField) =>
      inputField.label === props.label)!.validate;
  }

  function setValidation(validation: boolean): void {
    props.setValidate(props.validate.map((inputField: any) =>
      inputField.label === props.label
        ? { ...inputField, validate: validation, defaultValidation: false }
        : { ...inputField }))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const AccountValidator = new BityAccountValidator();
    const activeAccount = e.target.value as string;
    if (props.label == 'outputAccount' &&
      AccountValidator.validateField(e.target.value as string) &&
      AccountValidator.validateAccount(getActiveAccount(activeAccount), minimumAmount)) {
      setValidation(true);
    } else if (props.label == 'inputAccount' &&
      AccountValidator.validateField(e.target.value as string)) {
      setValidation(true);
    } else {
      setValidation(false);
    }
    props.setAccount(activeAccount);
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={props.disabled}
        error={!findValidation() && !findDefaultValidation()}
        select
        id={props.label}
        label="Choose Account"
        value={props.account}
        onChange={handleChange}
        helperText={getHelperText()}
      >
        {renderMenuItem()}
      </TextField>
    </FormControl>
  );
}

export default BityFormSelector;