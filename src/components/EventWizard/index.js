import React, { Component } from 'react';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';
import EventForm from './EventForm';


export class EventWizard extends Component {
  state = {
    currentStep: 1,
    lastStep: 5
  }

  handleNext = () => {
    let { currentStep, lastStep } = this.state;
    if (currentStep < lastStep) {
      currentStep++;
      this.setState({ currentStep });
    }
  }

  handleBack = () => {
    let { currentStep } = this.state;
    if (currentStep > 1) {
      currentStep--;
      this.setState({ currentStep });
    }
  }

  render() {
    const { currentStep, lastStep } = this.state;
    const { handleNext, handleBack } = this;
    const eventFormProps = {
      currentStep, lastStep,
      clickHandlers: { handleNext, handleBack }
    }

    return (
      <div className="event-wizard">
        <Steps
          currentStep={currentStep} stepsArray={stepsArray}
          ordered attached='top' widths={stepsArray.length}
        />
        <EventForm {...eventFormProps} />
      </div>
    );
  }
}

export default EventWizard;
