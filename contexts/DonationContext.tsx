import React, { createContext, useState, ReactNode, FC } from 'react';
import { DonationContextType, CharityProject, Donation } from '../types';

export const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState<CharityProject | null>(null);
    const [donation, setDonation] = useState<Donation | null>(null);

    const selectProject = (project: CharityProject) => {
        setSelectedProject(project);
    };

    const clearDonation = () => {
        setSelectedProject(null);
        setDonation(null);
    };

    return (
        <DonationContext.Provider value={{
            selectedProject,
            donation,
            selectProject,
            setDonation,
            clearDonation
        }}>
            {children}
        </DonationContext.Provider>
    );
};