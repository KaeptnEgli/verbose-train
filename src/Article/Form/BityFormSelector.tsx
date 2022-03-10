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
import { AppDataContext, AppDataContextType } from '../../Context/AppDataContext';
import { Currency } from '../../Types/Currency';

const MESSAGES = [
  'Total founds available in your account: 12 Eth = 1212.11 Other',
  'Field must not be empty.'
]

type StringSetterCallBack = {
  (account: string): void
}

type BityFormSelector = {
  label: string;
  account: string;
  disabled: boolean;
  appData: AppDataContextType;
}

// TODO: props.label is a bit clunky try to change that
// TODO: not working yet: async loading waiting for fetch data. Evaluation fails.
// TODO: not working yet: evaluation on switch input fields value
// TODO: not working yet: don't show mutual exclusive transaction currencies

const BityFormSelector: React.FC<BityFormSelector> = (props) => {
  const [loadingAccounts, setLoadingAccounts] = React.useState(false);
  const [loadingConversionAmount, setLoadingConversionAmount] = React.useState(false);
  const [conversionAmount, setConversionAmount] = React.useState(0);
  const [minimumAmount, setMinimumAmount] = React.useState(new BigNumber(0));
  //const [hasSufficientFunds, setHasSufficientFunds] = React.useState(true);
  const llapi = new LedgerLiveApi(new WindowMessageTransport());

  React.useEffect(() => {
    setLoadingAccounts(true);
    //setLoadingConversionAmount(true);
    const loadAccounts = async () => {
      llapi.connect();
      const response = await llapi.listAccounts()
      props.appData.setAccounts(response);
      setLoadingAccounts(false);
    }

    const loadCurrencies = async () => {
      const responseCurrencies = await BityAPIDataService.getCurrenciesCrypto();
      props.appData.setCurrencies(responseCurrencies);
    }

    const loadConversionAmount = async () => {
      const converter = new CryptoCurrencyFormatConverter();
      const account = getActiveAccount();
      if (account && props.label === 'outputAccount') {
        console.log(account!)
        let result = await BityAPIDataService.postEstimateOrder(
          `${String(converter.convertNumberFormat(account!.currency, account!.spendableBalance))}`,
          converter.convertNametoSymbol(account!.currency),
          props.appData.conversionCurrency.code);
        setConversionAmount(result.output.amount);
        setMinimumAmount(result.input.minimum_amount);
        //setLoadingConversionAmount(false);
      }
    }

    loadAccounts();
    loadCurrencies();
    loadConversionAmount();

  }, [props.account, props.appData.conversionCurrency]); // runs on first render en every time props.account is changed.

  //TODO: use filter to only show available accounts.
  function renderMenuItem(): JSX.Element[] | undefined {
    if (!loadingAccounts) {
      if (props.label === 'outputAccount') {
        return props.appData.accounts.map((account) =>
          <MenuItem key={account.id} value={account.name}>
            {account.name}
          </MenuItem>)
      } else {
        return props.appData.currencies.map((currency) =>
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
    return (props.appData.accounts.find((account: Account) =>
      account.name === activeAccountName)!
    );
  }

  // TODO: performance issues to many rerenders here
  function getHelperText(): string {
    const converter = new CryptoCurrencyFormatConverter();
    if (props.account && props.label === 'outputAccount') {
      const account = getActiveAccount();
      console.log("1"+account!+props.account+props.label);
      const fundsAvailable = converter.convertNumberFormat(account!.currency, account!.spendableBalance);
      const currencySymbol = converter.convertNametoSymbol(account!.currency);
      if (!findValidation() && !findDefaultValidation()) {
        console.log("2"+account!);
        return `Insufficient funds of account ${account!.currency}: ${fundsAvailable}. Minimum amount needed for ${currencySymbol} is ${minimumAmount}`;
      } else if (props.label === 'outputAccount') {
        return `Total funds available in your account: ${fundsAvailable} ${currencySymbol} = ${conversionAmount} ${props.appData.conversionCurrency.code}`;
      }
    } else if (!findValidation() && !findDefaultValidation()) {
      return 'Field must not be empty.';
    }
    return '';
  }

  function findDefaultValidation(): boolean {
    return props.appData.validate.find((inputField) =>
      inputField.label === props.label)!.defaultValidation;
  }

  function findValidation(): boolean {
    return props.appData.validate.find((inputField) =>
      inputField.label === props.label)!.validate;
  }

  function setValidation(validation: boolean): void {
    props.appData.setValidate(props.appData.validate.map((inputField: any) =>
      inputField.label === props.label
        ? { ...inputField, validate: validation, defaultValidation: false }
        : { ...inputField }))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const AccountValidator = new BityAccountValidator();
    const activeAccount = e.target.value as string;  
    //if (!loadingConversionAmount) {
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
    //}
    if (props.label == 'outputAccount') {
      props.appData.setOutputAccount(activeAccount);
    } else if (props.label == 'inputAccount') {
      props.appData.setInputAccount(activeAccount);
    }
  }

    return (
      <FormControl fullWidth>
        <TextField
          disabled={props.disabled}
          error={!findValidation() && !findDefaultValidation()}
          select
          id={props.label}
          label="Choose Account"
          value={props.label == 'outputAccount' ? props.appData.outputAccount : props.appData.inputAccount}
          onChange={handleChange}
          helperText={getHelperText()}
        >
          {renderMenuItem()}
        </TextField>
      </FormControl>
    );
}

export default BityFormSelector;