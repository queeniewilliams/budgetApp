import React, { Component } from 'react'
import '../App.css'
import { animations } from 'react-animation'
import { NavLink } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="enter">ENTER</button>{' '}
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
          durationIn={600}
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
            {/* <br></br>
            <br></br>
            The project is a MERN stack application, deployed on Heroku. The
            front-end is developed in CSS and React.js while the back-end is
            created in Express and Node.js. The data is stored in MongoDB Atlas.
            Then, a user can perform CRUD operations through this API such as
            create, read, update, and delete data. */}
          </p>
        </div>
        <img
          src="https://worldclassmanager.com/wp-content/uploads/2018/01/earth-gif.gif"
          width="100%"
          height="825vh"
        />
      </div>
    )
  }
}
