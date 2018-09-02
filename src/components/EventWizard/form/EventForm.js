import React from 'react'
import { Form, Message } from 'semantic-ui-react'

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
  const { status, errors } = form;
  const buttonAbility = {
    back: !status && currentStep !== 1,
    next: status || (currentStep < lastStep),
    submit: !status && currentStep === lastStep
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonHandlers.handleEnterBtn(event);
    }
  }

  return (
    <Form
      onKeyPress={onKeyPress} onSubmit={buttonHandlers.handleEnterBtn}
      success={status}
      // error={form.errors}
    >
      <Message success icon='check' className='wizard-message'
        content="Event successfully created! Click next"
      />
      {/* <Message error>
        {
          form.errors.map()
        }
      </Message> */}
      {
        !status && currentStep === 1 &&
        <WizardFormAddPage {...form} />        
      }
      {
        !status && currentStep === 2 &&
        <WizardFormLocationPage {...form} />
      }
      {
        !status && currentStep === 3 &&
        <WizardFormDatePage {...form} />        
      }
      {
        !status && currentStep === 4 &&
        <WizardFormInfoPage {...form} />        
      }
      {
        !status && currentStep === 5 &&
        <WizardFormReviewPage {...form} />        
      }

      <FormButtonGroup loading={form.isSubmitting} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />

    </Form>
  )
}

export default FormExampleForm
