import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAmountValidator from './../../Validation/BityAmountValidator';
import { AppDataContext, AppDataContextType } from '../../Context/AppDataContext';

const MESSAGES = [
    'Amount you send',
    'Amount you recieve',
    'Incorrect amount, must not be empty and greather than 0'
]

type BityFormAmount = {
    label: string;
    appData: AppDataContextType;
}

const BityFormAmount: React.FC<BityFormAmount> = (props) => {

    function getHelperText(): string {
        if (!findValidation() && !findDefaultValidation()) {
            return MESSAGES[2];
        } else {
            if (props.label == 'outputAmount') {
                return MESSAGES[0];

            } else {
                return MESSAGES[1];
            }
        }
    }
    
    function findDefaultValidation(): boolean {
        return props.appData.validate.find((inputField) =>
          inputField.label === props.label)!.defaultValidation;
      }
    
      function findValidation(): boolean {
        return props.appData.validate.find((inputField) =>
          inputField.label === props.label)!.validate;
      }
    
      function setValidation(validation: boolean): void {
        props.appData.setValidate(props.appData.validate.map((inputField: any) =>
          inputField.label === props.label
            ? { ...inputField, validate: validation, defaultValidation: false }
            : { ...inputField }))
      }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let AmountValidator = new BityAmountValidator();
        if (AmountValidator.validateField(e.target.value as string)) {
            setValidation(true);
        } else {
            setValidation(false);
        }
        if (props.label == 'outputAmount') {
            props.appData.setOutputAmount(e.target.value as string);
        } else if (props.label == 'inputAmount') {
            props.appData.setInputAmount(e.target.value as string);
        }
    }
    return (
        <FormControl fullWidth>
            <TextField
                error={!findValidation() && !findDefaultValidation()}
                id="outlined-basic"
                label="Choose Amount"
                variant="outlined"
                helperText={getHelperText()}
                value={props.label == 'outputAmount' ? props.appData.outputAmount : props.appData.inputAmount }
                onChange={handleChange} />
        </FormControl>
    );
}

export default BityFormAmount;