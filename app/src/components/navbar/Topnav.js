import React, { Component } from 'react'
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';
import session from './../../utils/sessionStore'


class TopNav extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

    componentDidMount() {
      M.AutoInit();
    }

    render() {
        return (
            <div>
              <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">Account Info</a></li>
                <li><a href="#!">Change Password</a></li>
                <li><a href="/logout">Log Out</a></li>
              </ul>
                <div className="navbar-fixed" style={{height:'10px'}} >
                    <nav className="blue" style={{height:'45px', lineHeight:'45px'}}>
                        <div className="nav-wrapper">
                          <a href="#" className="brand-logo">&nbsp;&nbsp;&nbsp;CRUD</a>
                          <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#"></a></li>
                            {
                              session.isLoggedIn ? <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">{session.uName}<i className="material-icons right" style={{height:'45px', lineHeight:'45px'}}>dehaze</i></a></li> : null
                            }
                          </ul>
                        </div>
                    </nav> 
                </div> 
            </div> 
        )
    }
}

export default TopNav
