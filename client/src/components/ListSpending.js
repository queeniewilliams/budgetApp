import React, { Component } from 'react'
import '../pages/ExpensePage.css'

export default class ListSpending extends Component {
  render() {
    return (
      <div>
        <div className="listSpending">
          <p>{this.props.totalAmount}</p>
          <h1>{this.props.amount}</h1>
          <h1>{this.props.description}</h1>
          <h1>{this.props.date}</h1>
        </div>
      </div>
    )
  }
}
