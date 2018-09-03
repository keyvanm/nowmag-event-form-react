import React, { Component } from 'react';
import { Form, Input, Message, Segment, Header } from 'semantic-ui-react'
import EventReviewCard from '../EventReviewCard';


export class WizardFormReviewPage extends Component {
  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, contactEmail: true });
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
    } = this.props;

    console.log(touched.contactEmail);
    console.log(errors);

    return (
      <div className="wizard-page">
        <Message warning visible icon='warning'
          content="Please review your event carefully. You won't be able to edit it past this page."
        />

        <Segment>
          <Header>Review your event</Header>
          <EventReviewCard event={values} />
        </Segment>
        <Form.Field error={ touched.contactEmail && Boolean(errors.contactEmail) }>
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
