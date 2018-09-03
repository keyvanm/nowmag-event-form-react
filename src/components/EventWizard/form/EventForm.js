import React from 'react'
import { Form, Message, Button } from 'semantic-ui-react'

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
  const { status, errors, touched } = form;
  const buttonAbility = {
    back: currentStep !== 1,
    next: currentStep < lastStep,
    submit: Object.keys(errors).length === 0 && currentStep === lastStep
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonHandlers.handleEnterBtn(event);
    }
  }

  console.log(touched)

  return (
    <Form
      onKeyPress={onKeyPress} onSubmit={buttonHandlers.handleEnterBtn}
      success={status === 'success'}
      error={Object.keys(errors).filter( key => touched[key]).length > 0}
    >
      <Message success icon='check' className='wizard-message'
        content="Event successfully created! Click next"
      />

      {
        status !== 'success' && currentStep === 1 &&
        <WizardFormAddPage {...form} />        
      }
      {
        status !== 'success' && currentStep === 2 &&
        <WizardFormLocationPage {...form} />
      }
      {
        status !== 'success' && currentStep === 3 &&
        <WizardFormDatePage {...form} />        
      }
      {
        status !== 'success' && currentStep === 4 &&
        <WizardFormInfoPage {...form} />        
      }
      {
        status !== 'success' && currentStep === 5 &&
        <WizardFormReviewPage {...form} />        
      }

      { 
        status === 'error' &&
        <Message error visible icon='warning' className='wizard-message'
          content="There was an error creating the event. Please review the entries and try again. If the problem continues contact info@bluh.com."
        />
      }
      {
        status !== 'success' &&
        <FormButtonGroup loading={form.isSubmitting} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />
      }
      {
        status === 'success' &&
        <Button primary>Next</Button>
      }
      
      

    </Form>
  )
}

export default FormExampleForm
