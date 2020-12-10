import React, {useContext} from 'react'
import '../app.css'
import { StudentContext } from '../context/StudentContext'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";

const LoginPage = (props) => {

    const token = localStorage.getItem('school_app_token') || null

    const {loginStudent} = useContext(StudentContext)

    const { register, handleSubmit, errors } = useForm()

    const onSubmit = data => {
        console.log(data);
        loginStudent(data)
    };

    if(token && token){
        props.history.push('/')
    }
    
    // const[name, setName] = useState('')

    // const[password, setPassword] = useState('')

    // const {loginStudent} = useContext(StudentContext)

    // let data = {
    //     name_of_student: name,
    //     student_password: password
    // }
  
    // const submit = async (e) => {
    //     e.preventDefault()
    //     await loginStudent(data)
    //     props.history.push('/')     
    // }

    return (
        <div className = 'containerr'>
        <div className='box'>
            <div className='section1'>
                <h3 className='section1__h3'>Welcome BACK! to StudentApp</h3>
                <p className='section1__p'>login to manage your accounts and track your progres</p>
            </div>
            <div className="section2">
                <h2>LOGIN FORM</h2>
                <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label>Name OF Student</label>
                        <input ref={register({required: true, minLength: 4})} type="text" name="name_of_student"  placeholder="your name"/>
                        <p className="form__error">
                            {errors.name_of_student && errors.name_of_student.type === 'required' && "name is required"}
                            {errors.name_of_student && errors.name_of_student.type === 'minLength' && "name must be more than 4"}
                        </p>
                    </div>
                   
                    <div className="field">
                        <label>Password</label>
                        <input ref={register({required: true, minLength: 4})} type="password" name="student_password" placeholder="enter password" />
                        <p className="form__error">
                            {errors.student_password && errors.student_password.type === 'required' && "password is required"}
                            {errors.student_password && errors.student_password.type === 'minLength' && "password must be more than 4"}
                        </p>
                    </div>
                    <button className="ui primary button" type="submit">Submit</button>
                </form>
                <br/>
                <p>don't have an account? <Link to='/register'>register</Link></p>
            </div>
        </div>
    </div>
    )
}

export default LoginPage
