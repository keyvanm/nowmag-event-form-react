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

function isPaidCategory(event) {
  return parseFloat(event.category.price) > 0;
}

function pricableFormatter({ name, price }) {
  return parseFloat(price) > 0 ? `${name} ($${price})` : name
}

class PromotePage extends Component {
  state = {
    event: null,
    promotions: [],
    checked: {}
  }
  componentWillMount () {
    const eventUUID = this.props.match.params.eventUUID;
    axios.get(`/api/v1/events/${eventUUID}/`).then(({data}) => {
      this.setState({ event: data });
    });
    axios.get(`/api/v1/event-promotions/`).then(({data}) => {
      const { checked } = this.state;
      data.map(item => {
        checked[item.id] = false;
      })
      this.setState({ promotions: data, checked });
    });
  }

  totalPrice () {
    const { event, promotions, checked } = this.state;

    let total = 0;
    if (isPaidCategory(event)) {
      total += parseFloat(event.category.price)
    }
    for (var item of promotions) {
      if (checked[item.id]) {
        total += parseFloat(item.price)
      }
    }
    return total;
  }

  onCheckout = () => {
    const { checked } = this.state;
    const data = Object.keys(checked).filter( id => checked[id])
    console.log(data);
  }

  render() {
    const { event, promotions, checked } = this.state;

    return (
      <div>
        <Step.Group items={stepsArray} attached='top' widths={stepsArray.length} unstackable/>
        <Header as='h1'>Promote your event</Header>
        {
          event && promotions &&
          <Grid celled='internally'>
            <Grid.Column width={12}>
              <List>
                {
                  isPaidCategory(event) &&
                  <List.Item>
                    <Checkbox label={pricableFormatter(event.category)} defaultChecked disabled />
                  </List.Item>
                }
                {
                  promotions.map( item => (
                    <List.Item key={item.id}>
                      <Checkbox
                        label={pricableFormatter(item)}
                        checked={checked[item.id]}
                        onChange={(e, {checked}) => { this.setState({ checked: { ...this.state.checked, [item.id]: checked } })}}
                      />
                    </List.Item>
                  ))
                }
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
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
                  promotions.filter( item => checked[item.id]).map( item => (
                    <List.Item key={item.id}>
                      {pricableFormatter(item)}
                    </List.Item>
                  ))
                }
              </List>

              <Button animated='vertical' onClick={this.onCheckout}>
                <Button.Content hidden>Checkout</Button.Content>
                <Button.Content visible>
                  <Icon name='shop' /> ${this.totalPrice()}
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid>
        }
      </div>
    );
  }
}

export default PromotePage;
