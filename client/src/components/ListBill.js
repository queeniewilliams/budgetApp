import React, { Component } from 'react'
import '../pages/ExpensePage.css'

export default class ListBill extends Component {
  render() {
    return (
      <div>
        <div className="listbill">
          <p>{this.props.totalAmount}</p>
          <h1>{this.props.amount}</h1>
          <h1>{this.props.description}</h1>
          <h1>{this.props.date}</h1>
        </div>
      </div>
    )
  }
}
