import React, { Component } from 'react'
import ExpensePage from '../pages/ExpensePage'
import BarChart from './BarChart'

export default class Expense extends Component {
  render() {
    return (
      <div>
        <h1>Expense</h1>
        <BarChart data={this.props.data} />
      </div>
    )
  }
}
