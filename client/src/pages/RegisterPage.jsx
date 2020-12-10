import React, {useState, useContext} from 'react'
import '../app.css'
import { StudentContext } from '../context/StudentContext';

const RegisterPage = (props) => {
    const[name, setName] = useState('')
    const[age, setAge] = useState('')
    const[password, setPassword] = useState('')

    const {registerStudent} = useContext(StudentContext)

    let data = {
        name_of_student: name,
        age_of_student: age,
        student_password: password
    }
    const submit = (e) => {
        e.preventDefault()
        registerStudent(data)
        setName('')
        setAge('')
        setPassword('')
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
                    <form className="ui form">
                        <div className="field">
                            <label>Name OF Student</label>
                            <input type="text" name="name_of_student" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Age</label>
                            <input type="number" name="age" placeholder="your age" value={age} onChange={(e) => setAge(e.target.value) } />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="ui primary button" type="submit" onClick = {submit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
