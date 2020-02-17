import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import validateEmails from '../../utils/validateEmails'

import SurveyField from './SurveyField'
import FIELDS from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(field => (
      <Field
        key={field.name}
        component={SurveyField}
        name={field.name}
        label={field.label}
      />
    ))
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat left white-text">
          Cancel
        </Link>
        <button
          disabled={this.props.prestine || !this.props.valid}
          type="submit"
          className="teal btn-flat right white-text"
        >
          Submit
          <i className="material-icons right">done</i>
        </button>
      </form>
    )
  }
}

const formInfo = {
  form: 'surveyForm',
  destroyOnUnmount: false,
  validate: values => {
    const errors = {}

    errors.recepients = validateEmails(values.recepients)

    FIELDS.forEach(field => {
      if (!values[field.name]) {
        errors[field.name] = field.noValueError
      }
    })

    return errors
  }
}

export default reduxForm(formInfo)(SurveyForm)
