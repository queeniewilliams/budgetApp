import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListSpending from '../components/ListSpending'
import './ExpensePage.css'
import Switch from 'react-switch'
import ListBill from '../components/ListBill'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { PieChart } from 'react-easy-chart'
import { NavLink } from 'react-router-dom'
import { animations } from 'react-animation'

export default class ExpensePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      description: '',
      totalSpend: [],
      totalBill: [],
      totalAmount: this.props.totalExpenseAmount,
      show: false,
      checked: false,
      startDate: new Date()
    }
    this.handleSwitch = this.handleSwitch.bind(this)
  }
  // componentDidMount(e) {
  //   this.getAllExpenses()
  // }
  setStartDate = (date) => this.setState({ startDate: date })
  handleSwitch = (checked) => this.setState({ checked })
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${BASE_URL}/expenses/add`, {
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate.toLocaleDateString()
      })
      console.log('here', response)
      const newSpend = this.state.totalSpend
      const newBill = this.state.totalBill
      let newAmount = (
        parseFloat(this.state.amount) +
        parseFloat(this.props.totalExpenseAmount)
      ).toFixed(2)
      if (this.state.checked) {
        newBill.push({
          amount: this.state.amount,
          description: this.state.description,
          startDate: this.state.startDate,
          billId: response.data.expenseItem._id
        })
      } else {
        newSpend.push({
          amount: this.state.amount,
          description: this.state.description,
          startDate: this.state.startDate,
          spendId: response.data.expenseItem._id
        })
      }
      this.setState({
        amount: '',
        description: '',
        startDate: new Date(),
        totalSpend: newSpend,
        totalBill: newBill,
        totalAmount: newAmount
      })
      return response.data
    } catch (error) {
      console.log('error')
    }
  }
  // getAllExpenses = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/expenses`)
  //     let expenses = response.data.expenses
  //     console.log(expenses)
  //     this.calcExpenses(expenses)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // calcExpenses = (expenses) => {
  //   const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount))
  //   const reducer = (accumulator, currentValue) => accumulator + currentValue
  //   const total = expenseAmounts.reduce(reducer)
  //   this.setState({
  //     totalAmount: total.toFixed(2)
  //   })
  // }

  render() {
    console.log(this.props.totalIncomeAmount, this.state.totalAmount)
    const amounts = this.state.totalSpend.map((item, index) => (
      <ListSpending
        key={'item' + index}
        amount={item.amount}
        description={item.description}
        startDate={item.startDate.toLocaleDateString()}
        spendId={item.spendId}
        handleShow={this.handleShow}
      />
    ))
    const bills = this.state.totalBill.map((bill, index) => (
      <ListBill
        key={'bill' + index}
        amount={bill.amount}
        description={bill.description}
        billId={bill.billId}
        startDate={bill.startDate.toLocaleDateString()}
      />
    ))
    return (
      <div>
        <Modal
          dialogClassName="modal"
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
          <Button className="closeBtn" onClick={() => this.handleClose()}>
            X
          </Button>
          <Modal.Header>
            <h5
              style={this.state.checked ? { color: 'blue' } : { color: 'red' }}
            >
              {this.state.checked ? 'NEW BILL' : ' NEW EXPENSE'}
            </h5>
            <label>
              <Switch
                onChange={this.handleSwitch}
                checked={this.state.checked}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={50}
                className="react-switch"
                id="material-switch"
              />
            </label>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <h3>AMOUNT:</h3>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.handleAmountChange}
              ></input>
              <h3>DESCRIPTION:</h3>
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></input>
              <h3>DATE:</h3>
              <DatePicker
                selected={this.state.startDate}
                value={this.state.startDate}
                onChange={(date) => this.setStartDate(date)}
              />
              <br></br>
              <br></br>
              <br></br>
              {this.state.amount &&
                this.state.description &&
                this.state.startDate && (
                  <Button
                    className="saveBtn"
                    type="submit"
                    value="submit"
                    onClick={() => this.handleClose()}
                  >
                    SAVE
                  </Button>
                )}
            </form>
          </Modal.Body>
        </Modal>
        <div className="expensePage">
          <div
            className="navBar"
            style={{
              animation: animations.slideIn
            }}
          >
            <span className="navBox">
              <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
                <h2 className="navTag">Dashboard</h2>
              </NavLink>
              <NavLink
                to="/dashboard/income"
                style={{ textDecoration: 'none' }}
              >
                <h2 className="navTag">INCOME</h2>
              </NavLink>
              <NavLink
                to="/dashboard/investment"
                style={{ textDecoration: 'none' }}
              >
                <h2 className="navTag">INVESTMENT</h2>
              </NavLink>
            </span>
          </div>
          <h1 className="total" style={{ color: 'grey' }}>
            TOTAL EXPENSE:<br></br>$ {this.state.totalAmount}
          </h1>
          <div className="box">
            <div className="box1">
              <h2 style={{ color: 'white' }}>SPENDING</h2>
              {amounts}
            </div>
            <div className="box2">
              <h2 style={{ color: 'white' }}>BILL</h2>
              {bills}
            </div>
          </div>
          <Button
            className="spendBtn"
            variant="primary"
            onClick={() => this.handleShow()}
          >
            +
          </Button>
        </div>
        <div className="pieChart">
          <PieChart
            size={350}
            innerHoleSize={320}
            data={[
              {
                key: 'Expense',
                value: this.state.totalAmount,
                color: 'rgb(174, 32, 179)'
              },
              {
                key: 'Income',
                value: this.props.totalIncomeAmount,
                color: 'rgba(0, 255, 255, 0.678)'
              }
            ]}
          />
        </div>
        {/* <div className="pieChartCopy">
          <PieChart
            size={350}
            innerHoleSize={320}
            data={[
              {
                key: 'Expense',
                value: 1,
                color: 'rgba(128, 128, 128, 0.397)'
              },
              {
                key: 'Income',
                value: 0,
                color: 'rgba(0, 255, 255, 0.678)'
              }
            ]}
          /> */}
        {/* </div> */}
      </div>
    )
  }
}
