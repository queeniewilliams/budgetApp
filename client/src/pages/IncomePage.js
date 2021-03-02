import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import ListIncome from '../components/ListIncome'

export default class IncomePage extends Component {
  constructor() {
    super()
    this.state = {
      amount: null,
      description: '',
      date: '',
      incomeList: [],
      show: false,
      totalAmount: 0
    }
  }

  showModal = () => {
    this.setState({ show: true })
  }
  hideModal = () => {
    this.setState({ show: false })
  }
  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }
  handleDateChange = (e) => {
    this.setState({ date: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const newIncomeList = this.state.incomeList
    let newAmount = (
      parseFloat(this.state.amount) + parseFloat(this.state.totalAmount)
    ).toFixed(2)
    newIncomeList.push({
      amount: this.state.amount,
      description: this.state.description,
      date: this.state.date
    })
    this.setState({
      amount: '',
      description: '',
      date: '',
      incomeList: newIncomeList,
      totalAmount: newAmount
    })
  }
  render() {
    const amounts = this.state.totalSpend.map((item, index) => (
      <ListIncome
        key={'spend' + index}
        amount={item.amount}
        description={item.description}
        date={item.date}
      />
    ))
    return (
      <div>
        <div>Total Income:</div>
        <button onclick={this.showModal}>+</button>
        <Modal.Dialog show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>NEW INCOME</Modal.Title>
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
              <input
                type="text"
                value={this.state.date}
                onChange={this.handleDateChange}
              ></input>
              <input type="submit" value="submit"></input>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button> */}
          </Modal.Footer>
        </Modal.Dialog>
        <div>
          <h1>Total:</h1>
          <p>{this.state.totalAmount}</p>
        </div>
        <div>{amounts}</div>
      </div>
    )
  }
}
