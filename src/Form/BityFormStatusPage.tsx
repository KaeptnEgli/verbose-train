import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BityFormSelector from './BityFormSelector';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';

const BityFormStatusPage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{
                marginTop: '150px', display: 'flex', justifyContent: 'center', flexDirection: 'column'
            }}>
                <Typography gutterBottom variant="h3" component="div">
                    Status
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Order Successful
                </Typography>
                <Divider light />
                <TextField id="outlined-basic" label="Outlined" variant="outlined"
                    defaultValue="bity.com"
                    InputProps={{
                        readOnly: true,
                    }} />
                <Button variant="contained">Copy Url</Button>
            </Box>
        </Container >
    );
}

export default BityFormStatusPage;