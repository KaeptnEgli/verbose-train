import * as React from "react";

//import { Stepper, Step } from 'react-form-stepper';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { Wrapper } from '../components/BityWrapper.styles';
import { ActiveStepContext } from "../Context/ActiveStepContext";

const steps = [
    'Account',
    'Amount',
    'Confirmation',
    'Status',
];

// type BityNav = {
//     activeStep: number;
// }

const BityNav: React.FC = () => {
    return (
        <>
            <ActiveStepContext.Consumer>
                {activeStepContext => (
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStepContext.activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                )}
            </ActiveStepContext.Consumer>

        </>
    );
};

export default BityNav;