require('dotenv').config()
const pool = require('../db')



const assignmentController = {

    async createAssignment(req, res) {
        const {subject, questions} = req.body
        try {
            const assignment = await pool.query("INSERT INTO assignments (subject, questions) VALUES ($1, $2) RETURNING *", [subject, questions])

            res.status(201).send({success: true, message: 'created successfully', assignment})

        } catch (error) {
            res.status(401).send(error.message)
        }

    },

    async getAssignments(req, res) {
        try {
            const assignments = await pool.query('SELECT * FROM assignments ORDER BY date_created DESC')

            if(!assignments.rows) return res.status(404).send('assignments not found')

            res.status(200).send({success: true, assignments})
       
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async getAssignment(req, res) {
        try {
            const assignment = await pool.query("SELECT * FROM assignments WHERE id = $1", [req.params.id])

            if(!assignment.rows[0]) return res.status(404).send('assignment not found')

            res.status(200).send(assignment.rows[0])
        } catch (error) {
            res.status(404).send(error.message)   
        }
    },

    async deleteAssignment(req, res) {
        try {
            const assignment = await pool.query("DELETE FROM assignments WHERE id = $1 returning *", [req.params.id])
            res.status(201).send({success: true, message:'assignment deleted', assignment})
        } catch (error) {
            res.status(401).send(error.message) 
        }
    },

    async updateAssignment(req, res) {
        try {
            const assignment = await pool.query("UPDATE assignments SET subject = $1, questions = $2 WHERE id = $3", [req.body.subject, req.body.questions, req.params.id])
            res.status(200).send({success: true, message:'assignment updated', assignment})
        } catch (error) {
            res.status(401).send(error.message) 
        }
    }
}


module.exports = {assignmentController}