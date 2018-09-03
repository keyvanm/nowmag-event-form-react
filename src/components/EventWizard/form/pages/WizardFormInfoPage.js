import React, { Component } from 'react';
import { Form, Input, Message, Popup, Header, Icon } from 'semantic-ui-react'

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
              <Popup
                flowing
                trigger={
                  <Input
                    icon='linkify' iconPosition='left'
                    // autoFocus={true} 
                    placeholder='Website'
                    name='website'
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                }
                on='focus'
              >
                <Header color='yellow' icon='info' content="hint" as='h6' />
                <p><Icon color='blue' name='globe' />Use this format</p>
                <p>http(s)://website.whatever</p>
              </Popup>
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
              <Popup
                flowing
                trigger={
                  <Input
                    icon='facebook' iconPosition='left'
                    placeholder='Facebook'
                    name='facebook'
                    value={values.facebook}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                }
                on='focus'
              >
                <Header color='yellow' icon='info' content="hint" as='h6' />
                <p><Icon color='blue' name='globe' />Use this format</p>
                <p>http(s)://www.facebook.com/whatever</p>
              </Popup>
            </Form.Field>
          </Form.Group>
        </div>
    );
  }
}

export default WizardFormInfoPage;
