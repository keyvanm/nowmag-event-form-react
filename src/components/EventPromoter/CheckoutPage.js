import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Header, Step, Grid, List, Checkbox, Button, Icon } from 'semantic-ui-react'

import EventReviewCard from '../EventWizard/form/EventReviewCard';

const stepsArray = [
  {
    key: 'review',
    icon: 'send',
    title: "Review",
    completed: true
  },
  {
    key: 'promote',
    icon: 'angle double up',
    title: "Promote",
    completed: true
  },
  {
    key: 'checkout',
    icon: 'shopping cart',
    title: "Checkout",
    active: true
  },
  {
    key: 'done',
    icon: 'check',
    title: "Done!",
    disabled: true
  },
]

function isPaidCategory(event) {
  return parseFloat(event.category.price) > 0;
}

function pricableFormatter({ name, price }) {
  return parseFloat(price) > 0 ? `${name} ($${price})` : `${name} (FREE!)`
}

class CheckoutPage extends Component {
  state = {
    event: null,
    promotions: [],
  }
  componentWillMount () {
    const eventUUID = this.props.match.params.eventUUID;
    axios.get(`/api/v1/events/${eventUUID}/`).then(({data}) => {
      this.setState({ event: data });
    });
    axios.get(`/api/v1/event-promotions/`).then(({data}) => {
      this.setState({ promotions: data });
    });
  }

  totalPrice () {
    const { event, promotions, checked } = this.state;

    let total = 0;
    if (isPaidCategory(event)) {
      total += parseFloat(event.category.price)
    }
    for (var item of promotions) {
      if (checked[item.sku_id]) {
        total += parseFloat(item.price)
      }
    }
    return total;
  }

  onToken = () => {

  }

  render() {
    const { event, promotions, checked } = this.state;

    return (
      <div>

        <Header icon='cart' content="Cart" />
        <List divided>
          {
            isPaidCategory(event) &&
            <List.Item>
              Promoted category
              {pricableFormatter(event.category)}
            </List.Item>
          }
          {
            promotions.map( item => (
              <List.Item key={item.sku_id}>
                {pricableFormatter(item)}
              </List.Item>
            ))
          }
        </List>



      </div>
    );
  }
}

export default CheckoutPage;
