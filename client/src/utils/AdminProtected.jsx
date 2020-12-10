import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const AdminProtected = ({component: Component, ...rest}) => {
    return (
        <Route

            {...rest}
            render = {props => 
                !localStorage.getItem('school_app_token') ? (
                    <Redirect to = '/login'/>
                ): (
                    <Component {...props}/>
                )
            }
        
        />
    )
}

export default AdminProtected
