import React, { Component } from 'react'
import BarChart from './BarChart'
export default class Income extends Component {
  render() {
    return (
      <div>
        <h1>Income</h1>
        <div className="barChart1">
          {this.props.data && <BarChart data={this.props.data} />}
        </div>
      </div>
    )
  }
}
