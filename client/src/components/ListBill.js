import React, { Component } from 'react'
import '../pages/ExpensePage.css'

export default class ListBill extends Component {
  render() {
    return (
      <div>
        <div className="listbill">
          <h1>$ {this.props.amount}</h1>
          <h1>{this.props.description}</h1>
          <h1>{this.props.startDate}</h1>
        </div>
      </div>
    )
  }
}
