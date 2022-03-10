import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAmountValidator from './../../Validation/BityAmountValidator';
import { AppDataContext, AppDataContextType } from '../../Context/AppDataContext';

const MESSAGES = [
    'Choose the amount you want to sell or buy.',
    'Incorrect amount, must not be empty and greather than 0'
]

type StringSetterCallBack = {
    (account: string): void
}

type BityFormAmount = {
    label: string;
    appData: AppDataContextType;
}

const BityFormAmount: React.FC<BityFormAmount> = (props) => {
    
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
                helperText={props.appData.validate ? MESSAGES[0] : MESSAGES[1]}
                value={props.label == 'outputAmount' ? props.appData.outputAmount : props.appData.inputAmount }
                onChange={handleChange} />
        </FormControl>
    );
}

export default BityFormAmount;