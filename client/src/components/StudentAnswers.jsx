import React, {useEffect, useContext} from 'react'
import { AnswerContext } from '../context/AnswerContext';
import moment from 'moment'

const StudentAnswers = () => {
    const {getStudentAnswers, studentAnswers} = useContext(AnswerContext)

    useEffect(() => {
        getStudentAnswers()
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
                </tr>
            </thead>
            <tbody>
                {studentAnswers && studentAnswers.map(x => (
                
                    <tr key={x.id}>
                        <td>{x.name_of_student}</td>
                        <td>{x.subject}</td>
                        <td>{x.questions}</td>
                        <td>{x.answer}</td>
                        <td style={x.grade < 10 ? {color: '#FF0000'} : {color: 'green'}}>{x.grade}</td>
                        <td style={x.grade < 10 ? {color: '#FF0000'} : {color: 'green'}}>{x.remark}</td>
                        <td>{moment(x.date_answered).fromNow()}</td>
                    </tr>
                   
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default StudentAnswers
