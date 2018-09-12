import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Header, Step } from 'semantic-ui-react'

import EventReviewCard from '../EventWizard/form/EventReviewCard';

const stepsArray = [
  {
    key: 'promote',
    icon: 'angle double up',
    title: "Promote",
    active: true
  },
  {
    key: 'checkout',
    icon: 'shopping cart',
    title: "Checkout",
    disabled: true
  },
  {
    key: 'done',
    icon: 'check',
    title: "Done!",
    disabled: true
  },
]

class PromotePage extends Component {
  state = {
    event: null
  }
  componentWillMount () {
    const eventUUID = this.props.match.params.eventUUID;
    axios.get(`/api/v1/events/${eventUUID}/`).then(({data}) => {
      this.setState({ event: data });
    })
  }

  render() {
    const { event } = this.state;

    return (
      <div>
        <Step.Group items={stepsArray} attached='top' widths={stepsArray.length} unstackable/>
        <Header>Promote your event</Header>
        {
          event &&
          <EventReviewCard values={event} />
        }
      </div>
    );
  }
}

export default PromotePage;
