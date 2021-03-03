import React, { Component } from 'react'
import './dashboard.css'
import Expense from '../components/Expense'
import Income from '../components/Income'
import Investment from '../components/Investment'
import { NavLink } from 'react-router-dom'
import { PieChart } from 'react-easy-chart'
import axios from 'axios'
import { BASE_URL } from '../globals'

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
  componentDidMount() {
    this.getAllExpenses()
  }
  getAllExpenses = async () => {
    // e.preventDefault()
    try {
      const response = await axios.get(`${BASE_URL}/expenses`)
      let expenses = response.data.expenses
      this.calcTotal(expenses)
    } catch (error) {
      console.log(error)
    }
  }

  calcTotal = (expenses) => {
    const expensesArr = []
    expenses.map((expense) => {
      expensesArr.push(expense.amount)
    })
    console.log(expensesArr)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    this.setState({ totalExpense: expensesArr.reduce(reducer) })
    console.log(this.state.totalExpense)
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
            {/* <h1 style={{ color: 'white' }}></h1> */}
            <PieChart
              data={[
                { key: 'A', value: this.state.totalExpense },
                { key: 'B', value: 200 },
                { key: 'C', value: 50 }
              ]}
            />
          </div>
          <div className="history">
            <h1 style={{ color: 'white' }}>History</h1>
          </div>
        </div>
      </div>
    )
  }
}
