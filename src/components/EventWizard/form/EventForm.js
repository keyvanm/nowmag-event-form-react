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
  currentStep, lastStep,
  buttonHandlers,
  form
}) => {
  const buttonAbility = {
    back: currentStep !== 1,
    next: currentStep < lastStep,
    submit: currentStep === lastStep
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonHandlers.handleEnter(event);
    }
  }

  return (
    <Form onKeyPress={onKeyPress} onSubmit={buttonHandlers.handleEnterBtn}>
      {
        currentStep === 1 &&
        <WizardFormAddPage {...form} />        
      }
      {
        currentStep === 2 &&
        <WizardFormLocationPage {...form} />
      }
      {
        currentStep === 3 &&
        <WizardFormDatePage {...form} />        
      }
      {
        currentStep === 4 &&
        <WizardFormInfoPage {...form} />        
      }
      {
        currentStep === 5 &&
        <WizardFormReviewPage {...form} />        
      }

      <FormButtonGroup loading={form.isSubmitting} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />

    </Form>
  )
}

export default FormExampleForm
