import React, {createContext, useState} from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/url';
import setToken from '../utils/setToken';

export const AnswerContext = createContext()


export const AnswerContextProvider = (props) => {
    //declare state
    const [questionHide, setQuestionHide] = useState([])
    const [adminAnswers, setAdminAnswers] = useState([])
    const [studentAnswers, setStudentAnswers] = useState([])
   
    //functions
    const createAnswer = async (payload) => {
        try {
            await axios.post(`${baseUrl}/createAnswer`, payload)
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAnswerToHideQuestion = async (id) => {
        if(localStorage.school_app_token) {
            setToken(localStorage.school_app_token)
        }
        try {
            const {data} = await axios.get(`${baseUrl}/answerToHide/${id}`)
            setQuestionHide(data.rows)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAdminAnswers = async () => {
        try {
            const {data} = await axios.get(`${baseUrl}/adminAnswers`)
            setAdminAnswers(data.rows)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getStudentAnswers = async () => {
        if(localStorage.school_app_token) {
            setToken(localStorage.school_app_token)
        }
        try {
            const {data} = await axios.get(`${baseUrl}/studentAnswers`)
            setStudentAnswers(data.rows)
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateAnswer = async (id, payload) => {
        try {
            await axios.put(`${baseUrl}/updateAnswer/${id}`, payload)
        } catch (error) {
            console.log(error.message);
        }
    }

    // const getAssignment = async (id) => {
    //     try {
    //         const {data} = await axios.get(`${baseUrl}/assignment/${id}`)
    //         setAssignment(data)
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // const deleteAnswer = async (id) => {
    //     try {
    //         await axios.delete(`${baseUrl}/delete/${id}`)
    //         setAssignments(assignments.filter(assignmentt => {
    //             return assignmentt.id !== id
    //         }))
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    


    return(
        <AnswerContext.Provider
            value = {{
                questionHide,
                adminAnswers,
                studentAnswers,
                createAnswer,
                getAnswerToHideQuestion,
                getAdminAnswers,
                updateAnswer,
                getStudentAnswers
                
            }}
        >
            {props.children}
        </AnswerContext.Provider>
    )
}