import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

export class WizardFormDatePage extends Component {
  handleStartChange = (v) => {
    this.props.setFieldValue('start', v);
  }
  handleEndChange = (v) => {
    this.props.setFieldValue('end', v);
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
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>When does your event start?</label>
              <DatePicker
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="LLL"
                timeCaption="time"
                autoFocus={true}
                name='start'
                selected={values.start}
                onChange={this.handleStartChange}
              />
            </Form.Field>
            <Form.Field>
              <label>When does your event end? (Optional)</label>
              <DatePicker
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="LLL"
                timeCaption="time"
                name='start'
                selected={values.end}
                onChange={this.handleEndChange}
              />
            </Form.Field>
          </Form.Group>
        </div>
    );
  }
}

export default WizardFormDatePage;
