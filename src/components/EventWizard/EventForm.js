import React from 'react'
import { Checkbox, Form, Select, Input, TextArea, Dropdown, Divider, Radio, Popup, Header, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import FormButtonGroup from './FormButtonGroup';

import './EventForm.css'
import 'react-datepicker/dist/react-datepicker.css';

const categoryOptions = [
  {
    'text': "Art",
    'key': 0, // pk?
    'value': 0, // pk?
  }
]


const FormExampleForm = ({
  currentStep, lastStep, loading,
  buttonHandlers
}) => {
  const buttonAbility = {
    back: currentStep !== 1,
    next: currentStep < lastStep,
    submit: currentStep === lastStep
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buttonHandlers.handleSubmit(event);
    }
  }

  return (
    <Form onKeyPress={onKeyPress} onSubmit={buttonHandlers.handleSubmit}>
      {
        currentStep === 1 &&
        <div className="wizard-page">
          <Form.Field>
            <label>What is the title of your event?</label>
            <Input autoFocus={true} placeholder='Title' />
          </Form.Field>
          <Form.Field>
            <label>Which of these categories best describe your event?</label>
            <Select placeholder='Category' options={categoryOptions} />
          </Form.Field>
          <Form.Field>
            <label>Describe your event in a few sentences</label>
            <TextArea autoHeight placeholder='Description'  />
          </Form.Field>
        </div>
      }
      {
        currentStep === 2 &&
        <div className="wizard-page">
          <Form.Field>
            <label>Where is your event located?</label>
            <Dropdown autoFocus={true}  placeholder='Location' fluid search selection options={categoryOptions} />
          </Form.Field>
          <Divider horizontal>Or</Divider>
          <Form.Field>
            {/* <label>I couldn't find the venue on the above list</label> */}
            <Radio toggle label="I couldn't find the venue on the above list" />
          </Form.Field>
          <Form.Field>
            <label>Enter the location details manually</label>
            <Input placeholder='Name (e.g. CN Tower)' />
          </Form.Field>
          <Form.Field>
            <Popup
              flowing
              trigger={<Input placeholder='Address (e.g. 301 Front St W, Toronto, ON M5V 2T6)' />}
              on='focus'
            >
              <Header color='yellow' icon='info' content="hint" as='h6' />
              <p><Icon color='blue' name='location arrow' />Use this format</p>
              <p><em>301 Front St W, Toronto, ON M5V 2T6</em></p>
            </Popup>
          </Form.Field>
        </div>
      }
      {
        currentStep === 3 &&
        <div className="wizard-page">
          <Form.Group widths='equal'>
            <Form.Field>
              <label>When does your event start?</label>
              <DatePicker
                // selected={this.state.startDate}
                // onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </Form.Field>
            <Form.Field>
              <label>When does your event end? (Optional)</label>
              <DatePicker
                // selected={this.state.startDate}
                // onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </Form.Field>
          </Form.Group>
        </div>
      }

      <FormButtonGroup loading={loading} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />

    </Form>
  )
}

export default FormExampleForm
