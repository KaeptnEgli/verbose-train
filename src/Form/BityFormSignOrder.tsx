import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
//import connectivity from './assets/connectivity_350.png';

type handleClickCloseCallbackType = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

type BityFormSignOrder = {
    handleClickCloseCallbackType: handleClickCloseCallbackType
    open: boolean;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BityFormSignOrder: React.FC<BityFormSignOrder> = (props) => {
    function callbackWrapper() {
        console.log(props);
    }
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClickCloseCallbackType}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Sign the Transaction with Your Ledger Live Wallet"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please connect your Ledger-Live-Wallet to your device and confirm the transaction.
                        <div>
                            {/* <img src={connectivity} alt="connect your ledger live wallet" /> */}
                        </div>          
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => callbackWrapper}>Cancel</Button>
                    <Button onClick={() => props.handleClickCloseCallbackType}>Sign</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BityFormSignOrder;
