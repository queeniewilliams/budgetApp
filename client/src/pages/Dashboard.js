import React, { Component } from 'react'
import './dashboard.css'
import Expense from '../components/Expense'
import Income from '../components/Income'
import Investment from '../components/Investment'
import History from '../components/History'
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
      expensesArr: [],
      recentExpense: []
    }
  }
  componentDidMount(e) {
    this.getAllExpenses()
    //this one works
    this.getAllIncome()
    //this one works
    this.getAllInvestment()
    //this one works
    console.log(this.state)
  }
  getAllExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`)
      let expenses = response.data.expenses
      console.log(expenses)
      this.calcExpenses(expenses)
    } catch (error) {
      console.log(error)
    }
  }

  calcExpenses = (expenses) => {
    // console.log(expenses)
    const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount))
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = expenseAmounts.reduce(reducer)

    this.setState({
      totalExpense: total,
      recentExpense: expenses,
      expensesArr: expenseAmounts
    })
  }

  getAllIncome = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/income`)
      // console.log(response.data)
      let incomes = response.data.incomes
      this.calcIncome(incomes)
    } catch (error) {
      console.log(error)
    }
  }

  calcIncome = (incomes) => {
    console.log(this.state)
    const incomeArr = incomes.map((income) => income.amount)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    const total = incomeArr.reduce(reducer)
    const balance = total - this.state.totalExpense
    // console.log(incomeArr)
    this.setState({
      totalIncome: total,
      balance: balance
    })
  }

  getAllInvestment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/investments`)
      // console.log(response.data)
      let investments = response.data.investments
      this.calcInvestment(investments)
    } catch (error) {
      console.log(error)
    }
  }

  calcInvestment = (investments) => {
    const investmentArr = investments.map((investment) => investment.amount)
    // console.log(investmentArr)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    const total = investmentArr.reduce(reducer)
    this.setState({ totalInvestment: total })
    console.log(this.state)
  }

  // sortDateDsc = (a, b) => {
  //   let dateA = new Date(a.date)
  //   let dateB = new Date(b.date)

  //   if (dateA < dateB) return 1
  //   if (dateA > dateB) return -1
  //   return 0
  // }

  render() {
    const expenseList = this.state.recentExpense.map((item, index) => (
      <History
        // key={'item' + index}
        amount={item.amount}
        description={item.description}
        date={item.date}
      />
    ))
    console.log(expenseList)
    console.log(this.state.recentExpense)
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
            {this.state.expensesArr.length && (
              <Expense data={this.state.expensesArr} />
            )}
          </NavLink>
          <NavLink
            to="/dashboard/investment"
            className="investment"
            style={{ textDecoration: 'none' }}
          >
            <Investment />
          </NavLink>
          <div className="balance">
            <NavLink to="/">
              <img
                className="homeIcon"
                src="https://i.ibb.co/YDZX973/toppng-com-hombutton-white-home-button-479x388.png"
                width="70px"
              />
            </NavLink>
            <PieChart
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
                {
                  key: 'Investment',
                  value: this.state.totalInvestment,
                  color: 'rgb(241, 135, 47'
                }
              ]}
            />
            <h5
              className="balanceAmount"
              style={
                this.state.balance > 0 ? { color: 'green' } : { color: 'red' }
              }
            >
              Balance: ${this.state.balance}
            </h5>
            <div className="lists">
              <h6>Income</h6>
              <h7>'</h7>
              <h6>Expense</h6>
              <h8>'</h8>
              <h6>Investment</h6>
              <h9>'</h9>
            </div>
          </div>
          <div className="history">{expenseList}</div>
        </div>
      </div>
    )
  }
}
