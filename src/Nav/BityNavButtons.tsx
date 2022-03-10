import * as React from "react";
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { ActiveStepContext } from '../Context/ActiveStepContext';

type CallBackTypeMouseEvent = {
    (e: React.MouseEvent<HTMLButtonElement>): void
}

// type BityNavButtons = {
//     activeStep: number
//     handleBackClick: CallBackTypeMouseEvent
//     handleForwardClick: CallBackTypeMouseEvent
//     handleClickOpen: CallBackTypeMouseEvent
// }

const BityNavButtons: React.FC = () => {
    return (
        <>
            <ActiveStepContext.Consumer>
                {activeStepContext => (
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
                                disabled={activeStepContext.activeStep === 0}
                                onClick={activeStepContext.handleBackClick}>BACK</Button>
                            <Button
                                sx={{ mr: 1 }}
                                size="large"
                                onClick={activeStepContext.handleForwardClick} type="submit">{
                                    activeStepContext.activeStep < 3 ? 'NEXT' : 'NEXT TRANSACTION '
                                }</Button>
                        </Box>
                    </Container>
                )}
            </ActiveStepContext.Consumer>
        </>
    );
};

export default BityNavButtons;