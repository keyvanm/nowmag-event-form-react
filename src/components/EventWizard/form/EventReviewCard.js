import React, { Component } from 'react'
import { Segment, Header, Label, Icon, List } from 'semantic-ui-react'
import { isMoment } from 'moment';
import axios from 'axios';


class LocationComponent extends Component {
  state = {
    name: "",
    address: "",
  }
  componentWillMount() {
    const { location } = this.props;
    if (!location.isNewVenue && location.existingVenue) {
      axios.get(`/api/v1/locations/${location.existingVenue}/`).then(({ data }) => {
        this.setState({ ...data })
      })
    } else {
      this.setState({ ...location.newVenue })
    }
  }
  render() {
    return (
      <div>
        <Icon name='marker' />
        <span>{ this.state.name } ({ this.state.address })</span>
      </div>
    )
  }
}

class CategoryComponent extends Component {
  state = {
    name: "",
    price: "",
  }

  componentWillMount() {
    const { category } = this.props;

    axios.get(`/api/v1/event-categories/${category}/`).then(({ data }) => {
      this.setState({ ...data })
    })

  }
  render() {
    return (
      <Label tag content={`${this.state.name} ($${ this.state.price })`} />
    )
  }
}


export default class EventReviewCard extends Component {
  render() {
    const { values } = this.props;

    return (
      <Segment>
        <Header>{ values.name }</Header>
        <div>
          <LocationComponent location={values.location} />
        </div>
        <div>
          <span>
            <Icon name='clock' /> { isMoment(values.start) && values.start.format('MMMM Do YYYY, h:mm a') }
          </span>
          { ' ' }
          {
            values.end && isMoment(values.end) &&
            <span>
              <Icon name='clock' /> { values.end.format('MMMM Do YYYY, h:mm a') }
            </span>
          }
        </div>
        <Segment raised>{ values.description }</Segment>
        <CategoryComponent category={values.category} />

        <div>
          <List horizontal>
            {
              values.website &&
              <List.Item icon='linkify' content={<a target='_blank' href={values.website}>{values.website}</a>} />
            }
            {
              values.phone_number &&
              <List.Item icon='phone' content={values.phone_number} />
            }
            {
              values.email &&
              <List.Item
                icon='mail' content={<a href={`mailto:${values.email}`}>{values.email}</a>}
              />
            }
            {
              values.facebook &&
              <List.Item icon='facebook' content={<a target='_blank' href={values.facebook}>{values.facebook}</a>} />
            }
          </List>
        </div>

      </Segment>
    )
  }
}
