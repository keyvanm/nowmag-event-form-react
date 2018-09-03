import React, { Component } from 'react';
import { Form, Input, Dropdown, Divider, Radio, Popup, Header, Icon } from 'semantic-ui-react'

const locationOptions = [
  {
    'text': "Here and Now",
    'key': '0-0-0-0', // uuid
    'value': '0-0-0-0', // uuid
  }
]

export class WizardFormLocationPage extends Component {
  handleTouch = () => {
    this.props.setTouched({ ...this.props.touched, location: true });
  }

  setFieldValue = (field, value) => {
    this.handleTouch();
    const { values: { location } } = this.props;
    const newLocation = { ...location, [field]: value }
    this.props.setFieldValue('location', newLocation)
  }

  handleLocationDropdownChange = (event, data) => {
    console.log(data);
    this.setFieldValue('existingVenue', data.value)
  }

  handleNewLocationToggle = (event, data) => {
    this.setFieldValue('isNewVenue', data.checked)
  }

  handleNewLocationNameChange = (event, data) => {
    const { values: { location: { newVenue } } } = this.props;
    const newNewVenue = { ...newVenue, name: data.value }
    this.setFieldValue('newVenue', newNewVenue)
  }

  handleNewLocationAddressChange = (event, data) => {
    const { values: { location: { newVenue } } } = this.props;
    const newNewVenue = { ...newVenue, address: data.value }
    this.setFieldValue('newVenue', newNewVenue)
  }



  render() {
    const {
      values: { location },
      errors,
      touched,
      handleBlur,
    } = this.props;

    const AddressInput = () => (
      <Input
        icon='location arrow' iconPosition='left' placeholder='Address (e.g. 301 Front St W, Toronto, ON M5V 2T6)'
        name='location'
        value={location.newVenue.address}
        onChange={this.handleNewLocationAddressChange}
        onBlur={this.handleTouch}
      />
    )

    return (
      <div className="wizard-page">
        { !location.isNewVenue && 
          <Form.Field>
            <label>Where is your event located?</label>
            <Dropdown
              fluid search selection
              autoFocus={true} 
              placeholder='Location'
              name='location'
              options={locationOptions}
              value={location.existingVenue}
              onChange={this.handleLocationDropdownChange}
              onBlur={this.handleTouch}
            />
          </Form.Field>
        }
        <Divider horizontal>Or</Divider>
        <Form.Field>
          <Radio toggle label="I couldn't find the venue on the above list" onChange={this.handleNewLocationToggle} />
        </Form.Field>
        { location.isNewVenue && 
          <div>
            <Form.Field>
              <label>Enter the location details manually</label>
              <Input
                icon='home' iconPosition='left'
                placeholder='Name (e.g. CN Tower)'
                name='location'
                value={location.newVenue.name}
                onChange={this.handleNewLocationNameChange}
                onBlur={this.handleTouch}
              />
            </Form.Field>
            <Form.Field>
              <Popup
                flowing
                trigger={<AddressInput />}
                on='focus'
              >
                <Header color='yellow' icon='info' content="hint" as='h6' />
                <p><Icon color='blue' name='location arrow' />Use this format</p>
                <p><em>301 Front St W, Toronto, ON M5V 2T6</em></p>
              </Popup>
            </Form.Field>
          </div>
        }
      </div>
    );
  }
}

export default WizardFormLocationPage;
