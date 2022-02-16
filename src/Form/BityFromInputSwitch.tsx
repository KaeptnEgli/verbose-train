import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const BityFromInputSwitch: React.FC = () => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
      <IconButton aria-label="switch" size="large">
        <CompareArrowsIcon fontSize="inherit" />
      </IconButton>
      </FormControl>
    </Box>
  );
}

export default BityFromInputSwitch;