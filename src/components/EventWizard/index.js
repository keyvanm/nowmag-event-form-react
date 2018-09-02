import React, { Component } from 'react';
import { withFormik } from 'formik';

import Steps from './Steps';
import { stepsArray } from '../../consts/steps';
import EventForm from './form/EventForm';

import './index.css';


export class EventWizard extends Component {
  state = {
    currentStep: 1,
    lastStep: 5,
  }

  handleNextBtn = (e) => {
    e.preventDefault();
    let { currentStep, lastStep } = this.state;
    if (currentStep < lastStep) {
      currentStep++;
      this.setState({ currentStep });
    }
  }
  handleBackBtn = (e) => {
    e.preventDefault();
    let { currentStep } = this.state;
    if (currentStep > 1) {
      currentStep--;
      this.setState({ currentStep });
    }
  }
  handleResetBtn = (e) => {
    e.preventDefault();
    this.props.handleReset();
    this.setState({ currentStep: 1 });
  }

  handleEnterBtn = (e) => {
    e.preventDefault();
    let { currentStep, lastStep } = this.state;
    if (currentStep < lastStep) {
      this.handleNextBtn(e)
      return
    }
    this.props.handleSubmit()
  }

  handleStepsClick = (index) => {
    this.setState({ currentStep: index + 1 });
  }


  render() {
    const { currentStep, lastStep } = this.state;
    const { handleNextBtn, handleBackBtn, handleResetBtn, handleEnterBtn } = this;

    const eventFormProps = {
      currentStep, lastStep,
      buttonHandlers: { handleNextBtn, handleBackBtn, handleResetBtn, handleEnterBtn },
      form: this.props,
    }

    return (
      <div className="event-wizard">
        <Steps
          currentStep={currentStep} stepsArray={stepsArray}
          handleClick={this.handleStepsClick}
          attached='top' widths={stepsArray.length} unstackable
        />
        <EventForm {...eventFormProps} />
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: props => ({
    name: '',
    category: '',
    description: '',
    location: {
      isNewVenue: false,
      existingVenue: '',
      newVenue: { name: '', address: '' },
    },
    start: null,
    end: null,
    website: '',
    phone_number: '',
    email: '',
    facebook: '',
    contactEmail: ''
  }),
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    setTimeout(() => setSubmitting(false), 2000);
  },
})(EventWizard);
