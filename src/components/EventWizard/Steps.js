import React from 'react';
import { Step } from 'semantic-ui-react'

const COMPLETED = 'completed';
const ACTIVE = 'active';
const DISABLED = 'disabled';


function getStepStatus(index, currentStep) {
  const currentStepIndex0 = currentStep - 1;
  if (index < currentStepIndex0) {
    return COMPLETED;
  } else if (index === currentStepIndex0) {
    return ACTIVE;
  } else {
    return DISABLED;
  }
}


const Steps =  ({ stepsArray, currentStep, ...props }) => {
  const augmentedStepsArray = stepsArray.map( (stepObject, index) => {
    const status = getStepStatus(index, currentStep);
    return {
      ...stepObject,
      [status]: true,
      onClick: () => { alert() }
    }
  });
  return <Step.Group items={augmentedStepsArray} {...props} />
}

export default Steps;
