import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BityFormOrderSummary from './BityFormOrderSummary';
import BityFormSignOrder from './BityFormSignOrder';
import BityFormStatusPage from './BityFormStatusPage';
import BityFormCurrencyForm from './Form/BityFormCurrencyForm';


type handleClickCloseCallbackType = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

type StringSetterCallBack = {
    (account: string): void
}

type BooleanSetterCallBack = {
    (bool: boolean): void
}

type BooleanArraySetterCallBack = {
    (inputField: { label: string; validate: boolean; defaultValidation: boolean; }[]): void
}

type BityArticle = {
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

const BityArticle: React.FC<BityArticle> = (props) => {
    return (
        <Container fixed>
            <Box sx={{ marginTop: '100px', height: '80%' }}>
                {/* TODO use switch here abstract step 0 and 1 furhter more */}
                {props.activeStep < 2 &&
                    <BityFormCurrencyForm 
                    activeStep={props.activeStep}
                    validate={props.validate}
                    outputAccount={props.outputAccount}
                    inputAccount={props.inputAccount}
                    outputAmount={props.outputAmount}
                    inputAmount={props.inputAmount}
                    setOutputAccountCallBack={props.setOutputAccountCallBack}
                    setInputAccountCallBack={props.setInputAccountCallBack}
                    setOutputAmountCallBack={props.setOutputAmountCallBack}
                    setInputAmountCallBack={props.setInputAmountCallBack}
                    setValidate={props.setValidate}
                    ></BityFormCurrencyForm>
                }
                {props.activeStep === 2 &&
                    <BityFormOrderSummary></BityFormOrderSummary>
                }
                {props.activeStep === 3 &&
                    <BityFormStatusPage></BityFormStatusPage>
                }
            </Box>
        </Container>
    );
}

export default BityArticle;