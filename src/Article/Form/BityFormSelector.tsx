import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAccountValidator from './../../Validation/BityAccountValidator';
import { validate } from 'schema-utils';
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import BityAPIDataService from "./../../API/BityAPIDataService";

const MESSAGES = [
  'Total founds available in your account: 12 Eth = 1212.11 Other',
  'Field must not be empty.'
]

type Currency = {
  code: string;
  tags: string[];
}

type CurrencySetterCallBack = {
  (currency: Currency[]): void
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
  validate: { label: string; validate: boolean; defaultValidation: boolean }[];
  defaultCurrency: boolean;
  disabled: boolean;
  conversionFactor: number;
  setAccount: StringSetterCallBack;
  setAccounts: AccountSetterCallBack;
  setValidate: BooleanArraySetterCallBack;
  setCurrencies: CurrencySetterCallBack;
}

// TODO: props.label is a bit clunky try to change that

const BityFormSelector: React.FC<BityFormSelector> = (props) => {
  const [loading, setLoading] = React.useState(false);
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
      let responseCurrencies = await BityAPIDataService.getCurrenciesCrypto();
      props.setCurrencies(responseCurrencies);
      console.log(responseCurrencies);
    }
    loadAccounts();
    loadCurrencies();
  }, []);

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

  function getHelperText(): string {
    if (!findValidation() && !findDefaultValidation()!) {
      return 'Field must not be empty.';
    } else if (props.label === 'outputAccount' && props.account) {
      let account = props.accounts.find((account: Account) =>
        account.name === props.account
      );
      return `Total founds available in your account: ${account!.spendableBalance} ${account!.currency} = 1212.11 Other`
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
    let AccountValidator = new BityAccountValidator();
    if (AccountValidator.validate(e.target.value as string)) {
      setValidation(true);
    } else {
      setValidation(false);
    }
    props.setAccount(e.target.value as string);
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