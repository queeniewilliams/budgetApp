import React, { Component } from 'react'
import './css/App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ExpensePage from './pages/ExpensePage'
import IncomePage from './pages/IncomePage'
import InvestmentPage from './pages/InvestmentPage'
import { BASE_URL } from './globals'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      totalExpenseAmount: 0,
      totalIncomeAmount: 0,
      totalInvestmentAmount: 0,
      expensesArr: [],
      recentExpense: [],
      incomeArr: [],
      recentIncome: [],
      investmentArr: []
    }
  }
  componentDidMount() {
    this.getAllExpenses()
    this.getAllIncome()
    this.getAllInvestment()
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
    const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount))
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = expenseAmounts.reduce(reducer)
    this.setState({
      totalExpenseAmount: total.toFixed(2),
      recentExpense: expenses,
      expensesArr: expenseAmounts
    })
  }
  getAllIncome = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/income`)
      let incomes = response.data.incomes
      this.calcIncome(incomes)
    } catch (error) {
      console.log(error)
    }
  }

  calcIncome = (incomes) => {
    const incomeArr = incomes.map((income) => income.amount)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    const total = incomeArr.reduce(reducer)
    const balance = total - this.state.totalExpenseAmount
    this.setState({
      totalIncomeAmount: total.toFixed(2),
      balance: balance,
      incomeArr: incomeArr,
      recentIncome: incomes
    })
  }
  getAllInvestment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/investments`)
      let investments = response.data.investments
      this.calcInvestment(investments)
    } catch (error) {
      console.log(error)
    }
  }

  calcInvestment = (investments) => {
    const investmentArr = investments.map((investment) => investment.amount)
    const reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
    const totalInvestment = investmentArr.reduce(reducer)
    this.setState({
      totalInvestmentAmount: totalInvestment,
      investmentArr: investmentArr
    })
  }
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  totalExpenseAmount={this.state.totalExpenseAmount}
                  totalIncomeAmount={this.state.totalIncomeAmount}
                  totalInvestmentAmount={this.state.totalInvestmentAmount}
                  balance={this.state.balance}
                  expensesArr={this.state.expensesArr}
                  recentExpense={this.state.recentExpense}
                  incomeArr={this.state.incomeArr}
                  recentIncome={this.state.recentIncome}
                  investmentArr={this.state.investmentArr}
                />
              )}
            />
            <Route
              path="/dashboard/expense"
              render={(props) => (
                <ExpensePage
                  {...props}
                  totalExpenseAmount={this.state.totalExpenseAmount}
                  totalIncomeAmount={this.state.totalIncomeAmount}
                  balance={this.state.balance}
                />
              )}
            />
            <Route
              path="/dashboard/income"
              render={(props) => (
                <IncomePage
                  {...props}
                  totalIncomeAmount={this.state.totalIncomeAmount}
                />
              )}
            />
            <Route
              path="/dashboard/investment"
              render={(props) => (
                <InvestmentPage
                  {...props}
                  totalInvestmentAmount={this.state.totalInvestmentAmount}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
