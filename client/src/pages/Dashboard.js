import React, { Component } from 'react'
import './dashboard.css'
import Expense from '../components/Expense'
import Income from '../components/Income'
import Investment from '../components/Investment'
import { NavLink } from 'react-router-dom'

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
          <NavLink
            to="/dashboard/income"
            className="income"
            style={{ textDecoration: 'none' }}
          >
            <Income />
          </NavLink>
          <NavLink
            to="/dashboard/expense"
            className="expense"
            style={{ textDecoration: 'none' }}
          >
            <Expense />
          </NavLink>
          <NavLink
            to="/dashboard/investment"
            className="investment"
            style={{ textDecoration: 'none' }}
          >
            <Investment />
          </NavLink>
          <div className="balance">
            <h1 style={{ color: 'white' }}>Hi</h1>
          </div>
          <div className="history">
            <h1 style={{ color: 'white' }}>History</h1>
          </div>
        </div>
      </div>
    )
  }
}
