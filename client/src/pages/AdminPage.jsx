import React, {useEffect, useContext} from 'react'
import Header from '../components/Header'
import { StudentContext } from '../context/StudentContext'
import '../app.css'
import AdminQuestions from '../components/adminComponents/AdminQuestions';
import CreateQuestion from '../components/adminComponents/CreateQuestion';
import AnswersAdmin from '../components/adminComponents/AnswersAdmin';

const AdminPage = (props) => {
    const {student, getStudent} = useContext(StudentContext)

    useEffect(() => {
        getStudent()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(student && student.isadmin === false){
            props.history.push('/')
        }
        //eslint-disable-next-line
    }, [student])

    const openCity = (event, cityName) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        event.currentTarget.className += " active";   
    }

    return (
        <div>
            <Header/>
            <div className="ui container">
                <h2>admin</h2>
               
                <div className="tab">
                    <button id='defaultOpen' className="tablinks" onClick={(event) => openCity(event, 'Questions')}>Assignments</button>
                    <button className="tablinks" onClick={(event) => openCity(event, 'CreateQuestion')}>create Assignments</button>
                    <button className="tablinks" onClick={(event) => openCity(event, 'Answers')}>Answers</button>
                </div>

                    <div id="Questions" className="tabcontent">
                        <AdminQuestions/>
                    </div>

                    <div id="CreateQuestion" className="tabcontent">
                        <CreateQuestion/>
                    </div>

                    <div id="Answers" className="tabcontent">
                        <AnswersAdmin/>
                    </div>




            </div>
            
        </div>
    )
}

export default AdminPage
