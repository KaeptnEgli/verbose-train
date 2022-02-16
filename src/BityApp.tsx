import * as React from "react";
import BityNavStepper from './Nav/BityNavStepper';
import BityNavButtons from "./Nav/BityNavButtons";
import { Wrapper } from './components/BityWrapper.styles';
import BityArticle from "./Form/BityArticle";
import BityImage from './components/BityImage';


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
        } else if (activeStep === 3) {
            setActiveStep(0);
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
            <Wrapper name="NavTop">
                <BityImage></BityImage>
                <BityNavStepper activeStep={activeStep}></BityNavStepper>
            </Wrapper>
            <Wrapper name="Article">
                <BityArticle
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
            <Wrapper name="NavBottom">
                <BityNavButtons
                    activeStep={activeStep}
                    handleBackClick={handleBackClick}
                    handleForwardClick={handleForwardClick}
                    handleClickOpen={handleClickOpen}
                ></BityNavButtons>
            </Wrapper>
        </React.Fragment>
    );
};

export default BityApp;