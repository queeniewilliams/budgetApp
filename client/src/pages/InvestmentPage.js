import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListInvestment from '../components/ListInvestment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { NavLink } from 'react-router-dom'

export default class InvestmentPage extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      description: '',
      investmentList: [],
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
      let response = await axios.post(`${BASE_URL}/investments/add`, {
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate.toLocaleDateString()
      })
      console.log(response.data)
      const newInvestmentList = this.state.investmentList
      let newAmount = (
        parseFloat(this.state.amount) + parseFloat(this.state.totalAmount)
      ).toFixed(2)
      newInvestmentList.push({
        amount: this.state.amount,
        description: this.state.description,
        startDate: this.state.startDate,
        investmentId: response.data.investmentItem._id
      })
      this.setState({
        amount: '',
        description: '',
        startDate: new Date(),
        investmentList: newInvestmentList,
        totalAmount: newAmount
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const amounts = this.state.investmentList.map((item, index) => (
      <ListInvestment
        key={'investment' + index}
        amount={item.amount}
        description={item.description}
        startDate={item.startDate.toLocaleDateString()}
        investmentId={item.investmentId}
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
            <h5>NEW INVESTMENT</h5>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <h3>Amount:</h3>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.handleAmountChange}
              ></input>
              <h3>Type:</h3>
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
                    Save
                  </Button>
                )}
            </form>
          </Modal.Body>
        </Modal>
        <div className="investmentPage">
          <div className="navBar">
            <span className="navBox">
              <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
                <h2 className="navTag">Dashboard</h2>
              </NavLink>
              <NavLink
                to="/dashboard/expense"
                style={{ textDecoration: 'none' }}
              >
                <h2 className="navTag">EXPENSE</h2>
              </NavLink>
              <NavLink
                to="/dashboard/income"
                style={{ textDecoration: 'none' }}
              >
                <h2 className="navTag">INCOME</h2>
              </NavLink>
            </span>
          </div>
          <div className="incomeBox">
            <h2>TOTAL INVESTMENT: ${this.state.totalAmount}</h2>
            {amounts}
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
    )
  }
}
