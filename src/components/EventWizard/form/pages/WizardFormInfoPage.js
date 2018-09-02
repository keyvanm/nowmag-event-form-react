import React, { Component } from 'react';
import { Form, Input, Message } from 'semantic-ui-react'

export class WizardFormInfoPage extends Component {
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
          <Message info icon='info'
            content="Please note that at least one of the following is needed" />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Does your event have an online website? If so enter it here</label>
              <Input
                icon='globe' iconPosition='left'
                autoFocus={true} 
                laceholder='Website'
                name='website'
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field>
              <label>Is there a phone number potential guests can contact you at?</label>
              <Input
                icon='phone' iconPosition='left'
                placeholder='Phone number'
                name='phone_number'
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Is there an email potential guests can contact you at?</label>
              <Input
                icon='mail' iconPosition='left'
                placeholder='Email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field>
              <label>Does your event have a Facebook page?</label>
            <Input
              icon='facebook' iconPosition='left'
              placeholder='Facebook'
              name='facebook'
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            </Form.Field>
          </Form.Group>
        </div>
    );
  }
}

export default WizardFormInfoPage;
