import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BityOrderSummary from './BityOrderSummary';
import BityStatusPage from './BityStatusPage';
import BityForm from './Form/BityForm';
import LedgerLiveApi, { Account } from "@ledgerhq/live-app-sdk";
import { ActiveStepContext } from '../Context/ActiveStepContext';
import { AppDataContext } from '../Context/AppDataContext';

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
                                            <BityForm appData={AppDataContext} />
                                        )}
                                    </AppDataContext.Consumer>
                                </>
                            }
                            {activeStepContext.activeStep === 2 &&
                                <>
                                    <AppDataContext.Consumer>
                                        {AppDataContext => (
                                            <BityOrderSummary appData={AppDataContext} />
                                        )}
                                    </AppDataContext.Consumer>
                                </>
                            }
                            {activeStepContext.activeStep === 3 &&
                                <BityStatusPage />
                            }
                        </Box>
                    </Container>
                )}
            </ActiveStepContext.Consumer>
        </>
    );
}

export default BityArticle;