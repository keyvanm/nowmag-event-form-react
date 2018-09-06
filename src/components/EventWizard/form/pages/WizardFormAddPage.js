import React, { Component } from 'react';
import { Form, Select, Input, TextArea } from 'semantic-ui-react'
import axios from 'axios';


export class WizardFormAddPage extends Component {
  state = {
    categoryOptions: []
  }

  fetchCategories = () => {
    axios.get("/api/v1/event-categories/").then( ({ data }) => {
      const categoryOptions = data.map( ({ name, slug, price }) => {
        const text = parseFloat(price) > 0 ? `${name} ($${price})` : name
        return { text, key: slug, value: slug };
      });
      this.setState({ categoryOptions })
    })
  }

  componentWillUnmount () {
    this.props.setTouched({ ...this.props.touched, name: true, category: true, description: true });
  }

  componentWillMount () {
    this.fetchCategories();
  }

  handleCategoryChange = (event, data) => {
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
        <Form.Field required error={ touched.name && Boolean(errors.name) }>
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
        <Form.Field required error={ touched.category && Boolean(errors.category) }>
          <label>Which of these categories best describe your event?</label>
          <Select
            placeholder='Category'
            options={this.state.categoryOptions}
            name='category'
            value={values.category}
            onChange={this.handleCategoryChange}
            // onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field required error={ touched.description && Boolean(errors.description) }>
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
