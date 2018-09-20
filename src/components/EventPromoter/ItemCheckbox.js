import React from 'react'
import { Item, Icon, Grid } from 'semantic-ui-react'

import './ItemCheckbox.css'

class ItemCheckbox extends React.Component {
  state = {
    hover: false
  }
  
  toggleHoverOn = () => {
    this.setState({ hover: true })
  }

  toggleHoverOff = () => {
    this.setState({ hover: false })
  }

  color () {
    if (this.props.disabled) {
      return 'grey'
    } else if (this.state.hover) {
      return 'green'
    }
    return 'black'
  }

  toggleChecked = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  }

  render () {
    const { name, price, description, checked, disabled } = this.props;
    return (
      <Grid 
        verticalAlign='middle'
        container
        columns={2}
        onMouseOver={this.toggleHoverOn}
        onMouseOut={this.toggleHoverOff}
        onClick={this.toggleChecked}
        className={"item-checkbox" + (disabled ? " disabled" : "")}
      >
        <Grid.Column width={1}>
            <Icon color={this.color()} size='large' name={checked? 'check square outline' : 'square outline'} />
        </Grid.Column>
        <Grid.Column width={15}>
          <Item>
            <Item.Content>
              <Item.Header as='h5'>{name}</Item.Header>
              {description && <Item.Description>
                {description}
              </Item.Description>}
              <Item.Extra>
                {
                  parseFloat(price) > 0 ?
                    <span>${price}</span> :
                    <span>FREE!</span>
                }
              </Item.Extra>
            </Item.Content>
          </Item>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ItemCheckbox;