import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

export class WizardFormDatePage extends Component {
  render() {
    return (
      <div className="wizard-page">
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>When does your event start?</label>
              <DatePicker
                // selected={this.state.startDate}
                // onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
                autoFocus={true}
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
    );
  }
}

export default WizardFormDatePage;
