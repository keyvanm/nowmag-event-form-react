import React, { Component } from 'react';
import { Form, Select, Input, TextArea } from 'semantic-ui-react'


const categoryOptions = [
  {
    'text': "Art",
    'key': 'art', // slug
    'value': 'art',
  }
]

export class WizardFormAddPage extends Component {
  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, name: true, category: true, description: true });
  }

  handleCategoryChange = (event, data) => {
    console.log(data);
    this.props.setFieldValue('category', data.value)
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
    } = this.props;

    return (
      <div className="wizard-page">
          {/* <Message error>
            <Item.Group>
              {
                errors.map((error, index) => (
                  <Item key={index} description={error} />
                ))
              }
            </Item.Group>
          </Message> */}
          <Form.Field required error={ touched.name && errors.name }>
            <label>What is the title of your event?</label>
            <Input
              autoFocus={true}
              placeholder='Title'
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field required error={ touched.category && errors.category }>
            <label>Which of these categories best describe your event?</label>
            <Select
              placeholder='Category'
              options={categoryOptions}
              name='category'
              value={values.category}
              onChange={this.handleCategoryChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field required error={ touched.description && errors.description }>
            <label>Describe your event in a few sentences</label>
            <TextArea
              autoHeight
              placeholder='Description'
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
        </div>
    );
  }
}

export default WizardFormAddPage;
