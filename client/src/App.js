import React, { Component } from 'react'
import './App.css'
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
      totalExpenseAmount: 0,
      totalIncomeAmount: 0
    }
  }
  componentDidMount(e) {
    this.getAllExpenses()
    this.getAllIncome()
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
    const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount))
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = expenseAmounts.reduce(reducer)
    this.setState({
      totalExpenseAmount: total.toFixed(2)
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
    this.setState({
      totalIncomeAmount: total
    })
  }
  render() {
    console.log(this.state.totalExpenseAmount)
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              path="/dashboard/expense"
              render={(props) => (
                <ExpensePage
                  {...props}
                  totalExpenseAmount={this.state.totalExpenseAmount}
                  totalIncomeAmount={this.state.totalIncomeAmount}
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
            <Route path="/dashboard/investment" component={InvestmentPage} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
