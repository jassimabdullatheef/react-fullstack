import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import { connect } from 'react-redux'

import { fetchUser } from '../actions'

import axios from 'axios'
window.axios = axios

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route path="/surveys/new" component={SurveyNew} />
              <Route path="/surveys" exact component={Dashboard} />
              <Route path="/" exact component={Landing} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, { fetchUser })(App)
