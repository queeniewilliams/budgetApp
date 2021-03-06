import React, { Component } from 'react'
import '../css/ExpensePage.css'
import { Modal, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { BASE_URL } from '../globals'

export default class ListInvestment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: props.amount || '',
      description: props.description || '',
      show: false,
      startDate: new Date(),
      trackDeleted: false
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
  handleDelete = () => {
    axios.delete(`${BASE_URL}/investments/remove/${this.props.investmentId}`)
    this.setState({
      amount: '',
      description: '',
      startDate: '',
      trackDeleted: true
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.put(
        `${BASE_URL}/investments/update/${this.props.investmentId}`,
        {
          amount: this.state.amount,
          description: this.state.description,
          startDate: this.state.startDate.toLocaleDateString()
        }
      )
      this.setState({
        amount: response.data.amount,
        description: response.data.description,
        startDate: response.data.startDate
      })
      console.log(this.state)
      return response.data
    } catch (error) {
      console.log('error')
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {!this.state.trackDeleted ? (
          <div className="list">
            <h2>$ {this.state.amount}</h2>
            <h3>{this.state.description}</h3>
            <h4>{this.props.startDate}</h4>
            <div className="icons">
              <Button className="deleteBtn" onClick={() => this.handleDelete()}>
                <img
                  src="https://i.ibb.co/BjQrJmR/Seek-Png-com-edit-icon-png-2022743.png"
                  alt="deleteIcon"
                  width="30px"
                  height="30px"
                />
              </Button>
              <Button className="editBtn" onClick={() => this.handleShow()}>
                <img
                  src="https://i.ibb.co/st2BVhL/pngfind-com-edit-icon-png-704605.png"
                  alt="editIcon"
                  width="30px"
                  height="30px"
                />
              </Button>
              <Modal
                dialogClassName="modal"
                show={this.state.show}
                onHide={() => this.handleClose()}
              >
                <Button className="closeBtn" onClick={() => this.handleClose()}>
                  X
                </Button>
                <Modal.Header>
                  <h5>EDIT</h5>
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
                    <br></br>
                    <br></br>
                    <Button
                      className="saveBtn"
                      type="submit"
                      value="submit"
                      onClick={() => this.handleClose()}
                    >
                      Save
                    </Button>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
