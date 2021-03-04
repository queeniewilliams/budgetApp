import React, { Component } from 'react'

export default class History extends Component {
  render() {
    return (
      <div className="recentTrans">
        <h5 className="recentDes">{this.props.description}</h5>
        <h5 className="recentAmount">${this.props.amount}</h5>
        <h5 className="recentDate">{this.props.date}</h5>
      </div>
    )
  }
}
