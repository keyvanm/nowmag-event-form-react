import React, { Component } from 'react';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';
import EventForm from './EventForm';


export class EventWizard extends Component {
  state = {
    currentStep: 1
  }

  handleSubmit = () => {
    let { currentStep } = this.state;
    currentStep++;
    this.setState({ currentStep });
  }

  render() {
    const { currentStep } = this.state;

    return (
      <div className="event-wizard">
        <Steps
          currentStep={currentStep} stepsArray={stepsArray}
          ordered attached='top' widths={stepsArray.length}
        />

        <EventForm currentStep={currentStep} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EventWizard;
