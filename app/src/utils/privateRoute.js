import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import session from './../utils/sessionStore'

const PrivateRoute = ({ component: Component, ...rest })=>{
    
    return(
        <Route 
            {...rest}
                render = {props => session.isLoggedIn ? (<Component {...props}/>) : (<Redirect to={{ pathname: '/login'}}/>)}/>
    )

}

export default PrivateRoute
