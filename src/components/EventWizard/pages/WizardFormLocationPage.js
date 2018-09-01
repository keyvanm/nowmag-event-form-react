import React, { Component } from 'react';
import { Form, Input, Dropdown, Divider, Radio, Popup, Header, Icon } from 'semantic-ui-react'

const locationOptions = [
  {
    'text': "Art",
    'key': 0, // pk?
    'value': 0, // pk?
  }
]

export class WizardFormLocationPage extends Component {
  render() {
    return (
      <div className="wizard-page">
        <Form.Field>
          <label>Where is your event located?</label>
          <Dropdown autoFocus={true}  placeholder='Location' fluid search selection options={locationOptions} />
        </Form.Field>
        <Divider horizontal>Or</Divider>
        <Form.Field>
          {/* <label>I couldn't find the venue on the above list</label> */}
          <Radio toggle label="I couldn't find the venue on the above list" />
        </Form.Field>
        <Form.Field>
          <label>Enter the location details manually</label>
          <Input icon='home' iconPosition='left' placeholder='Name (e.g. CN Tower)' />
        </Form.Field>
        <Form.Field>
          <Popup
            flowing
            trigger={<Input icon='location arrow' iconPosition='left' placeholder='Address (e.g. 301 Front St W, Toronto, ON M5V 2T6)' />}
            on='focus'
          >
            <Header color='yellow' icon='info' content="hint" as='h6' />
            <p><Icon color='blue' name='location arrow' />Use this format</p>
            <p><em>301 Front St W, Toronto, ON M5V 2T6</em></p>
          </Popup>
        </Form.Field>
      </div>
    );
  }
}

export default WizardFormLocationPage;
