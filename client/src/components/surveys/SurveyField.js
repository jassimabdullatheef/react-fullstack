import React, { Component } from 'react'

export default class SurveyField extends Component {
  render() {
    const { input, meta, label, ...props } = this.props
    return (
      <div className="input-field col s12">
        <input
          type="text"
          id={`id_${input.name}`}
          {...input}
          {...props}
        />
        <label  className={input.value ? 'active': ''} htmlFor={`id_${input.name}`}>{label}</label>
        {meta.touched && meta.error ? (
          <span
            className="helper-text"
            data-error="wrong"
            data-success="right"
          >
            {meta.error}
          </span>
        ) : null}
      </div>
    )
  }
}
