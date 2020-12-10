import React, {useState, useEffect, useContext} from 'react'
import Header from '../components/Header'
import { StudentContext } from '../context/StudentContext'
import '../app.css'
import { AnswerContext } from '../context/AnswerContext';

const SingleAssignmentPage = (props) => {
    
    const {assignment, getAssignment, getStudent, student} = useContext(StudentContext)

    const {createAnswer, getAnswerToHideQuestion, questionHide} = useContext(AnswerContext)

    const id = props.match.params.id

    const [answer, setAnswer] = useState('')

    useEffect(() => {
        getAssignment(id)
        localStorageAnswers()
        getStudent()
        //eslint-disable-next-line
    },[])

    useEffect(() => {
        getAnswerToHideQuestion(id)
        //eslint-disable-next-line
    }, [])


    /**saving the answer temporary to loacal storage */

    const localStorageAnswers = () => {
        let array = []
        if(localStorage.localanswers){
            return
        }else{
            localStorage.setItem('localanswers', JSON.stringify(array))
        }
    }

    let payload = {
        assignment_id: id,
        student_id: student && student.id,
        answer: answer
    }
   
    useEffect(() => {
        const getLocals = JSON.parse(localStorage.getItem('localanswers')) || []
        const getLocal = getLocals.filter(x => {
            return x.assignment_id === id
         })

         if(getLocal.length > 1) {
            const lastItem = getLocal[getLocal.length -1]
            setAnswer(lastItem.answer)
        }else if(getLocal.length === 1) {
            const item = getLocal[0]
            setAnswer(item.answer)
        }
        //eslint-disable-next-line
    }, [])

    const saveAnswer = (e) => {
        e.preventDefault()
        let local = JSON.parse(localStorage.getItem('localanswers')) || []
        local.push(payload)
        localStorage.setItem('localanswers', JSON.stringify(local));
        props.history.push('/')
    }

    const submitAnswer = (e) => {
        e.preventDefault()
        createAnswer(payload)
        props.history.push('/')
    }

    
   

    return (
        <div>
            <Header/>
            <div className="ui container">
                <div className="ui grid" style={{marginTop: '40px'}}>
                    <div className="eight wide column">
                        <div className="box1">
                            <h3>{assignment && assignment.subject}</h3>
                        </div>
                        <div className="box2">
                            {assignment && assignment.questions}
                        </div>
                    </div>
                    <div className="eight wide column">
                        {questionHide && questionHide.length < 1 ? (
                            <div className="ui form">
                            <div className="field">
                                <label style = {{fontSize: '1.3rem'}} >Your answer</label>
                                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
                            </div>
                            <div className="ui grid">
                                <div className="eight wide column">
                                    <button className="ui blue button " type='submit' onClick={saveAnswer}>
                                        save to continue later
                                    </button>
                                </div>
                                <div className="eight wide column">
                                    <button className="ui red button" type='submit' onClick={submitAnswer}>submit your answer</button>
                                </div>
                            </div>
                        </div>
                        ): (<h2>you have already answered this question</h2>)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleAssignmentPage
