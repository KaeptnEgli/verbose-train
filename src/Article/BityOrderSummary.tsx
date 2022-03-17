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
import CryptoCurrencyFormatConverter from '../Converter/CryptoCurrencyFormatConverter';
import BityAPIDataService from "../API/BityAPIDataService";
import { Account } from "@ledgerhq/live-app-sdk";
import { BigNumber } from "bignumber.js";
import { AppDataContextType } from '../Context/AppDataContext';

type BityOrderSummary = {
    appData: AppDataContextType;
}

const numberPrecision = 5;
const miliseconds = 1000;
const seconds = 120;

const BityOrderSummary: React.FC<BityOrderSummary> = (props) => {
    // TODO: set refelctive type instead of any
    const [estimateOrder, setEstimateOrder] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);
    const [timerDue, setTimerDue] = React.useState(true);

    const loadConversionAmount = async () => {
        const converter = new CryptoCurrencyFormatConverter();
        const account = getActiveAccount();
        const inputAccount = getActiveAccount(props.appData.inputAccount);
        console.log(String(converter.convertNumberFormat(account!.currency, new BigNumber(props.appData.outputAmount))));
        let result = await BityAPIDataService.postEstimateOrder(
            String(props.appData.outputAmount),
            converter.convertNametoSymbol(account!.currency),
            props.appData.inputAccount);
        setEstimateOrder(result);
        console.log(result);
        setLoading(false);
    }

    React.useEffect(() => {
        setLoading(true);
        loadConversionAmount();
        setInterval(loadConversionAmount, miliseconds * seconds);
    }, []);

    function getActiveAccount(activeAccountName: string = props.appData.outputAccount): Account {
        return (props.appData.accounts.find((account: Account) =>
            account.name === activeAccountName)!
        );
    }

    function renderOrderConfirmation() {
        return (
            <>
                <Typography gutterBottom variant="h3" component="div">
                    Order Summary
                </Typography>
                {!loading ? (
                    <>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="div">
                                    You Send
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {
                                        `${new BigNumber(estimateOrder.input.amount).toPrecision(numberPrecision)} ${estimateOrder.input.currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider light />
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="div">
                                    You Get
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {
                                        `${Number(estimateOrder.output.amount).toPrecision(numberPrecision)} ${estimateOrder.output.currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider light />
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="div">
                                    Exchange Rate
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {
                                        `1 ${estimateOrder.input.currency} = ${new BigNumber(estimateOrder.output.amount).dividedBy(Number(estimateOrder.input.amount)).toPrecision(numberPrecision)} ${estimateOrder.output.currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider light />
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Output Transaction Cost
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {
                                        `${new BigNumber(estimateOrder.price_breakdown.output_transaction_cost.amount).toPrecision(numberPrecision)} ${estimateOrder.price_breakdown.output_transaction_cost.currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Non Verified Fees
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {
                                        `${new BigNumber(estimateOrder.price_breakdown["non-verified_fee"].amount).toPrecision(numberPrecision)} ${estimateOrder.price_breakdown["non-verified_fee"].currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Trading Fee
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {
                                        `${new BigNumber(estimateOrder.price_breakdown.customer_trading_fee.amount).toPrecision(numberPrecision)} ${estimateOrder.price_breakdown.customer_trading_fee.currency}`
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2">
                            You have a 120 Secnonds time to confirm the order to guarantee the prices.
                        </Typography>
                    </>
                ) :
                    <Typography color="text.secondary" variant="body2">
                        Loading Order Summary...
                    </Typography>}
            </>
        )
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: '150px' }}>
                {renderOrderConfirmation()}
            </Box>
        </Container >
    );
}

export default BityOrderSummary;