import React from 'react'
import { Checkbox, Form } from 'semantic-ui-react'

import FormButtonGroup from './FormButtonGroup';


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

      <FormButtonGroup loading={loading} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />

    </Form>
  )
}

export default FormExampleForm
