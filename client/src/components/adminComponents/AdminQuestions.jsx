import React, {useContext, useEffect} from 'react'
import moment from 'moment'
import '../../app.css'
import { StudentContext } from '../../context/StudentContext'
import { Link } from 'react-router-dom'

const AdminQuestions = () => {
    const {assignments, getAssignments, deleteAssignment} = useContext(StudentContext)

    useEffect(() => {
        getAssignments()
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="box1">
                <h3>Assignments</h3>
            </div>
            <div className="box2">
                <div className="ui relaxed divided list ">
                    <div >
                        {assignments && assignments.map(assignment => (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={assignment.id}>
                                <div style={{padding: '15px'}}>
                                    <h3>{assignment.subject}</h3>
                                    <small>{moment(assignment.date_created).fromNow()}</small>
                                </div>

                                <div style={{padding: '15px'}}>
                                    <button className = 'ui secondary button' style={{marginRight: '10px'}}>
                                        <Link style={{textDecoration: 'none', color: 'white'}} to = {`/update/${assignment.id}`}>
                                            update
                                        </Link>
                                    </button>
                                    <button className = 'ui negative button' onClick={() => deleteAssignment(assignment.id)}>delete</button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminQuestions
