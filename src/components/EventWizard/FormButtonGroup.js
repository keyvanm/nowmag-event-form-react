import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'

import './FormButtonGroup.css';


export default class FormButtonGroup extends Component {
  // RCB = ResetConfirmBox
  state = { isRCBOpen: false }

  showRCB = (e) => this.setState({ isRCBOpen: true })
  handleRCBCancelReset = () => this.setState({ isRCBOpen: false })
  handleRCBReset = (e) => {
    this.props.buttonHandlers.handleReset(e);
    this.setState({ isRCBOpen: false })
  }

  render () {
    const {
      loading,
      buttonAbility: { back, next, submit },
      buttonHandlers: { handleBack, handleNext }
    } = this.props;

    return (
      <div className="form-button-group">
        <div className="left-form-button-group">
          <Button className="reset" onClick={this.showRCB} basic>Reset</Button>
        </div>
        <div className="right-form-button-group">
          {
            back && <Button loading={loading} disabled={loading} onClick={handleBack}>Back</Button>
          }
          <Button loading={loading} disabled={loading || !next} onClick={handleNext} primary>Next</Button>

          <Button loading={loading} disabled={loading || !submit} positive type='submit'>Submit</Button>
        </div>

        <Confirm
          open={this.state.isRCBOpen}
          content='If you continue you will lose all you have entered so far'
          confirmButton="I understand, reset my entry"
          cancelButton="Never mind, I want to keep my entry"
          onCancel={this.handleRCBCancelReset}
          onConfirm={this.handleRCBReset}
        />
      </div>
    )
  }
}
