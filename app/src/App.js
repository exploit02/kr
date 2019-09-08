import React, { Component } from 'react'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import PrivateRoute from './utils/privateRoute'
import './../src/assests/styles/MaterializeIcon.css';
import {NotificationContainer} from 'react-notifications';

import Welcome from './components/index/welcome'
import Login from './components/operations/login'
import Logout from './components/operations/logout'
import Operations from './components/operations/index'
import CountryIndex from './components/operations/masters/country/countryIndex';
import CountryAddUpdate from './components/operations/masters/country/addUpdateCountry';
import AdminIndex from './components/operations/users/admin/adminIndex'
import AdminAddUpdate from './components/operations/users/admin/addUpdateAdmin'
import StateIndex from './components/operations/masters/state/stateIndex';
import stateAddUpdate from './components/operations/masters/state/addUpdateState';

import Noti from './components/test/notification'
import Test from './components/operations/users/chiefExecutive/addUpdateCE'
import TTest from './components/test/foo'
import layout from './components/layout/layout'

// import Admin from "./components/operations/admin/Admin"
// import Demo from "./components/test/Test"
// import Country from "./components/operations/admin/masters/country/Country"

// import AddCountry from './components/operations/admin/masters/country/AddCountry';
// import AddCE from './components/operations/admin/users/chiefexecutive/AddChiefExecutive'




export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       sample:'sam'
    }
  }
  
  render(){
    return(
      <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/logout" component={Logout}></Route>
          <Route exact path="/noti" component={Noti}></Route>
          <PrivateRoute exact path="/operations" component={Operations} />
          <PrivateRoute exact path="/operations/country" component={CountryIndex}/>
          <PrivateRoute exact path="/operations/country/add" component={CountryAddUpdate}/>
          <PrivateRoute exact path="/operations/country/update" component={CountryAddUpdate}/>
          <PrivateRoute exact path="/operations/users/admin" component={AdminIndex}/>
          <PrivateRoute exact path="/operations/users/admin/add" component={AdminAddUpdate}/>
          <PrivateRoute exact path="/operations/state" component={StateIndex}/>
          <PrivateRoute exact path="/operations/state/add" component={stateAddUpdate}/>
          <PrivateRoute exact path="/operations/state/update" component={stateAddUpdate}/>
          
          <Route exact path="/test" component={Test}></Route>
          <Route exact path="/table" component={TTest}></Route>
          <Route exact path="/layout" component={layout}></Route>

          
          {/* <Route exact path="/operations/admin/masters/country" component={Country}></Route>
          <Route exact path="./" component={Admin}></Route>
          <Route exact path="/test" component={Demo}></Route>
          <Route exact path="/operations/admin/masters/country/add" component={AddCountry}></Route>
          <Route exact path="/operations/admin/masters/country/update" component={AddCountry}></Route>
          <Route exact path="/operations/admin/users/ce/add" component={AddCE}></Route> */}
        </Switch>
        <NotificationContainer></NotificationContainer>
      </Router>
    </div>
    )
  }
}

export default App
