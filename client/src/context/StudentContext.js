import React, {useState, createContext} from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/url';
import setToken from '../utils/setToken';
export const StudentContext = createContext()


export const StudentContextProvider = (props) => {
    //declare state
    const [student, setStudent] = useState({})
    const [assignments, setAssignments] = useState([])
    const [assignment, setAssignment] = useState({})
 

    //functions
    const registerStudent = async (dataToSubmit) => {
        try {
            const {data} = await axios.post(`${baseUrl}/createStudent`, dataToSubmit)
            localStorage.setItem('school_app_token', data.token)
            getStudent()
        } catch (error) {
            console.log(error.message)
        }
    }
    const loginStudent = async (dataToSubmit) => {
        try {
            const {data} = await axios.post(`${baseUrl}/loginStudent`, dataToSubmit)
            localStorage.setItem('school_app_token', data.token)
            getStudent()
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const getStudent = async () => {
        if(localStorage.school_app_token) {
            setToken(localStorage.school_app_token)
        }
        try {
            const {data} = await axios.get(`${baseUrl}/me`)
            setStudent(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const logOut =  () => {
        if(localStorage.school_app_token){
            setToken({})
            localStorage.removeItem('school_app_token')
            setStudent({})
        }
        
    }

    const createAssignment = async (payload) => {
        try {
            await axios.post(`${baseUrl}/createAssignment`, payload)
            getAssignments()
        } catch (error) {
            console.log(error.message);
        }
    }
    const getAssignments = async () => {
        try {
            const {data} = await axios.get(`${baseUrl}/assignments`)
            setAssignments(data.assignments.rows)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAssignment = async (id) => {
        try {
            const {data} = await axios.get(`${baseUrl}/assignment/${id}`)
            setAssignment(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteAssignment = async (id) => {
        try {
            await axios.delete(`${baseUrl}/delete/${id}`)
            setAssignments(assignments.filter(assignmentt => {
                return assignmentt.id !== id
            }))
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateAssignment = async (id, payload) => {
        try {
            await axios.put(`${baseUrl}/update/${id}`, payload)
            getAssignments()
        } catch (error) {
            console.log(error.message);
        }
    }


    return(
        <StudentContext.Provider
            value = {{
                student,
                assignments,
                assignment,
                registerStudent,
                loginStudent,
                getStudent,
                logOut,
                createAssignment,
                getAssignments,
                getAssignment,
                deleteAssignment,
                updateAssignment
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )
}