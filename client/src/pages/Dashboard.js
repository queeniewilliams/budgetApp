import React, { Component } from 'react'
import './dashboard.css'
import Expense from '../components/Expense'
import Income from '../components/Income'
import Investment from '../components/Investment'
import History from '../components/History'
import { NavLink } from 'react-router-dom'
import { PieChart } from 'react-easy-chart'

export default class Dashboard extends Component {
  render() {
    console.log(this.props.recentExpense)
    const expenseList = this.props.recentExpense.map((item, index) => (
      <History
        key={'item' + index}
        amount={item.amount}
        description={item.description}
        date={item.startDate}
      />
    ))
    const incomeList = this.props.recentIncome.map((income, index) => (
      <History
        key={'income' + index}
        amount={income.amount}
        description={income.description}
        date={income.startDate}
      />
    ))
    console.log(expenseList)
    return (
      <div>
        <div className="container">
          <NavLink
            to="/dashboard/income"
            className="income"
            style={{ textDecoration: 'none' }}
          >
            <Income data={this.props.incomeArr} />
          </NavLink>
          <NavLink
            to="/dashboard/expense"
            className="expense"
            style={{ textDecoration: 'none' }}
          >
            <Expense data={this.props.expensesArr} />
          </NavLink>
          <NavLink
            to="/dashboard/investment"
            className="investment"
            style={{ textDecoration: 'none' }}
          >
            <Investment data={this.props.investmentArr} />
          </NavLink>
          <div className="balance">
            <NavLink to="/">
              <img
                className="homeIcon"
                src="https://i.ibb.co/YDZX973/toppng-com-hombutton-white-home-button-479x388.png"
                alt="homeIcon"
                width="70px"
              />
            </NavLink>
            <PieChart
              size={350}
              innerHoleSize={300}
              data={[
                {
                  key: 'Expense',
                  value: this.props.totalExpenseAmount,
                  color: 'rgb(174, 32, 179)'
                },
                {
                  key: 'Income',
                  value: this.props.totalIncomeAmount,
                  color: 'rgba(0, 255, 255, 0.678)'
                },
                {
                  key: 'Investment',
                  value: this.props.totalInvestmentAmount,
                  color: 'rgb(241, 135, 47'
                }
              ]}
            />
            <h5
              className="balanceAmount"
              style={
                this.props.balance > 0 ? { color: 'green' } : { color: 'red' }
              }
            >
              ${this.props.balance}
              <br></br> BALANCE
            </h5>
            <div className="lists">
              <h6>Income</h6>
              <h6 className="incomeDot">'</h6>
              <h6>Expense</h6>
              <h6 className="expenseDot">'</h6>
              <h6>Investment</h6>
              <h6 className="investmentDot">'</h6>
            </div>
          </div>
          <div className="history">
            <div className="titleBox">
              <div className="expenseTitle">EXPENSE</div>
              <div className="incomeTitle">INCOME</div>
              <div>{expenseList}</div>
              <div>{incomeList}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
