import Axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import '../app.css'
import { AnswerContext } from '../context/AnswerContext';
import { baseUrl } from '../utils/url';
import { StudentContext } from '../context/StudentContext';

const SingeAdminAnswerPage = (props) => {
    const [grade, setGrade] = useState()

    const [remark, setRemark] = useState()

    const [adminAnswer, setAdminAnswer] = useState({})

    const {updateAnswer, getAdminAnswers} = useContext(AnswerContext)

    const {student, getStudent} = useContext(StudentContext)

    let id = props.match.params.id

    const getAdminAnswer = async (id) => {
        try {
            const {data} = await Axios.get(`${baseUrl}/adminAnswer/${id}`)
            setGrade(data.rows[0].grade)
            setRemark(data.rows[0].remark)
            setAdminAnswer(data.rows[0])
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAdminAnswer(id)
        getStudent()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(student && student.isadmin === false){
            props.history.push('/')
        }
        //eslint-disable-next-line
    }, [student])

    let payload = {grade, remark}

    const submit = (e) => {
        e.preventDefault()
        updateAnswer(id, payload)
        props.history.push('/admin')
        getAdminAnswers()
    }

    return (
        <div style={{marginTop: '50px'}}>
            <div className="ui container">
               <div className="ui grid">
                <div className="ten wide column">
                    <div className="box1">
                        <h3>answer</h3>
                    </div>
                    <div className="box2">
                        <div>
                            <h3>name of student: {adminAnswer && adminAnswer.name_of_student}</h3>
                            <h3>Subject: {adminAnswer && adminAnswer.subject}</h3>
                            <h3>Questions: <p>{adminAnswer && adminAnswer.questions}</p></h3>
                            <h4>answers: <p>{adminAnswer && adminAnswer.answer}</p></h4>
                        </div>  
                    </div>
                </div>

                <div className="six wide column">
                    <div className="box1">
                        <h3>grade and remark</h3>
                    </div>
                    <div className="box2">
                    <form className="ui form">
                        <div className="field">
                            <label>grade</label>
                            <input type="number" name="grade" placeholder="grade" value={grade || ''} onChange={(e) => setGrade(e.target.value)}/>
                        </div>

                        <div className="field">
                            <label>remark</label>
                            <textarea placeholder='enter remark...' value={remark || ''} onChange={(e) => setRemark(e.target.value)}></textarea>
                        </div>
                    
                        <button className="ui button" type="submit" onClick={submit}>Submit</button>
                    </form>
                    </div>
                </div>
               </div>
            </div>
        </div>
    )
}

export default SingeAdminAnswerPage
