import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BityFormSelector from './BityFormSelector';
import BityFromInputSwitch from './BityFromInputSwitch';
import BityFormAmount from './BityFormAmount';

type AccountSetterCallBack = {
    (account: string): void
}

type BityFormCurrencyForm = {
    activeStep: number;
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
            return <BityFormSelector account={account} conversionFactor={2} setAccount={setAccount}></BityFormSelector>
        } else if (props.activeStep === 1)
        return (
            <React.Fragment>
                <BityFormAmount amount={amount} conversionFactor={1} setAmount={setAmount} ></BityFormAmount>
                <BityFormSelector account={account} conversionFactor={1} setAccount={setAccount}></BityFormSelector>
            </React.Fragment>
        )
    }

    return (
        <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}>
            {createCurrencyInput(props.outputAmount, props.setOutputAmountCallBack, props.outputAccount, props.setOutputAccountCallBack)}
            <BityFromInputSwitch></BityFromInputSwitch>
            {createCurrencyInput(props.inputAmount, props.setInputAmountCallBack, props.inputAccount, props.setInputAccountCallBack)}
            <Button onClick={validateForm}>validate</Button>
        </Stack>
    );
}

export default BityFormCurrencyForm;