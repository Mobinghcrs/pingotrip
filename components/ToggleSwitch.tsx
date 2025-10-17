import React, { useState } from 'react';

interface ToggleSwitchProps {
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if (onChange) {
            onChange(newState);
        }
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            onClick={handleToggle}
            className={`relative inline-flex flex-shrink-0 items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-800 ${
                isChecked ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-slate-700'
            }`}
        >
            <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow ${
                    isChecked ? 'translate-x-[22px]' : 'translate-x-[2px]'
                }`}
            />
        </button>
    );
};

export default ToggleSwitch;
