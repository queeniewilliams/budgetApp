import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListSpending from '../components/ListSpending'
import './ExpensePage.css'
import Switch from 'react-switch'
import ListBill from '../components/ListBill'

export default class ExpensePage extends Component {
  constructor() {
    super()
    this.state = {
      amount: null,
      description: '',
      date: '',
      totalSpend: [],
      totalBill: [],
      totalAmount: 0,
      show: false,
      checked: false
    }
    this.handleSwitch = this.handleSwitch.bind(this)
  }
  handleSwitch = (checked) => this.setState({ checked })
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
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
    this.setState({
      amount: '',
      description: '',
      date: '',
      totalSpend: newSpend,
      totalAmount: newAmount
    })
  }
  render() {
    const amounts = this.state.totalSpend.map((item, index) => {
      this.state.checked ? (
        <ListSpending
          key={'spend' + index}
          amount={item.amount}
          description={item.description}
          date={item.date}
        />
      ) : (
        <ListBill
          key={'bill' + index}
          amount={item.amount}
          description={item.description}
          date={item.date}
        />
      )
    })
    return (
      <div>
        <Modal
          dialogClassName="modal"
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
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
              <input
                type="text"
                value={this.state.date}
                onChange={this.handleDateChange}
              ></input>
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
          <h1>Spend:</h1>
          <p>{this.state.totalAmount}</p>
          <div className="box">
            <div className="box1">{amounts}</div>
            <div className="box2">{amounts}</div>
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
