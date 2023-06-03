import React, { useState } from 'react';

const NavigationSteps = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center justify-center ${
            index === 0 ? '' : 'before:border'
          } ${index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
            px-4 py-2 rounded-lg cursor-pointer border border-gray-300`}
          onClick={() => handleStepChange(index)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default NavigationSteps;
