import React from 'react'
import { Form, Message, Button, Header, Icon } from 'semantic-ui-react'

import FormButtonGroup from './FormButtonGroup';
import WizardFormAddPage from './pages/WizardFormAddPage';
import WizardFormLocationPage from './pages/WizardFormLocationPage';
import WizardFormDatePage from './pages/WizardFormDatePage';
import WizardFormInfoPage from './pages/WizardFormInfoPage';
import WizardFormReviewPage from './pages/WizardFormReviewPage';

import './EventForm.css'
import 'react-datepicker/dist/react-datepicker.css';


function submissionStatus(status) {
  if (status) {
    return status.submissionStatus;
  }
  return 'not-submitted'
}


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
      success={submissionStatus(status) === 'success'}
      error={Object.keys(errors).filter( key => touched[key]).length > 0}
    >
      <Message success icon='check' className='wizard-message'
        content="Event successfully created! Click next"
      />

      {
        submissionStatus(status) !== 'success' && currentStep === 1 &&
        <WizardFormAddPage {...form} />
      }
      {
        submissionStatus(status) !== 'success' && currentStep === 2 &&
        <WizardFormLocationPage {...form} />
      }
      {
        submissionStatus(status) !== 'success' && currentStep === 3 &&
        <WizardFormDatePage {...form} />
      }
      {
        submissionStatus(status) !== 'success' && currentStep === 4 &&
        <WizardFormInfoPage {...form} />
      }
      {
        submissionStatus(status) !== 'success' && currentStep === 5 &&
        <WizardFormReviewPage {...form} />
      }

      <Message error>
        <Message.Header>Errors</Message.Header>
        <ul>{
          Object.keys(errors).filter( key => touched[key]).map( key => (
            <li key={key}>{errors[key]}</li>
          ))
        }</ul>
      </Message>

      {
        submissionStatus(status) === 'error' &&
        <Message error visible icon className='wizard-message'>
          <Icon name='warning' />
          <Header>Submission error</Header>
          <p>
            There was an error creating the event. Please review the entries and try again. If the problem continues contact info@bluh.com with the following information
          </p>
          {/* <Header>Errors</Header>
          <p>{status.error}</p> */}
        </Message>
      }
      {
        submissionStatus(status) !== 'success' &&
        <FormButtonGroup loading={form.isSubmitting} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />
      }
      {
        submissionStatus(status) === 'success' &&
        <Button primary>Next</Button>
      }
    </Form>
  )
}

export default FormExampleForm
