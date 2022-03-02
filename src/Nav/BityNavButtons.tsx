import * as React from "react";
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';

type CallBackTypeMouseEvent = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

type BityNavButtons = {
    activeStep: number
    handleBackClick: CallBackTypeMouseEvent
    handleForwardClick: CallBackTypeMouseEvent
    handleClickOpen: CallBackTypeMouseEvent
}

const BityNavButtons: React.FC<BityNavButtons> = (props) => {
    return (
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: 2,
                justifyContent: 'space-between',
                marginTop: '20px',
            }}>
                <Button
                    sx={{ mr: 1 }}
                    size="large"
                    color="inherit"
                    disabled={props.activeStep === 0}
                    onClick={props.handleBackClick}>BACK</Button>
                <Button
                    sx={{ mr: 1 }}
                    size="large"
                    onClick={props.handleForwardClick} type="submit">{
                        props.activeStep < 3 ? 'NEXT' : 'NEXT TRANSACTION '
                    }</Button>
            </Box>
        </Container>
    );
};

export default BityNavButtons;