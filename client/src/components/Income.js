import React, { Component } from 'react'
import IncomeBar from './IncomeBar'
export default class Income extends Component {
  render() {
    return (
      <div>
        <h1>INCOME</h1>
        <div className="barChart1">
          <IncomeBar data={this.props.data} />
        </div>
      </div>
    )
  }
}
