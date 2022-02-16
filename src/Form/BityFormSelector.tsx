import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const currencies = [
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

type AccountSetterCallBack = {
  (account: string): void
}

type BityFormSelector = {
  account: string;
  conversionFactor: number;
  setAccount: AccountSetterCallBack;
}

const BityFormSelector: React.FC<BityFormSelector> = (props) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setAccount(e.target.value as string);
  }
  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <TextField
          select
          //error
          id="outlined-select-currency"
          label="Choose Account"
          value={props.account}
          onChange={handleChange}
          helperText="(Helper Text)Total founds available in your account: 12 Eth = 1212.11 Other"
        >
          {currencies.map((option) => (
            <MenuItem key={option.id} value={option.currency}>
              {option.currency}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
}

export default BityFormSelector;