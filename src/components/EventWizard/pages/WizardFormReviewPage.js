import React, { Component } from 'react';
import { Form, Input, Header, Message, Segment } from 'semantic-ui-react'

export class WizardFormReviewPage extends Component {
  render() {
    return (
      <div className="wizard-page">
        <Message warning visible icon='warning'
          content="Please review your event carefully. You won't be able to edit it past this page." />
        <Segment>
          <Header>Review your event</Header>
        </Segment>
        <Form.Field>
          <label>What is an email we (NOW Toronto) can contact you at?</label>
          <Input icon='mail' iconPosition='left' placeholder='Contact email' />
        </Form.Field>  
      </div>
    );
  }
}

export default WizardFormReviewPage;
