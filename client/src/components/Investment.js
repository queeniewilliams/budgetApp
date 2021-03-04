import React, { Component } from 'react'
import InvestmentBar from './InvestmentBar'
export default class Investment extends Component {
  render() {
    return (
      <div>
        <h1>INVESTMENT</h1>
        <div className="barChart2">
          <InvestmentBar data={this.props.data} />
        </div>
      </div>
    )
  }
}
