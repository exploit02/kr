import React, { Component } from 'react'
import Topnav from "./../navbar/Topnav"
import { loginModule } from "../../services/loginService"
import "materialize-css/dist/css/materialize.min.css";
import session from './../../utils/sessionStore'


class login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       uname:null,
       crunchy:null
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(){
    this.setState({
        uname: this.refs.uname.value,
        crunchy: this.refs.crunchy.value
    })
  }

  async login(event){
    event.preventDefault()
    const res = await loginModule.login(this.state);
    
    if(res.status === 200){
      const sessionData = {
        uId: res.data.userData.uId,
        uName: res.data.userData.uName,
        eMail: res.data.userData.eMail,
        uType: res.data.userData.uType,
        isLoggedIn: true
      }
      localStorage.setItem('session', JSON.stringify(sessionData));
      global.session.uId = res.data.userData.uId;
      global.session.uName = res.data.userData.uName;
      global.session.eMail = res.data.userData.eMail;
      global.session.uType = res.data.userData.uType;
      global.session.isLoggedIn = true;
      this.props.history.push("/operations");
    }
  }
  
  render() {
    return (
      <div>
          <Topnav/>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s3 offset-s8">
                  <input id="user_name" type="text" className="validate" onChange={this.handleChange} ref="uname"/>
                  <label htmlFor="user_name">User Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s3 offset-s8">
                  <input id="password" type="password" className="validate" onChange={this.handleChange} ref="crunchy"/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
              <div className="col s2 offset-s9">
                <a className="waves-effect waves-light btn" onClick={this.login}>Sign In</a>
              </div>
              </div>
            </form>
      </div>
    )
  }
}

export default login

