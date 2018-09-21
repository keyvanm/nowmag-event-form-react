import React, { Component } from 'react';
import { Form, Input, Dropdown, Divider, Radio, Popup, Header, Icon } from 'semantic-ui-react'
import axios from 'axios';


const convertAPILocationToDropdownItem = ({ name, address, uuid }) => (
  {
    text: address ? `${name} (${address})` : name,
    key: uuid,
    value: uuid
  }
)


export class WizardFormLocationPage extends Component {
  state = {
    locationOptions: []
  }

  componentWillMount() {
    const { location } = this.props.values;
    if (!location.isNewVenue && location.existingVenue) {
      axios.get(`/api/v1/locations/${location.existingVenue}/`).then(({ data }) => {
        const locationOption = convertAPILocationToDropdownItem(data);
        this.setState({ locationOptions: [ locationOption ] });
      })
    }
  }

  fetchLocations = ({ searchQuery }) => {
    if (searchQuery.length > 2) {
      axios.get("/api/v1/locations/", {
        params: { q: searchQuery }
      }).then( ({ data }) => {
        const locationOptions = data.map(convertAPILocationToDropdownItem);
        this.setState({ locationOptions })
      });
    }
  }

  componentWillUnmount () {
    this.handleTouch();
  }
  handleTouch = () => {
    this.props.setTouched({ ...this.props.touched, location: true });
  }

  setFieldValue = (field, value) => {
    const { values: { location } } = this.props;
    const newLocation = { ...location, [field]: value }
    this.props.setFieldValue('location', newLocation)
  }

  handleLocationDropdownChange = (event, data) => {
    // this.handleTouch();
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
    } = this.props;

    return (
      <div className="wizard-page">
        { !location.isNewVenue &&
          <Form.Field error={ touched.location && Boolean(errors.location) }>
            <label>Where is your event located?</label>
            <Dropdown
              fluid search selection
              autoFocus={true}
              placeholder='Location'
              name='location'
              options={this.state.locationOptions}
              value={location.existingVenue}
              onSearchChange={ (e, d) => this.fetchLocations(d)}
              onChange={this.handleLocationDropdownChange}
              onBlur={this.handleTouch}
            />
          </Form.Field>
        }
        <Divider horizontal>Or</Divider>
        <Form.Field>
          <Radio
            toggle
            label="I couldn't find the venue on the above list"
            onChange={this.handleNewLocationToggle}
            checked={location.isNewVenue}
          />
        </Form.Field>
        { location.isNewVenue &&
          <div>
            <Form.Field error={ touched.location && Boolean(errors.location) }>
              <label>Enter the location details manually</label>
              <Input
                icon='home' iconPosition='left'
                placeholder='Name (e.g. CN Tower)'
                name='location'
                value={location.newVenue.name}
                onChange={this.handleNewLocationNameChange}
              />
            </Form.Field>
            <Form.Field error={ touched.location && Boolean(errors.location) }>
              <Popup
                flowing
                trigger={
                  <Input
                    icon='marker' iconPosition='left' placeholder='Address (e.g. 301 Front St W, Toronto, ON M5V 2T6)'
                    name='location'
                    value={location.newVenue.address}
                    onChange={this.handleNewLocationAddressChange}
                  />
                }
                on='focus'
              >
                <Header color='yellow' icon='info' content="hint" as='h6' />
                <p><Icon color='blue' name='marker' />Use this format</p>
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
