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
import BityAPIDataService from "./../API/BityAPIDataService";
import { Account } from "@ledgerhq/live-app-sdk";
import { BigNumber } from "bignumber.js";
import BityFormSignOrder from './BityFormSignOrder';
import { AppDataContextType } from '../Context/AppDataContext';

type BityFormOrderSummary = {
    appData: AppDataContextType;
}

const numberPrecision = 5;
const miliseconds = 1000;
const seconds = 120;
const spaceCharacterES6 = '\u00A0';

const BityFormOrderSummary: React.FC<BityFormOrderSummary> = (props) => {
    // TODO: set refelctive type instead of any
    const [estimateOrder, setEstimateOrder] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);
    const [timerDue, setTimerDue] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        const loadConversionAmount = async () => {
            const converter = new CryptoCurrencyFormatConverter();
            const account = getActiveAccount();
            const inputAccount = getActiveAccount(props.appData.inputAccount);
            let result = await BityAPIDataService.postEstimateOrder(
                `${String(converter.convertNumberFormat(account!.currency, account!.spendableBalance))}`,
                converter.convertNametoSymbol(account!.currency),
                props.appData.inputAccount);
            setEstimateOrder(result);
            console.log(result);
            setLoading(false);
        }
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
                    Order Confirmation
                </Typography>
                {!loading ? (
                    <><Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                You Send
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h6" component="div">
                                {
                                    `${new BigNumber(estimateOrder.input.amount).toPrecision(numberPrecision)}${spaceCharacterES6}`
                                }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h6" component="div">
                                {estimateOrder.input.currency}
                            </Typography>
                        </Grid>
                    </Grid><Divider light /><Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5" component="div">
                                    You Get
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {
                                        `${Number(estimateOrder.output.amount).toPrecision(numberPrecision)}${spaceCharacterES6}`
                                    }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    {estimateOrder.output.currency}
                                </Typography>
                            </Grid>
                        </Grid><Divider light /><Grid container alignItems="center">
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
                        </Grid><Divider light /><Grid container alignItems="center">
                            <Typography gutterBottom variant="h6" component="div">
                                Total Fees 
                                {
                                new BigNumber(estimateOrder.price_breakdown.customer_trading_fee.amount)
                                .plus(new BigNumber(estimateOrder.price_breakdown["non-verified_fee"].amount))
                                .toPrecision(numberPrecision)
                                }
                                {estimateOrder.input.amount}
                                 = ??? CHF
                            </Typography>
                        </Grid><Typography gutterBottom component="div">
                            Non Verified Fees {estimateOrder.price_breakdown.customer_trading_fee.amount} {estimateOrder.input.currency}
                        </Typography><Typography gutterBottom component="div">
                            Trading Fees {estimateOrder.price_breakdown["non-verified_fee"].amount} {estimateOrder.input.currency}
                        </Typography><Typography color="text.secondary" variant="body2">
                            You have a 120 Secnonds time to confirm the order to guarantee the prices.
                        </Typography></>
                ) : console.log('loading')}
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

export default BityFormOrderSummary;