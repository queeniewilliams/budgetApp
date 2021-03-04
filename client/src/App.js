import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ExpensePage from './pages/ExpensePage'
import IncomePage from './pages/IncomePage'
import InvestmentPage from './pages/InvestmentPage'

class App extends Component {
  constructor() {
    super()
    this.state = {
      totalExpenseAmount: 0,
      totalIncomeAmount: 0
    }
  }
  render() {
    console.log(this.state.totalAmount)
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
