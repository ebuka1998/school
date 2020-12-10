require('dotenv').config()
const pool = require('../db')



const answerController = {

    async createAnswer(req, res) {
        const {answer, assignment_id, student_id} = req.body
        try {
            const answered_question = await pool.query("INSERT INTO answers (answer, assignment_id, student_id) VALUES ($1, $2, $3) RETURNING *", [answer, assignment_id, student_id])

            res.status(201).send({success: true, message: 'created successfully', answered_question})

        } catch (error) {
            res.status(401).send(error.message)
        }

    },

    async getAnswerTohideQuestion(req, res){
        try {
            const getAnswered = await pool.query("SELECT answer, answers.id, subject, questions, assignments.id as id_assignment, students.id as id_students FROM answers LEFT JOIN students on answers.student_id = students.id LEFT JOIN assignments on answers.assignment_id = assignments.id WHERE assignments.id = $1 AND students.id = $2", [req.params.id, req.user])
            //console.log(req.user)
            res.send(getAnswered)
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getAnswersForAdmin(req, res){
        try {
            const answers = await pool.query("SELECT answer, grade, remark, date_answered, answers.id, subject, questions, assignments.id as id_assignment, name_of_student, age_of_student, students.id as id_students FROM answers LEFT JOIN students on answers.student_id = students.id LEFT JOIN assignments on answers.assignment_id = assignments.id")
            res.send(answers)
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getAnswerForAdmin(req, res){
        try {
            const answer = await pool.query("SELECT answer, grade, remark, date_answered, answers.id, subject, questions, assignments.id as id_assignment, name_of_student, age_of_student, students.id as id_students FROM answers LEFT JOIN students on answers.student_id = students.id LEFT JOIN assignments on answers.assignment_id = assignments.id WHERE answers.id = $1", [req.params.id])
            res.send(answer)
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getAnswersForStudent(req, res){
        try {
            const answers = await pool.query("SELECT answer, grade, remark, date_answered, answers.id, subject, questions, assignments.id as id_assignment, name_of_student, age_of_student, students.id as id_students FROM answers LEFT JOIN students on answers.student_id = students.id LEFT JOIN assignments on answers.assignment_id = assignments.id WHERE students.id = $1", [req.user])
            res.send(answers)
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async updateAnswer(req, res) {
        try {
            const answer = await pool.query("UPDATE answers SET grade = $1, remark = $2 WHERE id = $3 returning *", [req.body.grade, req.body.remark, req.params.id])
            res.status(200).send({success: true, message:'answer updated', answer})
        } catch (error) {
            res.status(401).send(error.message) 
        }
    }

    /*there will be three routes for getting the answers one for the admin that will return all 
         answers  one for the user  to return the answers for the specific logged in user
         and another that will return
    */

    // async getAssignments(req, res) {
    //     try {
    //         const assignments = await pool.query('SELECT * FROM assignments ORDER BY date_created DESC')

    //         if(!assignments.rows) return res.status(404).send('assignments not found')

    //         res.status(200).send({success: true, assignments})
       
    //     } catch (error) {
    //         res.status(401).send(error.message)
    //     }
    // },

    // async getAssignment(req, res) {
    //     try {
    //         const assignment = await pool.query("SELECT * FROM assignments WHERE id = $1", [req.params.id])

    //         if(!assignment.rows[0]) return res.status(404).send('assignment not found')

    //         res.status(200).send(assignment.rows[0])
    //     } catch (error) {
    //         res.status(404).send(error.message)   
    //     }
    // },

    // async deleteAssignment(req, res) {
    //     try {
    //         const assignment = await pool.query("DELETE FROM assignments WHERE id = $1 returning *", [req.params.id])
    //         res.status(201).send({success: true, message:'assignment deleted', assignment})
    //     } catch (error) {
    //         res.status(401).send(error.message) 
    //     }
    // },

  
}


module.exports = {answerController}