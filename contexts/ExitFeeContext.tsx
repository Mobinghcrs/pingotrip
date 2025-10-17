import React, { createContext, useState, ReactNode, FC } from 'react';
import { ExitFeeContextType, ExitFeeDetails } from '../types';

export const ExitFeeContext = createContext<ExitFeeContextType | undefined>(undefined);

export const ExitFeeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [details, setDetails] = useState<ExitFeeDetails | null>(null);

    const setFeeDetails = (newDetails: ExitFeeDetails) => {
        setDetails(newDetails);
    };

    const clearFeeDetails = () => {
        setDetails(null);
    };

    return (
        <ExitFeeContext.Provider value={{
            details,
            setFeeDetails,
            clearFeeDetails
        }}>
            {children}
        </ExitFeeContext.Provider>
    );
};