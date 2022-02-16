import * as React from "react";
import { Button } from './components/BityButton.styles';
import { Wrapper } from './components/BityWrapper.styles';

type updateStepCallbackType = { 
    (activeStep: number): void 
}

type BityBody = {
    updateStepCallBack: updateStepCallbackType
}

const BityBody: React.FC<BityBody> = (props) => {
    return (
        <Wrapper color="violet">
            <Button>back</Button>
        </Wrapper>
    );
};

export default BityBody;