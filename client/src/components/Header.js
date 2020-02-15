import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return false
      case false:
        return (
          <li>
            <a href="/auth/google">Login with google</a>
          </li>
        )
      default:
        return [
          <li key="payment">
            <Payments />
          </li>,
          <li style={{ margin: '0 10px' }} key="credits">
            Credits: {this.props.auth.credit}
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ]
    }
  }

  render() {
    return (
      <nav>
        <div className="container nav-wrapper">
          <Link to="/" className="brand-logo left">
            Emily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, {})(Header)
