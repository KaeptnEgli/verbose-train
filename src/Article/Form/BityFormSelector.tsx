import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAccountValidator from './../../Validation/BityAccountValidator';
import { validate } from 'schema-utils';

const MESSAGES = [
  'Total founds available in your account: 12 Eth = 1212.11 Other',
  'Field must not be empty.'
]

const CURRENCIES = [
  {
    address: 'xX123abc34',
    balance: '30',
    blockHeight: '500',
    currency: 'ETH',
    id: '0',
    lastSyncDate: 'someDate',
    name: 'name-0',
    spendableBalance: '30',
  },
  {
    address: 'xX123abc34',
    balance: '300',
    blockHeight: '5000',
    currency: 'BTC',
    id: '1',
    lastSyncDate: 'someDate',
    name: 'name-1',
    spendableBalance: '30',
  },
  {
    address: 'xX123abc34',
    balance: '400',
    blockHeight: '5000',
    currency: 'DOT',
    id: '2',
    lastSyncDate: 'someDate',
    name: 'name-2',
    spendableBalance: '400',
  },
];

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
  validate: { label: string; validate: boolean; defaultValidation: boolean}[];
  conversionFactor: number;
  setAccount: StringSetterCallBack;
  setValidate: BooleanArraySetterCallBack;
}

const BityFormSelector: React.FC<BityFormSelector> = (props) => {
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
        error={!findValidation() && !findDefaultValidation()}
        select
        id="outlined-select-crypto"
        label="Choose Account"
        value={props.account}
        onChange={handleChange}
        helperText={props.validate ? MESSAGES[0] : MESSAGES[1]}
      >
        {CURRENCIES.map((option) => (
          <MenuItem key={option.id} value={option.currency}>
            {option.currency}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

export default BityFormSelector;