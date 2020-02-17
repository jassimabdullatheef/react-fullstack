import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { submitSurvey } from '../../actions'

import FIELDS from './formFields'

class SurveyReview extends Component {
  renderContent() {
    const { formValues } = this.props
    return FIELDS.map(field => (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    ))
  }

  render() {
    const { submitSurvey, formValues, onCancel, history } = this.props

    return (
      <div>
        <h5>Please confirm your email</h5>
        <div>{this.renderContent()}</div>
        <button
          onClick={onCancel}
          type="button"
          className="yellow darken-3 btn-flat white-text"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="green btn right white-text"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
})

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyReview)
)
