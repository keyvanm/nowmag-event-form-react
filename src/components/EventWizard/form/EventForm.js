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
  const { status, errors, touched } = form;
  const buttonAbility = {
    back: !status && currentStep !== 1,
    next: status || (currentStep < lastStep),
    submit: Object.keys(errors).length === 0 && !status && currentStep === lastStep
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
      success={status}
      error={Object.keys(errors).filter( key => touched[key]).length > 0}
    >
      <Message success icon='check' className='wizard-message'
        content="Event successfully created! Click next"
      />
      <Message error>
        <ul>{
          Object.keys(errors).filter( key => touched[key]).map( key => (
            <li key={key}>{errors[key]}</li>
          ))
        }</ul>
      </Message>
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
