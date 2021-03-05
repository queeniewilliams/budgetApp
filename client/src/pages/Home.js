import React, { Component } from 'react'
import '../css/App.css'
import { animations } from 'react-animation'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      dateToFormat: new Date()
    }
  }
  render() {
    return (
      <div>
        <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="enter">ENTER</button>
        </NavLink>
        <p
          style={{
            animation: animations.fadeInUp
          }}
        >
          FinCloud
        </p>
        <div
          className="pBox"
          style={{
            animation: animations.fadeInUp
          }}
        >
          <p className="paragraph">
            FinCloud is a fresh way to manage money. It provides all the
            financial services in one place including expense tracking,budget
            planning, credit monitoring, taxing filling and investment trakcer.
            The expense tracker aims to assist a user in managing personal
            finances by offering not only a basic expense check but also a brief
            analysis of incomes and expenses.
          </p>
        </div>
        <img
          className="backgroundimg"
          alt="img"
          src="https://worldclassmanager.com/wp-content/uploads/2018/01/earth-gif.gif"
          width="100%"
          height="825vh"
        />
        <Moment className="moment1" format="MMM">
          {this.state.dateToFormat}
        </Moment>
        <Moment className="moment2" format="DD">
          {this.state.dateToFormat}
        </Moment>
      </div>
    )
  }
}
