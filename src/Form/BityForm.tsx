import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BityFormOrderSummary from './BityFormOrderSummary';
import BityFormSignOrder from './BityFormSignOrder';
import BityFormStatusPage from './BityFormStatusPage';
import BityFormCurrencyForm from './BityFormCurrencyForm';
import { Button } from '@mui/material';


type handleClickCloseCallbackType = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

type AccountSetterCallBack = {
    (account: string): void
}

type BityForm = {
    activeStep: number;
    open: boolean;
    outputAccount: string;
    inputAccount: string;
    outputAmount: string;
    inputAmount: string;
    setOutputAccountCallBack: AccountSetterCallBack;
    setInputAccountCallBack: AccountSetterCallBack;
    setOutputAmountCallBack: AccountSetterCallBack;
    setInputAmountCallBack: AccountSetterCallBack;
    handleClickCloseCallbackType: handleClickCloseCallbackType;
}

const BityForm: React.FC<BityForm> = (props) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: '50px', height: '80%' }}>
                {/* TODO use switch here abstract step 0 and 1 furhter more */}
                {props.activeStep < 2 &&
                    <BityFormCurrencyForm 
                    activeStep={props.activeStep}
                    outputAccount={props.outputAccount}
                    inputAccount={props.inputAccount}
                    outputAmount={props.outputAmount}
                    inputAmount={props.inputAmount}
                    setOutputAccountCallBack={props.setOutputAccountCallBack}
                    setInputAccountCallBack={props.setInputAccountCallBack}
                    setOutputAmountCallBack={props.setOutputAmountCallBack}
                    setInputAmountCallBack={props.setInputAmountCallBack}
                    ></BityFormCurrencyForm>
                }
                {props.activeStep === 2 &&
                    <BityFormOrderSummary></BityFormOrderSummary>
                }
                {props.activeStep === 3 &&
                    <BityFormStatusPage></BityFormStatusPage>
                }
            </Box>
            <BityFormSignOrder handleClickCloseCallbackType={() => props.handleClickCloseCallbackType} open={props.open} ></BityFormSignOrder>
        </Container>
    );
}

export default BityForm;