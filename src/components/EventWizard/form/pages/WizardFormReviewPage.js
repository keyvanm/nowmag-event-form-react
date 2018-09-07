import React, { Component } from 'react';
import { Form, Input, Message, Header } from 'semantic-ui-react'
import EventReviewCard from '../EventReviewCard';


export class WizardFormReviewPage extends Component {
  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, owner_email: true });
  }

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
        <Message warning visible icon='warning'
          content="Please review your event carefully. You won't be able to edit it past this page."
        />

        <Header>Review your event</Header>
        <EventReviewCard values={values} />

        <Form.Field error={ touched.owner_email && Boolean(errors.owner_email) }>
          <label>What is an email we (NOW Toronto) can contact you at?</label>
          <Input
            type='email'
            autoFocus={true}
            autoComplete="email"
            icon='mail' iconPosition='left'
            placeholder='Contact email'
            name='owner_email'
            value={values.owner_email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
      </div>
    );
  }
}

export default WizardFormReviewPage;
