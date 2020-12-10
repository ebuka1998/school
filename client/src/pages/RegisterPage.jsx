import React, {useContext} from 'react'
import '../app.css'
import { StudentContext } from '../context/StudentContext';
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";

const RegisterPage = (props) => {
    const token = localStorage.getItem('school_app_token') || null
    const {registerStudent} = useContext(StudentContext)

    const { register, handleSubmit, errors } = useForm()

    const onSubmit = data => {
        registerStudent(data)
    };

    if(token && token){
        props.history.push('/')
    }

    
    return (
        <div className = 'containerr'>
            <div className='box'>
                <div className='section1'>
                    <h3 className='section1__h3'>Welcome to StudentApp</h3>
                    <p className='section1__p'>register to keep tract of your assignments</p>
                </div>
                <div className="section2">
                    <h2>REGISTER FORM</h2>
                    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label>Name OF Student</label>
                            <input ref={register({required: true, minLength: 4})} type="text" name="name_of_student" placeholder="your name"  />
                            <p className="form__error">
                                {errors.name_of_student && errors.name_of_student.type === 'required' && "name is required"}
                                {errors.name_of_student && errors.name_of_student.type === 'minLength' && "name must be more than 4"}
                            </p>
                        </div>
                        <div className="field">
                            <label>Age</label>
                            <input ref={register({required: true})} type="number" name="age_of_student" placeholder="your age" />
                            <p className="form__error">{errors.age_of_student && "age is required"}</p>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input ref={register({required: true, minLength: 4})} type="password" name="student_password" placeholder="enter password"/>
                            <p className="form__error">
                                {errors.student_password && errors.student_password.type === 'required' && "password is required"}
                                {errors.student_password && errors.student_password.type === 'minLength' && "password must be more than 4"}
                            </p>
                        </div>
                        <button className="ui primary button" type="submit">Submit</button>
                    </form>
                    <br/>
                    <p>already have an account? <Link to='/login'>login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
