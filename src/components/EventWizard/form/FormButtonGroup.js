import React, { Component } from 'react';
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

import './FormButtonGroup.css';



function ResetConfirmModal({ isOpen, handleOpen, handleNo, handleYes, handleClose }) {
  return (
    <Modal trigger={<Button className="reset" basic onClick={handleOpen}>Reset</Button>} basic size='small' onClose={handleClose} open={isOpen}>
      <Header icon='warning' content='Are you sure you want to reset the form?' />
      <Modal.Content>
        <p>
          If you continue you will lose all you have entered so far
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={handleNo}>
          <Icon name='remove' /> No, I don't want to reset the form
        </Button>
        <Button color='green' inverted onClick={handleYes}>
          <Icon name='checkmark' /> I understand, reset the form
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default class FormButtonGroup extends Component {
  // RCM = ResetConfirmBox
  state = { isRCMOpen: false }

  handleRCMOpen = (e) => {
    e.preventDefault();
    this.setState({ isRCMOpen: true })
  }
  handleRCMClose = (e) => {
    e.preventDefault();
    this.setState({ isRCMOpen: false })
  }
  handleRCMNo = (e) => {
    e.preventDefault();
    this.handleRCMClose(e);
  }
  handleRCMYes = (e) => {
    e.preventDefault();
    this.props.buttonHandlers.handleResetBtn(e);
    this.handleRCMClose(e);
  }

  render () {
    const {
      loading,
      buttonAbility: { back, next, submit },
      buttonHandlers: { handleBackBtn, handleNextBtn }
    } = this.props;

    const rcmProps = {
      isOpen: this.state.isRCMOpen,
      handleOpen: this.handleRCMOpen,
      handleNo: this.handleRCMNo,
      handleYes: this.handleRCMYes,
      handleClose: this.handleRCMClose
    }

    return (
      <div className="form-button-group">
        <div className="left-form-button-group">
          <ResetConfirmModal {...rcmProps} />
        </div>
        <div className="right-form-button-group">
          {
            back && <Button loading={loading} disabled={loading} onClick={handleBackBtn}>Back</Button>
          }
          {
            next && <Button loading={loading} disabled={loading || !next} onClick={handleNextBtn} primary>Next</Button>
          }
          {
            submit && <Button loading={loading} disabled={loading || !submit} positive type='submit'>Next</Button>
          }
        </div>
      </div>
    )
  }
}
