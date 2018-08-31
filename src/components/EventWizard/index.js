import React, { Component } from 'react';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';
import EventForm from './EventForm';


export class EventWizard extends Component {
  state = {
    currentStep: 1,
    lastStep: 5
  }

  handleNext = (e) => {
    e.preventDefault();
    let { currentStep, lastStep } = this.state;
    if (currentStep < lastStep) {
      currentStep++;
      this.setState({ currentStep });
    }
  }
  handleBack = (e) => {
    e.preventDefault();
    let { currentStep } = this.state;
    if (currentStep > 1) {
      currentStep--;
      this.setState({ currentStep });
    }
  }
  handleReset = (e) => {
    e.preventDefault();
    // TODO: Flush data
    this.setState({ currentStep: 1 });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { currentStep, lastStep } = this.state;
    if (currentStep < lastStep) {
      this.handleNext(e)
      return
    }
    alert("Handling submit")
  }


  render() {
    const { currentStep, lastStep } = this.state;
    const { handleNext, handleBack, handleReset, handleSubmit } = this;
    const eventFormProps = {
      currentStep, lastStep,
      buttonHandlers: { handleNext, handleBack, handleReset, handleSubmit }
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
