import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListIncome from '../components/ListIncome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { BASE_URL } from '../globals'

export default class IncomePage extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      description: '',
      incomeList: [],
      show: false,
      totalAmount: 0,
      startDate: new Date()
    }
  }
  setStartDate = (date) => this.setState({ startDate: date })
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
      let response = await axios.post(`${BASE_URL}/income/add`, {
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate.toLocaleDateString()
      })
      console.log(response)
      const newIncomeList = this.state.incomeList
      let newAmount = (
        parseFloat(this.state.amount) + parseFloat(this.state.totalAmount)
      ).toFixed(2)
      newIncomeList.push({
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate
      })
      this.setState({
        amount: '',
        description: '',
        startDate: new Date(),
        incomeList: newIncomeList,
        totalAmount: newAmount
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const amounts = this.state.incomeList.map((item, index) => (
      <ListIncome
        key={'income' + index}
        amount={item.amount}
        description={item.description}
        startDate={item.startDate.toLocaleDateString()}
      />
    ))
    return (
      <div>
        <div>Total Income:</div>
        <p>{this.state.totalAmount}</p>
        <Modal
          dialogClassName="modal"
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
          <Button className="closeBtn" onClick={() => this.handleClose()}>
            X
          </Button>
          <Modal.Header>
            <h5>NEW INCOME</h5>
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
        <div className="incomePage">
          <div>{amounts}</div>
        </div>
        <Button
          className="spendBtn"
          variant="primary"
          onClick={() => this.handleShow()}
        >
          +
        </Button>
      </div>
    )
  }
}
