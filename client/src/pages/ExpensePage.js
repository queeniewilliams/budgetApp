import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import ListSpending from '../components/ListSpending'

export default class ExpensePage extends Component {
  constructor() {
    super()
    this.state = {
      amount: null,
      description: '',
      date: '',
      totalSpend: [],
      totalBill: [],
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
    const newSpend = this.state.totalSpend
    let newAmount = (
      parseFloat(this.state.amount) + parseFloat(this.state.totalAmount)
    ).toFixed(2)
    newSpend.push({
      amount: this.state.amount,
      description: this.state.description,
      date: this.state.date
    })
    // this.setState({ totalAmount: newAmount })
    this.setState({
      amount: '',
      description: '',
      date: '',
      totalSpend: newSpend,
      totalAmount: newAmount
    })
  }
  render() {
    const amounts = this.state.totalSpend.map((item, index) => (
      <ListSpending
        key={'spend' + index}
        amount={item.amount}
        description={item.description}
        date={item.date}
      />
    ))
    return (
      <div>
        <div>Total Expense:</div>
        <button onclick={this.showModal}>+</button>
        <Modal.Dialog show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>NEW EXPENSE</Modal.Title>
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
