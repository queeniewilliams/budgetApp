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
      totalInvestment: 0,
      expensesArr: []
    }
  }
  componentDidMount() {
    this.getAllExpenses()
    this.getAllIncome()
    this.getAllInvestment()
    this.setBalance()
  }
  getAllExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`)
      let expenses = response.data.expenses
      this.calcExpenses(expenses)
    } catch (error) {
      console.log(error)
    }
  }

  calcExpenses = (expenses) => {
    expenses.map((expense) => {
      this.state.expensesArr.push(parseFloat(expense.amount))
    })
    console.log(this.state.expensesArr)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    this.setState({ totalExpense: this.state.expensesArr.reduce(reducer) })
    console.log(this.state.totalExpense)
  }
  getAllIncome = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/income`)
      console.log(response.data)
      let incomes = response.data.incomes
      this.calcIncome(incomes)
    } catch (error) {
      console.log(error)
    }
  }

  calcIncome = (incomes) => {
    const incomeArr = []
    incomes.map((income) => {
      incomeArr.push(income.amount)
    })
    console.log(incomeArr)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    this.setState({ totalIncome: incomeArr.reduce(reducer) })
    console.log(this.state.totalIncome)
  }

  getAllInvestment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/investments`)
      console.log(response.data)
      let investments = response.data.investments
      this.calcInvestment(investments)
    } catch (error) {
      console.log(error)
    }
  }

  calcInvestment = (investments) => {
    const investmentArr = []
    investments.map((investment) => {
      investmentArr.push(investment.amount)
    })
    console.log(investmentArr)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    this.setState({ totalInvestment: investmentArr.reduce(reducer) })
    console.log(this.state.totalInvestment)
  }
  setBalance = () => {
    console.log(this.state.totalIncome)
    this.setState({ balance: this.state.totalIncome - this.state.totalExpense })
    console.log(this.state.balance)
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
            <Expense data={this.state.expensesArr} />
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
              labels
              size={350}
              innerHoleSize={300}
              data={[
                {
                  key: 'Expense',
                  value: this.state.totalExpense,
                  color: 'rgb(174, 32, 179)'
                },
                {
                  key: 'Income',
                  value: this.state.totalIncome,
                  color: 'rgba(0, 255, 255, 0.678)'
                },
                { key: 'Investment', value: this.state.totalInvestment }
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
