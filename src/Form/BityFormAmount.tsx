import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type AccountSetterCallBack = {
    (account: string): void
}

type BityFormAmount = {
    amount: string | number;
    conversionFactor: number;
    setAmount: AccountSetterCallBack;
}

const BityFormAmount: React.FC<BityFormAmount> = (props) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setAmount(e.target.value as string);
    }
    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <TextField
                    error={props.amount > 0 ? false : true}
                    id="outlined-basic"
                    label="Choose Amount"
                    variant="outlined"
                    helperText="Incorrect entry."
                    value={props.amount}
                    onChange={handleChange} />
            </FormControl>
        </Box>
    );
}

export default BityFormAmount;