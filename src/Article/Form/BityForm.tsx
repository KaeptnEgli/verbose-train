import * as React from 'react';
import Stack from '@mui/material/Stack';
import BityFormSelector from './BityFormSelector';
import BityFormAmount from './BityFormAmount';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import BityAmountValidator from '../../Validation/BityAmountValidator';
import BityAccountValidator from '../../Validation/BityAccountValidator';
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import { ActiveStepContext } from '../../Context/ActiveStepContext';
import { AppDataContext, AppDataContextType } from '../../Context/AppDataContext';
import { Currency } from '../../Types/Currency';


const CONVERSION_CURRENCIES = [
    { code: 'CHF', tags: 'Switzerland' },
    { code: 'EUR', tags: 'EU' },
]

type StringSetterCallBack = {
    (account: string): void
}

type BityForm = {
    appData: AppDataContextType;
}

const BityForm: React.FC<BityForm> = (props) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        props.appData.setConversionCurrency(
            CONVERSION_CURRENCIES
                .find((currency: Currency) =>
                    currency.code === e.target.value)!);
    }

    function setValidation(validation: boolean, label: string): void {
        props.appData.setValidate(props.appData.validate.map((inputField: any) =>
          inputField.label === label
            ? { ...inputField, validate: validation, defaultValidation: false }
            : { ...inputField }))
      }

    function switchInputValues(activeStep: number) {
        if (activeStep === 1) {
            let valueSwtichList = [props.appData.outputAmount, props.appData.inputAmount];
            props.appData.setOutputAmount(valueSwtichList[1]);
            props.appData.setInputAmount(valueSwtichList[0]);
        }
    }

    function createCurrencyInputFields(label: string, account: string, setAmount: StringSetterCallBack, setAccount: StringSetterCallBack, activeStep: number) {
        if (activeStep === 0) {
            return <BityFormSelector
                label={label + "Account"}
                account={account}
                disabled={false}
                appData={props.appData}
            ></BityFormSelector>
        } else if (activeStep === 1)
            return (
                <React.Fragment>
                    <BityFormAmount
                        label={label + "Amount"}
                        appData={props.appData}
                    ></BityFormAmount>
                    <BityFormSelector
                        label={label + "Account"}
                        account={account}
                        disabled={true}
                        appData={props.appData}
                    ></BityFormSelector>
                </React.Fragment>
            )
    }

    return (
        <React.Fragment>
            <ActiveStepContext.Consumer>
                {activeStepContext => (
                    <Stack
                        direction={{ xs: 'column', sm: 'column', md: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-evenly"
                        alignItems="flex-start">
                        {createCurrencyInputFields(
                            'output',
                            props.appData.outputAccount,
                            props.appData.setOutputAccount,
                            props.appData.setOutputAmount,
                            activeStepContext.activeStep)}
                        <FormControl fullWidth>
                            <IconButton aria-label="switch" size="large" onClick={() => switchInputValues(activeStepContext.activeStep)}>
                                <CompareArrowsIcon fontSize="inherit" />
                            </IconButton>
                        </FormControl>
                        {createCurrencyInputFields(
                            'input',
                            props.appData.inputAccount,
                            props.appData.setInputAccount,
                            props.appData.setInputAmount,
                            activeStepContext.activeStep)}
                    </Stack>
                )}
            </ActiveStepContext.Consumer>

            <FormControl size='small' sx={{ marginTop: '80px;' }}>
                <TextField
                    select
                    id="outlined-select-currency"
                    label="Choose Fiat Currency"
                    value={props.appData.conversionCurrency.code}
                    onChange={handleChange}
                    helperText="Choose a fiat Currency for conversion"
                >
                    {CONVERSION_CURRENCIES.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.code}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </React.Fragment>
    )
}

export default BityForm;