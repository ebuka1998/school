import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { StudentContext } from '../context/StudentContext';
import axios from 'axios'

const UpdateStudent = (props) => {
    const id = props.match.params.id
    
    const {updateStudent, student, getStudent} = useContext(StudentContext)

    useEffect(() => {
        getStudent()
        // eslint-disable-next-line 
    }, [])

    const [name_of_student, setName_Of_Student] = useState('')

    const [age_of_student, setAge_Of_Student] = useState('')

    const [loading, setLoading] = useState(false)

    const [image_url, setImage] = useState()

    useEffect(() => {
        if(student && student){
            setName_Of_Student(student.name_of_student)
            setAge_Of_Student(student.age_of_student)
            setImage(student.image_url)
        }
        // eslint-disable-next-line 
    }, [student])


    //function that uploads image to cloudinary

    const uploadImage = async (e) => {
       try {
        const files = e.target.files

        const data = new FormData()

        data.append('file', files[0])

        data.append('upload_preset', 'bukason' )

        setLoading(true)

        const res = await axios.post('https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/drfv9xqcl/upload', data)
       
        const file = await res.data

        console.log(file)

        setImage(file.url)

        setLoading(false)
       } catch (error) {
            console.log(error.message);   
       }
    }

    const update = () => {
        let data = {name_of_student, age_of_student, image_url}
        updateStudent(id, data)

        props.history.push('/')
    }

    return (
        <div>
        <Header/>
        <div className = 'ui container' style={{marginTop: '30px'}}>
        <form className="ui form" onSubmit={update}>
            <div className="field">
                <label>Subject</label>
                <input 
                    type="text" 
                    name="name_of_student" 
                    placeholder="name" 
                    value={name_of_student || ''}
                    onChange={(e) => setName_Of_Student(e.target.value)}
                
                />
            </div>

            <div className="field">
                <label>Subject</label>
                <input 
                    type="number" 
                    name="age_of_student" 
                    placeholder="age" 
                    value={age_of_student || ''}
                    onChange={(e) => setAge_Of_Student(e.target.value)}
                
                />
            </div>
            <div>
                {loading ? <h3>loading...</h3> : <img src={image_url} alt="" style={{width: '200px', height: '200px'}}/> }
                <input type="file" name="unpload" id="upload" onChange={uploadImage}/>
            </div>
            <br/><br/>
            <button className="ui button" type="submit">update</button>
        </form>
        
        </div>
        </div>
    )
}

export default UpdateStudent
