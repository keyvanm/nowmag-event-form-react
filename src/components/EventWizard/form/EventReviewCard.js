import React, { Component } from 'react'
import { Segment, Header, Label, Icon, List } from 'semantic-ui-react'
import { isMoment } from 'moment';

export default class EventReviewCard extends Component {
  render() {
    const { values } = this.props;

    return (
      <Segment>
        <Header>{ values.name }</Header>
        <p>
          <Icon name='marker' /> { values.location.existingVenue }
        </p>
        <p>
          <span>
            <Icon name='clock' /> { values.start.format('MMMM Do YYYY, h:mm a') }
          </span>
          { ' ' }
          {
            values.end && isMoment(values.end) &&
            <span>
              <Icon name='clock' /> { values.start.format('MMMM Do YYYY, h:mm a') }
            </span>
          }
        </p>
        <Segment raised>{ values.description }</Segment>
        <Label tag content={values.category} />

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
