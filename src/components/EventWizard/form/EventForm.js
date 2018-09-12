import React, { Component } from 'react'
import { Form, Message, Button, Header, Icon, List } from 'semantic-ui-react'

import FormButtonGroup from './FormButtonGroup';
import WizardFormAddPage from './pages/WizardFormAddPage';
import WizardFormLocationPage from './pages/WizardFormLocationPage';
import WizardFormDatePage from './pages/WizardFormDatePage';
import WizardFormInfoPage from './pages/WizardFormInfoPage';
import WizardFormReviewPage from './pages/WizardFormReviewPage';

import './EventForm.css'
import 'react-datepicker/dist/react-datepicker.css';


export default class EventForm extends Component {
  submissionStatus = () => {
    if (this.props.form.status) {
      return this.props.form.status.submissionStatus;
    }
    return 'not-submitted'
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.buttonHandlers.handleEnterBtn(event);
    }
  }

  render() {
    const {
      currentStep, lastStep,
      buttonHandlers,
      form
    } = this.props;
    const { status, errors, touched } = form;
    const buttonAbility = {
      back: currentStep !== 1,
      next: currentStep < lastStep,
      submit: Object.keys(errors).length === 0 && currentStep === lastStep
    };

    return (
      <Form
        onKeyPress={this.onKeyPress} onSubmit={buttonHandlers.handleEnterBtn}
        success={this.submissionStatus() === 'success'}
        error={Object.keys(errors).filter( key => touched[key]).length > 0}
      >
        <Message success icon='check' className='wizard-message'
          content="Awesome Click next"
        />

        {
          this.submissionStatus() !== 'success' && currentStep === 1 &&
          <WizardFormAddPage {...form} />
        }
        {
          this.submissionStatus() !== 'success' && currentStep === 2 &&
          <WizardFormLocationPage {...form} />
        }
        {
          this.submissionStatus() !== 'success' && currentStep === 3 &&
          <WizardFormDatePage {...form} />
        }
        {
          this.submissionStatus() !== 'success' && currentStep === 4 &&
          <WizardFormInfoPage {...form} />
        }
        {
          this.submissionStatus() !== 'success' && currentStep === 5 &&
          <WizardFormReviewPage {...form} />
        }

        <Message error>
          <Message.Header>Errors</Message.Header>
          <ul>{
            Object.keys(errors).filter( key => touched[key]).map( key => (
              <li key={key}>{errors[key]}</li>
            ))
          }</ul>
        </Message>

        {
          this.submissionStatus() === 'error' &&
          <div className="wizard-server-messages">
            <Message error visible icon className='wizard-message'>
              <Icon name='warning' />
              <Message.Content>
                <Header>Submission error</Header>
                <p>
                  There was an error creating the event. Please review the entries and try again.
                  If the problem continues contact info@bluh.com.
                </p>
              </Message.Content>
            </Message>
            <Message error visible className='wizard-message'>
              <Header>Errors</Header>
              { Math.trunc(status.error.response.status / 100) === 5 &&
                <p>This is a problem on our side. Our engineers have been notified to fix the problem.</p>
              }
              { Math.trunc(status.error.response.status / 100) === 4 &&
                <List>
                  { Object.keys(status.error.response.data).map( field => (
                    <List.Item key={field}>{field}: {status.error.response.data[field].join(", ")}</List.Item>
                  ))}
                </List>
              }
            </Message>
          </div>
        }
        {
          this.submissionStatus() !== 'success' &&
          <FormButtonGroup loading={form.isSubmitting} buttonAbility={buttonAbility} buttonHandlers={buttonHandlers} />
        }
        {
          this.submissionStatus() === 'success' &&
          <Button primary>Next</Button>
        }
      </Form>
    )
  }
}
