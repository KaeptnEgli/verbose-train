import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BityFormSelector from './BityFormSelector';
import BityFormAmount from './BityFormAmount';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const CURRENCIES = [
    { code: 'CHF', label: 'Switzerland' },
    { code: 'EUR', label: 'EU' },
]
//TODO: refine type definitions

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
    function switchInputValues() {
        if (props.activeStep === 0) {
            let valueSwtichList = [props.outputAccount, props.inputAccount];
            props.setOutputAccountCallBack(valueSwtichList[1]);
            props.setInputAccountCallBack(valueSwtichList[0]);
        } else if (props.activeStep === 1) {
            let valueSwtichList = [props.outputAmount, props.inputAmount];
            props.setOutputAmountCallBack(valueSwtichList[1]);
            props.setInputAmountCallBack(valueSwtichList[0]);
        }
    }

    function createCurrencyInputFields(
        label: string,
        amount: string,
        setAmount: StringSetterCallBack,
        account: string,
        setAccount: StringSetterCallBack,
        setValidate: BooleanArraySetterCallBack) {
        if (props.activeStep === 0) {
            return <BityFormSelector
                label={label+"Account"}
                account={account}
                validate={props.validate}
                conversionFactor={2}
                setAccount={setAccount}
                setValidate={setValidate}
                ></BityFormSelector>
        } else if (props.activeStep === 1)
            return (
                <React.Fragment>
                    <BityFormAmount
                        label={label+"Amount"}
                        amount={amount}
                        validate={props.validate}
                        conversionFactor={1}
                        setAmount={setAmount}
                        setValidate={setValidate}
                        ></BityFormAmount>
                    <BityFormSelector
                        label={label+"Account"}
                        account={account}
                        validate={props.validate}
                        conversionFactor={1}
                        setAccount={setAccount}
                        setValidate={setValidate}
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
                    props.setOutputAmountCallBack,
                    props.outputAccount,
                    props.setOutputAccountCallBack,
                    props.setValidate)}
                <FormControl fullWidth>
                    <IconButton aria-label="switch" size="large" onClick={switchInputValues}>
                        <CompareArrowsIcon fontSize="inherit" />
                    </IconButton>
                </FormControl>
                {createCurrencyInputFields(
                    'input',
                    props.inputAmount,
                    props.setInputAmountCallBack,
                    props.inputAccount,
                    props.setInputAccountCallBack,
                    props.setValidate)}
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