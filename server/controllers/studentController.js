require('dotenv').config()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const studentController = {
    async createStudent(req, res) {
        const {name_of_student, age_of_student, student_password} = req.body
        const secret = process.env.SECRET
        try {
            let student = await pool.query("SELECT * FROM students WHERE name_of_student = $1", [
                name_of_student
            ])

            if (student.rows.length > 0) {
                return res.status(401).json('student already exist')
            }

            const salt = await bcrypt.genSalt(10)
            const passwordd = await bcrypt.hash(student_password, salt)

            student = await pool.query("INSERT INTO students (name_of_student, age_of_student, student_password) VALUES ($1, $2, $3) RETURNING *", 
                [name_of_student, age_of_student, passwordd]
            
            )

            const token = jwt.sign(student.rows[0].id, secret)
         
            res.status(201).header('auth-token').send({success: true, message: 'created successfully', student, token})
        } catch (error) {
            res.status(401).send(error.message)
        }

    },

    async loginStudent(req, res) {
        const { name_of_student } = req.body
        const secret = process.env.SECRET
        try {
            let student = await pool.query("SELECT * FROM students WHERE name_of_student = $1", [name_of_student])
            if(student.rows.length === 0) {
                return res.status(401).send('invalid credentials')
            }
            const password = bcrypt.compare(req.body.student_password, student.rows[0].student_password)

            if(!password) return res.status(404).send('invalid password or email')

            const token = jwt.sign(student.rows[0].id, secret)

            res.status(201).header('auth-token').send({success: true, message: 'signed successfully', token, student})
       
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getStudent(req, res) {
        try {
            const student = await pool.query("SELECT id, name_of_student, age_of_student, isAdmin, image_url, date_created FROM students WHERE id = $1", [req.user])
            res.status(200).send(student.rows[0])
        } catch (error) {
            res.status(404).send(error.message)   
        }
    }
}


module.exports = {studentController}