import React, { Component } from 'react'

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <h1>Hello</h1>
        {/* Dashboard. This is a protected route. You can only see this if you're authed. */}
      </div>
    )
  }
}