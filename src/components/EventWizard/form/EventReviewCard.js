import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'

export default class EventReviewCard extends Component {
  render() {
    const { event } = this.props;

    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Meta>Name</Item.Meta>
            <Item.Description>
              { event.name }
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Meta>Category</Item.Meta>
            <Item.Description>
              { event.category }
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              { event.description }
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}
