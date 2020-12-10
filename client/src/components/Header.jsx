import React, { useContext, useEffect } from 'react'
import '../app.css'
import {withRouter} from 'react-router-dom'
import { StudentContext } from '../context/StudentContext';

const Header = (props) => {
    const {logOut, getStudent, student} = useContext(StudentContext)

    useEffect(() => {
        getStudent()
        //eslint-disable-next-line
    }, [])
    const logout = (e) => {
        e.preventDefault()
        logOut()
        props.history.push('/login')
    }
    return (
        <div className="ui secondary  menu menu__content">
            <div className="ui container">
                <a href = '/'className="item item__header">
                    Student App
                </a>
                <div className="right menu">
                    <button className="ui item item__header" onClick={logout}>
                        Logout
                    </button>
                    {student && student.isadmin === true ? (
                        <button className="ui item item__header">
                            admin
                        </button>
                    ): ''}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header) 
