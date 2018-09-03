import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

export class WizardFormDatePage extends Component {
  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, start: true, end: true });
  }

  handleStartChange = (v) => {
    this.props.setFieldValue('start', v);
  }
  handleEndChange = (v) => {
    this.props.setTouched({ ...this.props.touched, end: true });
    this.props.setFieldValue('end', v);
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleBlur
    } = this.props;

    return (
      <div className="wizard-page">
          <Form.Group widths='equal'>
            <Form.Field required error={ touched.start && errors.start }>
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
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field error={ touched.end && errors.end }>
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
                onBlur={handleBlur}
              />
            </Form.Field>
          </Form.Group>
        </div>
    );
  }
}

export default WizardFormDatePage;
