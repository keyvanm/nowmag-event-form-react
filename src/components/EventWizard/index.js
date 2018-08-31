import React, { Component } from 'react';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';


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
