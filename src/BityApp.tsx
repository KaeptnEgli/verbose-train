import * as React from "react";
import BityNav from './Nav/BityNav';
import BityBody from './BityBody';
import { Button } from '@mui/material';
import { Wrapper } from './components/BityWrapper.styles';
import BityForm from "./Form/BityForm";

const BityApp: React.FC = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [outputAccount, setOutputAccount] = React.useState('');
    const [inputAccount, setInputAccount] = React.useState('');
    const [outputAmount, setOutputAmount] = React.useState('');
    const [inputAmount, setInputAmount] = React.useState('');

    console.log(setInputAccount);


    const handleForwardClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (activeStep < 3) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setOpen(true);
    };

    const handleClickClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Wrapper name="naviagtion">
                <BityNav activeStep={activeStep}></BityNav>
            </Wrapper>
            <Wrapper>
                <BityForm
                    activeStep={activeStep}
                    open={open}
                    outputAccount={outputAccount}
                    inputAccount={inputAccount}
                    outputAmount={outputAmount}
                    inputAmount={inputAmount}
                    setOutputAccountCallBack={setOutputAccount}
                    setInputAccountCallBack={setInputAccount}
                    setOutputAmountCallBack={setOutputAmount}
                    setInputAmountCallBack={setInputAmount}
                    handleClickCloseCallbackType={() => handleClickClose}></BityForm>
            </Wrapper>
            <Wrapper name="Body">
                <Button variant="contained" onClick={handleBackClick}>back</Button>
                <Button variant="outlined" onClick={handleForwardClick} type="submit">next</Button>
                <Button variant="outlined" onClick={handleClickOpen}>Confirm Order</Button>
            </Wrapper>
        </React.Fragment>
    );
};

export default BityApp;