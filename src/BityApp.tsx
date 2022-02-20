import * as React from "react";
import BityNavStepper from './Nav/BityNavStepper';
import BityNavButtons from "./Nav/BityNavButtons";
import { Wrapper } from './components/BityWrapper.styles';
import BityArticle from "./Article/BityArticle";
import BityImage from './components/BityImage';

const BityApp: React.FC = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [outputAccount, setOutputAccount] = React.useState('');
    const [inputAccount, setInputAccount] = React.useState('');
    const [outputAmount, setOutputAmount] = React.useState('');
    const [inputAmount, setInputAmount] = React.useState('');
    const [isDefaultValidation, setIsDefaultValidation] = React.useState(true);
    const [validate, setValidate] = React.useState([
        { label: 'outputAccount', validate: false, defaultValidation: true },
        { label: 'inputAccount', validate: false, defaultValidation: true },
        { label: 'outputAmount', validate: false, defaultValidation: true },
        { label: 'inputAmount', validate: false, defaultValidation: true },
    ]);

    const resetDefaulValidation = (): void => {
        setValidate(validate.map((inputField) => ({
            ...inputField, defaultValidation: true})));
    }

    const handleForwardClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        let validateFirstPage = validate[0].validate && validate[1].validate;
        let validateSecondPage = validateFirstPage && validate[2].validate && validate[3].validate;

        if (activeStep === 0 && !validateFirstPage) {
            return;
        }
        if (activeStep === 1 && !validateSecondPage) {
            return;
        } else if (activeStep < 3) {
            console.log(validate);
            resetDefaulValidation();
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
                    validate={validate}
                    outputAccount={outputAccount}
                    inputAccount={inputAccount}
                    outputAmount={outputAmount}
                    inputAmount={inputAmount}
                    setOutputAccountCallBack={setOutputAccount}
                    setInputAccountCallBack={setInputAccount}
                    setOutputAmountCallBack={setOutputAmount}
                    setInputAmountCallBack={setInputAmount}
                    setValidate={setValidate}
                ></BityArticle>
            </Wrapper>
            <Wrapper name="NavBottom">
                <BityNavButtons
                    activeStep={activeStep}
                    handleBackClick={handleBackClick}
                    handleForwardClick={handleForwardClick}
                    handleClickOpen={handleClickOpen}
                ></BityNavButtons>
            </Wrapper>
        </React.Fragment >
    );
};

export default BityApp;