import React, { Component } from 'react';
import { Form, Select, Input, TextArea } from 'semantic-ui-react'


const categoryOptions = [
  {
    'text': "Art",
    'key': 0, // pk?
    'value': 0, // pk?
  }
]

export class WizardFormAddPage extends Component {
  render() {
    return (
      <div className="wizard-page">
          <Form.Field required>
            <label>What is the title of your event?</label>
            <Input autoFocus={true} placeholder='Title' />
          </Form.Field>
          <Form.Field required>
            <label>Which of these categories best describe your event?</label>
            <Select placeholder='Category' options={categoryOptions} />
          </Form.Field>
          <Form.Field required>
            <label>Describe your event in a few sentences</label>
            <TextArea autoHeight placeholder='Description'  />
          </Form.Field>
        </div>
    );
  }
}

export default WizardFormAddPage;
