import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircleIcon } from '../assets/icons';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const { t, localizeDigits } = useTranslation();

  return (
    <div className="flex items-center justify-between max-w-sm mx-auto my-4 px-4">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isActive = stepIndex === currentStep;
        const isCompleted = stepIndex < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-sky-900 border-sky-900 text-white'
                    : isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <span>{localizeDigits(stepIndex)}</span>}
              </div>
              <p
                className={`mt-2 text-xs font-semibold transition-colors duration-300 ${
                  isActive || isCompleted ? 'text-sky-900' : 'text-gray-500'
                }`}
              >
                {t(step)}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-grow h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;