import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListSpending from '../components/ListSpending'
import './ExpensePage.css'
import Switch from 'react-switch'
import ListBill from '../components/ListBill'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class ExpensePage extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      description: '',
      totalSpend: [],
      totalBill: [],
      totalAmount: 0,
      show: false,
      checked: false,
      startDate: new Date()
    }
    this.handleSwitch = this.handleSwitch.bind(this)
  }
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
  // handleDateChange = (e) => {
  //   this.setState({ date: e.target.value })
  // }
  handleSubmit = (e) => {
    e.preventDefault()
    const newSpend = this.state.totalSpend
    const newBill = this.state.totalBill
    let newAmount = (
      parseFloat(this.state.amount) + parseFloat(this.state.totalAmount)
    ).toFixed(2)
    if (this.state.checked) {
      newBill.push({
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate
      })
    } else {
      newSpend.push({
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate
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
  }
  render() {
    console.log(this.state.startDate.toLocaleDateString())
    const amounts = this.state.totalSpend.map((item, index) => (
      <ListSpending
        key={'spend' + index}
        amount={item.amount}
        description={item.description}
        startDate={item.startDate.toLocaleDateString()}
      />
    ))
    const bills = this.state.totalBill.map((item, index) => (
      <ListBill
        key={'bill' + index}
        amount={item.amount}
        description={item.description}
        startDate={item.startDate.toLocaleDateString()}
      />
    ))
    return (
      <div>
        <Modal
          dialogClassName="modal"
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
          <Button onClick={() => this.handleClose()}>X</Button>
          <Modal.Header>
            <h2
              style={this.state.checked ? { color: 'blue' } : { color: 'red' }}
            >
              {this.state.checked ? 'NEW BILL' : ' NEW EXPENSE'}
            </h2>
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
              <h3>Amount:</h3>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.handleAmountChange}
              ></input>
              <h3>Description:</h3>
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></input>
              <h3>Date:</h3>
              <DatePicker
                selected={this.state.startDate}
                value={this.state.startDate}
                onChange={(date) => this.setStartDate(date)}
              />
              <br></br>
              <Button
                type="submit"
                value="submit"
                onClick={() => this.handleClose()}
              >
                Save
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        <div className="expensePage">
          <h1>Total Expense:</h1>
          <p style={{ color: 'white' }}>{this.state.totalAmount}</p>
          <div className="box">
            <div className="box1">
              <h3>Spending</h3>
              {amounts}
            </div>
            <div className="box2">
              <h3>Bill</h3>
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
      </div>
    )
  }
}
