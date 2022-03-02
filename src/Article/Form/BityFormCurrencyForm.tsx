import * as React from 'react';
import Stack from '@mui/material/Stack';
import BityFormSelector from './BityFormSelector';
import BityFormAmount from './BityFormAmount';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import BityAmountValidator from './../../Validation/BityAmountValidator';
import BityAccountValidator from './../../Validation/BityAccountValidator';
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";

const CURRENCIES = [
    { code: 'CHF', label: 'Switzerland' },
    { code: 'EUR', label: 'EU' },
]
//TODO: refine type definitions

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
    (value: string): void
}

type BooleanSetterCallBack = {
    (bool: boolean): void
}

type BooleanArraySetterCallBack = {
    (inputField: { label: string; validate: boolean; defaultValidation: boolean; }[]): void
}

type BityFormCurrencyForm = {
    activeStep: number;
    validate: { label: string; validate: boolean; defaultValidation: boolean; }[];
    outputAccount: string;
    inputAccount: string;
    outputAmount: string;
    inputAmount: string;
    setOutputAccountCallBack: StringSetterCallBack;
    setInputAccountCallBack: StringSetterCallBack;
    setOutputAmountCallBack: StringSetterCallBack;
    setInputAmountCallBack: StringSetterCallBack;
    setValidate: BooleanArraySetterCallBack;
}

const BityFormCurrencyForm: React.FC<BityFormCurrencyForm> = (props) => {
    const childRef = React.useRef();
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);

    function switchInputValues() {
        //console.log(childRef.current);
        if (props.activeStep === 1) {
            let valueSwtichList = [props.outputAmount, props.inputAmount];
            props.setOutputAmountCallBack(valueSwtichList[1]);
            props.setInputAmountCallBack(valueSwtichList[0]);
            // TODO: useRef to trigger onChange event on FormSelector to make sure the validator is rerun again
        }
    }

    function createCurrencyInputFields(
        label: string,
        amount: string,
        account: string,
        defaultCurrency: boolean,
        accounts: Account[],
        currencies: Currency[],
        setAccount: StringSetterCallBack,
        setAmount: StringSetterCallBack,
        setValidate: BooleanArraySetterCallBack,
        setAccounts: AccountSetterCallBack,
        setCurrencies: CurrencySetterCallBack) {
        if (props.activeStep === 0) {
            return <BityFormSelector
                label={label + "Account"}
                account={account}
                accounts={accounts}
                currencies={currencies}
                validate={props.validate}
                defaultCurrency={defaultCurrency}
                disabled={false}
                conversionFactor={2}
                setAccount={setAccount}
                setValidate={setValidate}
                setAccounts={setAccounts}
                setCurrencies={setCurrencies}
            ></BityFormSelector>
        } else if (props.activeStep === 1)
            return (
                <React.Fragment>
                    <BityFormAmount
                        //ref={childRef}
                        label={label + "Amount"}
                        amount={amount}
                        validate={props.validate}
                        conversionFactor={1}
                        setAmount={setAmount}
                        setValidate={setValidate}
                    ></BityFormAmount>
                    <BityFormSelector
                        label={label + "Account"}
                        account={account}
                        accounts={accounts}
                        currencies={currencies}
                        validate={props.validate}
                        defaultCurrency={defaultCurrency}
                        disabled={true}
                        conversionFactor={1}
                        setAccount={setAccount}
                        setValidate={setValidate}
                        setAccounts={setAccounts}
                        setCurrencies={setCurrencies}
                    ></BityFormSelector>
                </React.Fragment>
            )
    }

    return (
        <React.Fragment>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="space-evenly"
                alignItems="flex-start">
                {createCurrencyInputFields(
                    'output',
                    props.outputAmount,
                    props.outputAccount,
                    false,
                    accounts,
                    currencies,
                    props.setOutputAccountCallBack,
                    props.setOutputAmountCallBack,
                    props.setValidate,
                    setAccounts,
                    setCurrencies)}
                <FormControl fullWidth>
                    <IconButton aria-label="switch" size="large" onClick={switchInputValues}>
                        <CompareArrowsIcon fontSize="inherit" />
                    </IconButton>
                </FormControl>
                {createCurrencyInputFields(
                    'input',
                    props.inputAmount,
                    props.inputAccount,
                    true,
                    accounts,
                    currencies,
                    props.setInputAccountCallBack,
                    props.setInputAmountCallBack,
                    props.setValidate,
                    setAccounts,
                    setCurrencies)}
            </Stack>

            <FormControl size='small' sx={{ marginTop: '80px;' }}>
                <TextField
                    select
                    //error
                    id="outlined-select-currency"
                    label="Choose Fiat Currency"
                    //value={currency}
                    //onChange={handleChange}
                    helperText="Choose a fiat Currency for conversion"
                >
                    {CURRENCIES.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.code}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </React.Fragment>
    )
}

export default BityFormCurrencyForm;