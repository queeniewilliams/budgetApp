import React, { Component } from 'react'
import BarChart from './BarChart'

export default class Expense extends Component {
  render() {
    return (
      <div>
        <h1>EXPENSE</h1>
        <div className="barChart">
          <BarChart data={this.props.data} />
        </div>
      </div>
    )
  }
}
