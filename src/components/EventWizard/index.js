import React, { Component } from 'react';

import Steps from './Steps';

const stepsArray = [
  {
    key: 'info',
    title: 'Event Info',
  },
  {
    key: 'location',
    title: 'Location',
  },
  {
    key: 'datetime',
    title: 'Date and Time',
  },
  {
    key: 'eventContant',
    title: 'Event Contact',
  },
  {
    key: 'submitterContact',
    title: 'Submitter Contact',
  },
]

export class EventWizard extends Component {
  state = {
    currentStep: 1
  }

  render() {
    return (
      <div>
        <Steps
          currentStep={this.state.currentStep} stepsArray={stepsArray}
          ordered attached='top' widths={stepsArray.length} />
      </div>
    );
  }
}

export default EventWizard;
