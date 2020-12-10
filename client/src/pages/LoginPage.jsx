import React, {useState, useContext} from 'react'
import '../app.css'
import { StudentContext } from '../context/StudentContext'

const LoginPage = (props) => {
    
    const[name, setName] = useState('')

    const[password, setPassword] = useState('')

    const {loginStudent} = useContext(StudentContext)

    let data = {
        name_of_student: name,
        student_password: password
    }
  
    const submit = async (e) => {
        e.preventDefault()
        await loginStudent(data)
        props.history.push('/')     
    }

    return (
        <div className = 'containerr'>
        <div className='box'>
            <div className='section1'>
                <h3 className='section1__h3'>Welcome BACK! to StudentApp</h3>
                <p className='section1__p'>login to manage your accounts and track your progres</p>
            </div>
            <div className="section2">
                <h2>LOGIN FORM</h2>
                <form className="ui form" onSubmit={submit}>
                    <div className="field">
                        <label>Name OF Student</label>
                        <input type="text" name="name_of_student" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
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

export default LoginPage
