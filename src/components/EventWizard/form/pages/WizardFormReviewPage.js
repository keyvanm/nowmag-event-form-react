import React, { Component } from 'react';
import { Form, Input, Message, Segment, Header } from 'semantic-ui-react'
import EventReviewCard from '../EventReviewCard';


export class WizardFormReviewPage extends Component {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
    } = this.props;

    return (
      <div className="wizard-page">
        <Message success icon='check'
          content="Event successfully created! Click next"
        />
        <Message warning visible icon='warning'
          content="Please review your event carefully. You won't be able to edit it past this page."
        />

        <Segment>
          <Header>Review your event</Header>
          <EventReviewCard event={values} />
        </Segment>
        <Form.Field>
          <label>What is an email we (NOW Toronto) can contact you at?</label>
          <Input
            autoFocus={true}
            icon='mail' iconPosition='left'
            placeholder='Contact email'
            name='contactEmail'
            value={values.contactEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>  
      </div>
    );
  }
}

export default WizardFormReviewPage;