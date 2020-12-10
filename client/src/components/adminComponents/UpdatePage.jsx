import React, {useContext, useEffect, useState} from 'react'
import { StudentContext } from '../../context/StudentContext';
import Header from '../Header'
import { baseUrl } from '../../utils/url';
import axios from 'axios'

const UpdatePage = (props) => {
    const id = props.match.params.id
    
    const {updateAssignment, student, getStudent} = useContext(StudentContext)

    const [subject, setSubject] = useState('')

    const [questions, setQuestions] = useState('')

    useEffect(() => {
        const getAssignment = async (id) => {
            try {
                const {data} = await axios.get(`${baseUrl}/assignment/${id}`)
                setSubject(data.subject)
                setQuestions(data.questions)
            } catch (error) {
                console.log(error.message);
            }
        }
        getAssignment(id)
        getStudent()
       //eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if(student && student.isadmin === false){
            props.history.push('/')
        }
        //eslint-disable-next-line
    }, [student])

    const submit = () => {
        updateAssignment(id, {subject, questions})
        props.history.push('/admin')
    }

    return (
        <div>
            <Header/>
            <div className = 'ui container' style={{marginTop: '30px'}}>
            <form className="ui form">
                <div className="field">
                    <label>Subject</label>
                    <input type="text" name="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </div>

                <div className="field">
                    <label>questions</label>
                    <textarea value={questions} onChange={(e) => setQuestions(e.target.value)}></textarea>
                </div>
            
                <button className="ui button" type="submit" onClick={submit}>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default UpdatePage
