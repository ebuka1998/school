import React, {useContext, useEffect} from 'react'
import Header from '../components/Header'
import { StudentContext } from '../context/StudentContext'
import '../app.css'
import StudentCard from '../components/StudentCard'
import List from '../components/List'
import moment from 'moment'
import StudentAnswers from '../components/StudentAnswers';

const StudentHomePage = (props) => {

    const {student, getStudent, assignments, getAssignments} = useContext(StudentContext)
    
    useEffect(() => {
        getStudent()
        getAssignments()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(student && student.isadmin === true){
            props.history.push('/admin')
        }
        //eslint-disable-next-line
    }, [student])
    
    return (
        <div>
            <Header/>
            <div className="ui container">
                <div className="ui grid" style={{marginTop: '30px'}}>
                    <div className="six wide column">
                        <StudentCard
                            id={student && student.id}
                            image_url={student && student.image_url}
                            name_of_student = {student && student.name_of_student}
                            age_of_student = {student && student.age_of_student}
                        />
                    </div>

                    <div className="ten wide column">
                        <div className="box1">
                            <h3>Assignments</h3>
                        </div>
                        <div className="box2">
                            <div className="ui relaxed divided list">
                            {assignments && assignments.map(assignment => (
                                <List key={assignment.id} subject = {assignment.subject} id={assignment.id} date_created={moment(assignment.date_created).fromNow()}/>
                            ))}
                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h4 style={{textAlign: 'center', marginTop: '20px'}}>My Answers</h4>
                        <StudentAnswers/>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default StudentHomePage
