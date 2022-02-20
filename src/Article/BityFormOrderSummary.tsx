import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BityFormSelector from './Form/BityFormSelector';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const BityFormOrderSummary: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: '150px' }}>
                <Typography gutterBottom variant="h3" component="div">
                    Order Confirmation                
                </Typography>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="div">
                            You Send
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            41
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            ETH
                        </Typography>
                    </Grid>
                </Grid>
                <Divider light />
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="div">
                            You Get
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            21
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            BTC
                        </Typography>
                    </Grid>
                </Grid>
                <Divider light />
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                            Exchange Rate
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                            1.345 ETH = 1 BTC
                        </Typography>
                    </Grid>
                </Grid>
                <Divider light />
                <Grid container alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                        Total Fees 0.0000123 ETH = 4,35 CHF
                    </Typography>
                </Grid >
                <Typography gutterBottom component="div">
                    Non Verified Fees 0.00234 = 1.2 CHF
                </Typography>
                <Typography gutterBottom component="div">
                    Trading Fees 0.00234 = 1.2 CHF
                </Typography>
                <Typography gutterBottom component="div">
                    Crypto Transaction Fee 0.00234 = 1.2 CHF
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    You have 30 Secnonds time to confirm the order to guarantee the prices.
                </Typography>
            </Box>
        </Container >
    );
}

export default BityFormOrderSummary;