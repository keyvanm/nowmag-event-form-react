import React, { Component } from 'react';
import { Form, Input, Message } from 'semantic-ui-react'

export class WizardFormInfoPage extends Component {
  render() {
    return (
      <div className="wizard-page">
          <Message info icon='info'
            content="Please note that at least one of the following is needed" />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Does your event have an online website? If so enter it here</label>
              <Input icon='globe' iconPosition='left' autoFocus={true} placeholder='Website' />
            </Form.Field>
            <Form.Field>
              <label>Is there a phone number potential guests can contact you at?</label>
              <Input icon='phone' iconPosition='left' placeholder='Phone number' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Is there an email potential guests can contact you at?</label>
              <Input icon='mail' iconPosition='left' placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Does your event have a Facebook page?</label>
            <Input icon='facebook' iconPosition='left' placeholder='Facebook' />
            </Form.Field>
          </Form.Group>
        </div>
    );
  }
}

export default WizardFormInfoPage;
