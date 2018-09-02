import React, { Component } from 'react';
import { Form, Input, Message, Segment, Header } from 'semantic-ui-react'
import EventReviewCard from '../EventReviewCard';

const event = {
  name: "Name",
  category: "Category",
  description: "Description"
}

export class WizardFormReviewPage extends Component {
  render() {
    return (
      <div className="wizard-page">
        <Message success visible icon='check'
          content="Event successfully created! Click next"
        />
        <Message warning visible icon='warning'
          content="Please review your event carefully. You won't be able to edit it past this page."
        />

        <Segment>
          <Header>Review your event</Header>
          <EventReviewCard event={this.props.values} />
        </Segment>
        <Form.Field>
          <label>What is an email we (NOW Toronto) can contact you at?</label>
          <Input autoFocus={true} icon='mail' iconPosition='left' placeholder='Contact email' />
        </Form.Field>  
      </div>
    );
  }
}

export default WizardFormReviewPage;
