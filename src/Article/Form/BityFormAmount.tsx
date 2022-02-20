import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import BityAmountValidator from './../../Validation/BityAmountValidator';

const MESSAGES = [
    'Choose the amount you want to sell or buy.',
    'Incorrect amount, must not be empty and greather than 0'
]

type StringSetterCallBack = {
    (amount: string): void
}

type BooleanSetterCallBack = {
    (bool: boolean): void
}

type BooleanArraySetterCallBack = {
    (inputField: { label: string; validate: boolean; defaultValidation: boolean }[]): void
}

type BityFormAmount = {
    label: string;
    amount: string | number;
    validate: { label: string; validate: boolean; defaultValidation: boolean}[];
    conversionFactor: number;
    setAmount: StringSetterCallBack;
    setValidate: BooleanArraySetterCallBack;
}

const BityFormAmount: React.FC<BityFormAmount> = (props) => {
    function findDefaultValidation(): boolean {
        return props.validate.find((inputField) =>
          inputField.label === props.label)!.defaultValidation;
      }
    
      function findValidation(): boolean {
        return props.validate.find((inputField) =>
          inputField.label === props.label)!.validate;
      }
    
      function setValidation(validation: boolean): void {
        props.setValidate(props.validate.map((inputField: any) =>
          inputField.label === props.label
            ? { ...inputField, validate: validation, defaultValidation: false }
            : { ...inputField }))
      }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let AmountValidator = new BityAmountValidator();
        if (AmountValidator.validate(e.target.value as string)) {
            setValidation(true);
        } else {
            setValidation(false);
        }
        props.setAmount(e.target.value as string);
    }
    return (
        <FormControl fullWidth>
            <TextField
                error={!findValidation() && !findDefaultValidation()}
                id="outlined-basic"
                label="Choose Amount"
                variant="outlined"
                helperText={props.validate ? MESSAGES[0] : MESSAGES[1]}
                value={props.amount}
                onChange={handleChange} />
        </FormControl>
    );
}

export default BityFormAmount;