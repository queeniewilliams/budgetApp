import React, { Component } from 'react'
import IncomeBar from './IncomeBar'
export default class Income extends Component {
  render() {
    return (
      <div>
        <h1>Income</h1>
        <div className="barChart1">
          {this.props.data && <IncomeBar data={this.props.data} />}
        </div>
      </div>
    )
  }
}
