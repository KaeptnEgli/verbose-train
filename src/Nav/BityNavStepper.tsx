import * as React from "react";

//import { Stepper, Step } from 'react-form-stepper';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { Wrapper } from '../components/BityWrapper.styles';

const steps = [
    'Account',
    'Amount',
    'Confirmation',
    'Status',
];

type BityNav = {
    activeStep: number;
}

const BityNav: React.FC<BityNav> = (props) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={props.activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default BityNav;