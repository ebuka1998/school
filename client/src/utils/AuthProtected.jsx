import React from 'react'
import {Redirect, Route} from 'react-router-dom'


const AuthProtected = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('school_app_token') ? (
                    <Redirect to = '/'/>
                ): (
                    <Component {...props}/>
                )
            }
        
        />
            
    )
}

export default AuthProtected
