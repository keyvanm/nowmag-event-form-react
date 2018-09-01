import React, { Component } from 'react';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';
import EventForm from './EventForm';


export class EventWizard extends Component {
  state = {
    currentStep: 1,
    lastStep: 5,
    loading: false
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
    this.setState({ loading: true });
    // this.props.handleData()
    setTimeout(() => this.setState({ loading: false }), 2000)
  }


  render() {
    const { currentStep, lastStep, loading } = this.state;
    const { handleNext, handleBack, handleReset, handleSubmit } = this;
    const eventFormProps = {
      currentStep, lastStep, loading,
      buttonHandlers: { handleNext, handleBack, handleReset, handleSubmit }
    }

    return (
      <div className="event-wizard">
        <Steps
          currentStep={currentStep} stepsArray={stepsArray}
          attached='top' widths={stepsArray.length}
        />
        <EventForm {...eventFormProps} />
      </div>
    );
  }
}

export default EventWizard;
