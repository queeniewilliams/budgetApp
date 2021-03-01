import React, { Component } from 'react'
import './dashboard.css'
import Expense from '../components/Expense'
import Income from '../components/Income'
import Investment from '../components/Investment'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      totalIncome: 0,
      totalExpense: 0,
      totalInvestment: 0
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <Income />
          <Expense />
          <Investment />
        </div>
      </div>
    )
  }
}
