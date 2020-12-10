import React, {useContext, useEffect} from 'react'
import { AnswerContext } from '../../context/AnswerContext';
import moment from 'moment'
import {Link} from 'react-router-dom'

const AnswersAdmin = () => {

    const {getAdminAnswers, adminAnswers} = useContext(AnswerContext)

    useEffect(() => {
        getAdminAnswers()
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <table className="ui celled table">
            <thead>
                <tr>
                    <th>Name Of Student</th>
                    <th>Subject</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Remark</th>
                    <th>Date Answered</th>
                    <th>grade</th>
                </tr>
            </thead>
            <tbody>
                {adminAnswers && adminAnswers.map(x => (
                
                    <tr key={x.id}>
                        <td>{x.name_of_student}</td>
                        <td>{x.subject}</td>
                        <td>{x.questions}</td>
                        <td>{x.answer}</td>
                        <td>{x.grade}</td>
                        <td>{x.remark}</td>
                        <td>{moment(x.date_answered).fromNow()}</td>
                        <td>
                           <Link to={`/answer/${x.id}`}>
                                <button className='ui button'>
                                    grade
                                </button>
                           </Link>
                        
                        </td>
                    </tr>
                   
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default AnswersAdmin
