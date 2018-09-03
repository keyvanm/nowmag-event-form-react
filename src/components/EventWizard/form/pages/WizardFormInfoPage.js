import React, { Component } from 'react';
import { Form, Input, Message } from 'semantic-ui-react'

export class WizardFormInfoPage extends Component {
  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, website: true, email: true, phone_number: true, facebook: true });
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
          <Message info icon='info'
            content="Please note that at least one of the following is needed" />
          <Form.Group widths='equal'>
            <Form.Field error={ touched.website && Boolean(errors.website) }>
              <label>Does your event have an online website? If so enter it here</label>
              <Input
                icon='globe' iconPosition='left'
                autoFocus={true} 
                placeholder='Website'
                name='website'
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field error={ touched.phone_number && Boolean(errors.phone_number) }>
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
            <Form.Field error={ touched.email && Boolean(errors.email) }>
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
            <Form.Field error={ touched.facebook && Boolean(errors.facebook) }>
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
