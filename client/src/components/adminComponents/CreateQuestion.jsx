import React, {useState, useContext} from 'react'
import { StudentContext } from '../../context/StudentContext';

const CreateQuestion = () => {

    const [subject, setSubject] = useState('')
    const [questions, setQuestions] = useState('')

    const {createAssignment} = useContext(StudentContext)

    let payload = {
        subject,
        questions
    }

    const submit = (e) => {
        e.preventDefault()
        createAssignment(payload)
        setSubject('')
        setQuestions('')
    }
    return (
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
    )
}

export default CreateQuestion
