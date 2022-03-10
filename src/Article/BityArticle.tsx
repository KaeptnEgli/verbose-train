import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BityFormOrderSummary from './BityFormOrderSummary';
import BityFormSignOrder from './BityFormSignOrder';
import BityFormStatusPage from './BityFormStatusPage';
import BityFormCurrencyForm from './Form/BityFormCurrencyForm';
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import { ActiveStepContext } from '../Context/ActiveStepContext';
import { AppDataContext } from '../Context/AppDataContext';

type handleClickCloseCallbackType = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

type AccountSetterCallBack = {
    (account: Account): void
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

const BityArticle: React.FC = () => {
    return (
        <>
            <ActiveStepContext.Consumer>
                {activeStepContext => (
                    <Container fixed>
                        <Box sx={{ marginTop: '100px', height: '80%' }}>
                            {/* TODO use switch here abstract step 0 and 1 furhter more */}
                            {activeStepContext.activeStep < 2 &&
                                <>
                                    <AppDataContext.Consumer>
                                        {AppDataContext => (
                                            <BityFormCurrencyForm appData={AppDataContext} />
                                        )}
                                    </AppDataContext.Consumer>
                                </>
                            }
                            {activeStepContext.activeStep === 2 &&
                                <>
                                    <AppDataContext.Consumer>
                                        {AppDataContext => (
                                            <BityFormOrderSummary appData={AppDataContext} />
                                        )}
                                    </AppDataContext.Consumer>
                                </>
                            }
                            {activeStepContext.activeStep === 3 &&
                                <BityFormStatusPage />
                            }
                        </Box>
                    </Container>
                )}
            </ActiveStepContext.Consumer>
        </>
    );
}

export default BityArticle;