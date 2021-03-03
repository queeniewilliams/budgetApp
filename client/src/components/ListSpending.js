import React, { Component } from 'react'
import '../pages/ExpensePage.css'

export default class ListSpending extends Component {
  render() {
    return (
      <div>
        <div className="listSpending">
          <h3>{this.props.description}</h3>
          <h2>$ {this.props.amount}</h2>
          <h4>{this.props.startDate}</h4>
        </div>
      </div>
    )
  }
}
