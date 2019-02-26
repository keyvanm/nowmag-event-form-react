import React, { Component } from 'react';
import axios from 'axios';
import { Header, Step, Grid, List, Button, Icon, Statistic, Item, Divider, Message } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout';

import ItemCheckbox from './ItemCheckbox';
import ImageUpload from './ImageUpload';

const stepsArray = [
  {
    key: 'review',
    icon: 'search',
    title: "Review",
    completed: true
  },
  {
    key: 'submit',
    icon: 'send',
    title: "Submit",
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

function promotedCategoryFormatter({ name, price }) {
  return `Category: ${pricableFormatter({ name, price })}`
}

class PromotePage extends Component {
  state = {
    stripeKey: null,
    event: null,
    promotions: [],
    checked: {},
    teaserImageUUID: null,
    loading: false
  }
  componentWillMount () {
    axios.get(`/api/v1/stripe-key/`).then(({data}) => {
      this.setState({ stripeKey: data.public_key });
    });
    const eventUUID = this.props.match.params.eventUUID;
    axios.get(`/api/v1/events/${eventUUID}/`).then(({data}) => {
      this.setState({ event: data });
    });
    axios.get(`/api/v1/event-promotions/`).then(({data}) => {
      const { checked } = this.state;
      for (let item of data) {
        checked[item.sku_id] = false;
      }
      this.setState({ promotions: data, checked });
    });
  }

  shouldUploadIamge () {
    for (let promo of this.state.promotions) {
      if (this.state.checked[promo.sku_id]) {
        if (promo.should_upload_image) {
          return true;
        }
      }
    }
    return false;
  }

  totalPricePreTax () {
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

  totalTax () {
    return (0.13 * this.totalPricePreTax()).toFixed(2)
  }

  totalPricePostTax () {
    return (1.13 * this.totalPricePreTax()).toFixed(2);
  }

  onDrop = (teaserImageUUID) => {
    this.setState({ teaserImageUUID });
  }

  onToken = (token) => {
    const { checked } = this.state;
    const eventUUID = this.props.match.params.eventUUID;
    const checkedPromos = Object.keys(checked).filter( id => checked[id])
    axios.post(`/api/v1/events/${eventUUID}/create_invoice/`, checkedPromos).then(() => {
      axios.post(`/api/v1/events/${eventUUID}/pay/`, token).then(() => {
        this.submitEvent()
      });
    });
  }

  submitEvent = () => {
    this.setState({ loading: true })
    const eventUUID = this.props.match.params.eventUUID;
    const { checked } = this.state;
    const checkedPromos = Object.keys(checked).filter( id => checked[id])
    axios.post(`/api/v1/events/${eventUUID}/submit/`, checkedPromos).then(() => {
      this.props.history.push(`/events/${eventUUID}/done/`);
    }).catch((error) => {
      this.setState({ loading: false })
    });
  }

  render() {
    const eventUUID = this.props.match.params.eventUUID;
    const { event, promotions, checked } = this.state;

    return (
      <div>
        <Step.Group items={stepsArray} attached='top' widths={stepsArray.length} unstackable/>
        <Header as='h1'>Submit your event</Header>
        {event && <Header as='h3'>{event.name}</Header>}
        { event && this.totalPricePreTax() === 0 &&
          <Message warning>
            <p>Please click on <b>submit</b> even if you don't select Featured Event Listings, so we can have a record of your event. It's free to post!</p>
          </Message>
        }
        {
          event && promotions &&
          <Grid stackable celled='internally'>
            <Grid.Column>
              <Item.Group divided>
                {
                  // <Item>
                  //   <Checkbox label={promotedCategoryFormatter(event.category)} defaultChecked disabled />
                  //   <ItemCheckbox
                  //     name="Category"
                  //     description={event.category.name}
                  //     price={event.category.price}
                  //     checked disabled/>
                  // </Item>
                }
                {
                  promotions.map( item => (
                    <Item key={item.sku_id}>
                      {/* <Checkbox
                        label={pricableFormatter(item)}
                        checked={checked[item.sku_id]}
                        onChange={(e, {checked}) => { this.setState({ checked: { ...this.state.checked, [item.sku_id]: checked } })}}
                      /> */}
                      <ItemCheckbox
                        name={item.name}
                        price={item.price}
                        checked={checked[item.sku_id]}
                        onChange={checked => { this.setState({ checked: { ...this.state.checked, [item.sku_id]: checked } })}}
                      />
                    </Item>
                  ))
                }
              </Item.Group>
              {
                this.shouldUploadIamge() &&
                <div>
                  <Divider horizontal>Upload your event teaser image</Divider>
                  <ImageUpload eventUUID={eventUUID}/>
                </div>
              }

                <Button onClick={this.submitEvent} loading={this.state.loading} primary>
                  <Icon name='send' /> Submit free event
                </Button>

            </Grid.Column>


            {/* <Grid.Column width={6}>
              <Header icon='cart' content="Cart" as='h2' />
              <List>
                <List.Item>
                  <Icon name='right triangle' />
                  {promotedCategoryFormatter(event.category)}
                </List.Item>

                {
                  promotions.filter( item => checked[item.sku_id]).map( item => (
                    <List.Item key={item.sku_id}>
                      <Icon name='right triangle' />
                      {pricableFormatter(item)}
                    </List.Item>
                  ))
                }
              </List>
              <Statistic.Group horizontal size='small'>
                <Statistic>
                  <Statistic.Value>${this.totalPricePreTax()}</Statistic.Value>
                  <Statistic.Label>Total</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>${this.totalTax()}</Statistic.Value>
                  <Statistic.Label>HST (13%)</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>${this.totalPricePostTax()}</Statistic.Value>
                  <Statistic.Label>Total payable</Statistic.Label>
                </Statistic>
              </Statistic.Group>


              {
                this.totalPricePreTax () === 0 &&
                <Button onClick={this.submitEvent} loading={this.state.loading} primary>
                  <Icon name='send' /> Submit free event
                </Button>
              }
              {
                (this.totalPricePreTax () > 0 && this.state.stripeKey) &&
                <StripeCheckout
                  name="NOW Toronto"
                  description="Events submission form"
                  image="https://nowtoronto.com/api/design-9c8e29cb008a8cdad4bb7a41f0f6d908/NOWLOGO%20FOR%20WEBsite.png"
                  amount={this.totalPricePostTax() * 100}
                  currency="USD"
                  token={this.onToken}
                  email={event.owner_email}
                  stripeKey={this.state.stripeKey}
                  ComponentClass="div"
                  // opened={}
                  closed={() => this.setState({ loading: false })}
                >
                  <Button loading={this.state.loading} primary onClick={() => this.setState({ loading: true })}>
                    <Icon name='shop' /> Pay ${this.totalPricePostTax()} with Stripe
                  </Button>
                </StripeCheckout>
              }

            </Grid.Column> */}
          </Grid>
        }
      </div>
    );
  }
}

export default PromotePage;
