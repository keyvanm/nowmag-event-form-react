import React from 'react'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'

import './EventForm.css';

const FormButtonGroup = ({
  buttonAbility: { cancel, back, next, submit },
  clickHandlers: { handleCancel, handleBack, handleNext }
}) => (
  <div className="form-button-group">
    {
      cancel && <Button onClick={handleCancel} negative>Cancel</Button>
    }
    {
      back && <Button onClick={handleBack}>Back</Button>
    }
    <Button disabled={!next} onClick={handleNext} primary>Next</Button>
    <Button disabled={!submit} positive type='submit'>Submit</Button>
  </div>
)

const FormExampleForm = ({
  currentStep,
  lastStep,
  clickHandlers
}) => {
  const buttonAbility = {
    cancel: currentStep !== 1,
    back: currentStep !== 1,
    next: currentStep < lastStep,
    submit: currentStep === lastStep
  }

  return (
    <Form onSubmit={clickHandlers.handleSubmit}>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>

      <FormButtonGroup buttonAbility={buttonAbility} clickHandlers={clickHandlers} />

    </Form>
  )
}

export default FormExampleForm
