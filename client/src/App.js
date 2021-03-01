import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ExpensePage from './pages/ExpensePage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/expense" component={ExpensePage} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
