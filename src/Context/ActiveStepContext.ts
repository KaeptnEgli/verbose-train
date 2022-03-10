import { createContext, FC, useState } from "react";

type ActiveStepContext = {
    activeStep: number;
    handleForwardClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleBackClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ActiveStepContext = createContext<ActiveStepContext>({} as ActiveStepContext);
