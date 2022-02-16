import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BityFormSelector from './BityFormSelector';
import BityFormAmount from './BityFormAmount';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

type AccountSetterCallBack = {
    (account: string): void
}

type BityFormCurrencyForm = {
    activeStep: number;
    validate: boolean;
    outputAccount: string;
    inputAccount: string;
    outputAmount: string;
    inputAmount: string;
    setOutputAccountCallBack: AccountSetterCallBack;
    setInputAccountCallBack: AccountSetterCallBack;
    setOutputAmountCallBack: AccountSetterCallBack;
    setInputAmountCallBack: AccountSetterCallBack;
}

const BityFormCurrencyForm: React.FC<BityFormCurrencyForm> = (props) => {

    function validateForm() {
        console.log(props.outputAccount + " " + props.inputAccount);
    }

    function createCurrencyInput(amount: string, setAmount: AccountSetterCallBack, account: string, setAccount: AccountSetterCallBack) {
        if (props.activeStep === 0) {
            return <BityFormSelector account={account} validate={props.validate} conversionFactor={2} setAccount={setAccount}></BityFormSelector>
        } else if (props.activeStep === 1)
            return (
                <React.Fragment>
                    <BityFormAmount amount={amount} conversionFactor={1} setAmount={setAmount} ></BityFormAmount>
                    <BityFormSelector account={account} validate={props.validate} conversionFactor={1} setAccount={setAccount}></BityFormSelector>
                </React.Fragment>
            )
    }

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

    return (
        <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}>
            {createCurrencyInput(props.outputAmount, props.setOutputAmountCallBack, props.outputAccount, props.setOutputAccountCallBack)}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <IconButton aria-label="switch" size="large" onClick={switchInputValues}>
                        <CompareArrowsIcon fontSize="inherit" />
                    </IconButton>
                </FormControl>
            </Box>
            {createCurrencyInput(props.inputAmount, props.setInputAmountCallBack, props.inputAccount, props.setInputAccountCallBack)}
            {/* <Button onClick={validateForm}>validate</Button> */}
        </Stack>
    );
}

export default BityFormCurrencyForm;