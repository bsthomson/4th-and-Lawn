import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import Signup from './../Form-Sign-Up/SignUp';
import Login  from './../Form-Login/Login';
import ValidateForm  from './../Form-Sign-Up/Validate';

import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        axios.post('/logout').then(response => {
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout Error')
        })
    }
    

    render() {

        const loggedIn = this.props.loggedIn;
        
        return (
            <section className="navigation">

                <nav className="navigation__nav">
                    {loggedIn ? (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/posted-spots" className="navigation__link">
                                    <span>My Spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link">
                                    <span>Parking spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <span className="navigation__link" onClick={this.logout}>
                                    Logout
                                </span>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link">
                                    <span>Parking spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Popup trigger={<span className="navigation__link">Sign up</span>}>
                                    <div className="modal">
                                        <Signup updateUser={this.props.updateUser}/>
                                    </div>
                                </Popup>
                            </li>
                            <li className="navigation__item">
                            <Popup trigger={<span className="navigation__link">Log in</span>} modal>
                            {close => (
                              <div className="modal">
                                <a href="#" className="popup__close" onClick={close}>
                                  &times;
                                </a>
                                
                                <Login updateUser={this.props.updateUser}/>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      console.log('modal closed ')
                                      close()
                                    }}
                                  >
                                  </button>
                              </div>
                            )}
                          </Popup>
                            </li>
                        </ul>
                    )}
                </nav>
            </section>
        );
    }
}

export default Navbar