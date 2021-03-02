import React, { Component } from 'react'

export default class ListInvestment extends Component {
  render() {
    return (
      <div>
        <p>{this.props.totalAmount}</p>
        <h1>{this.props.amount}</h1>
        <h1>{this.props.description}</h1>
        <h1>{this.props.startDate}</h1>
      </div>
    )
  }
}
