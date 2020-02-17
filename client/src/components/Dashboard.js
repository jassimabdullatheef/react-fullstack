import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large red" to="/surveys/new">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
