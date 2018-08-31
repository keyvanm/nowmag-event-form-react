import React from 'react'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'

const FormExampleForm = ({
  currentStep,
  lastStep,
  handleCancel,
  handleBack,
  handleNext,
  handleSubmit
}) => (
  <Form onSubmit={handleSubmit}>
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

    <div class="form-button-group">
      <Button disabled negative>Cancel</Button>
      <Button>Back</Button>
      <Button primary type='submit'>Next</Button>
      <Button disabled positive type='submit'>Submit</Button>
    </div>

  </Form>
)

export default FormExampleForm
