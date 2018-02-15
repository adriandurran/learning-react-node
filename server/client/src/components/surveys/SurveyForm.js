import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <div className="row">
            <div className="input-field col s6">
              <Field type="text" name="surveyTitle" component="input" />
            </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
