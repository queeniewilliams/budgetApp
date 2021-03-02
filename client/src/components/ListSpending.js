import React, { Component } from 'react'

export default class ListSpending extends Component {
  render() {
    return (
      <div>
        <p>{this.props.totalAmount}</p>
        <h1>{this.props.amount}</h1>
        <h1>{this.props.description}</h1>
        <h1>{this.props.date}</h1>
      </div>
    )
  }
}
