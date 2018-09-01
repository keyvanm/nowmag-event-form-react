import React from 'react'
import { Form } from 'semantic-ui-react'

import FormButtonGroup from './FormButtonGroup';
import WizardFormAddPage from './pages/WizardFormAddPage';
import WizardFormLocationPage from './pages/WizardFormLocationPage';
import WizardFormDatePage from './pages/WizardFormDatePage';
import WizardFormInfoPage from './pages/WizardFormInfoPage';
import WizardFormReviewPage from './pages/WizardFormReviewPage';

import './EventForm.css'
import 'react-datepicker/dist/react-datepicker.css';


const FormExampleForm = ({
  currentStep, lastStep, loading,
  buttonHandlers
}) => {
  const buttonAbility = {
    back: currentStep !== 1,
    next: currentStep < lastStep,
    submit: currentStep === lastStep
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonHandlers.handleSubmit(event);
    }
  }

  return (
    <Form onKeyPress={onKeyPress} onSubmit={buttonHandlers.handleSubmit}>
      {
        currentStep === 1 &&
        <WizardFormAddPage />        
      }
      {
        currentStep === 2 &&
        <WizardFormLocationPage />
      }
      {
        currentStep === 3 &&
        <WizardFormDatePage />        
      }
      {
        currentStep === 4 &&
        <WizardFormInfoPage />        
      }
      {
        currentStep === 5 &&
        <WizardFormReviewPage />        
      }

      <FormButtonGroup loading={loading} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />

    </Form>
  )
}

export default FormExampleForm
