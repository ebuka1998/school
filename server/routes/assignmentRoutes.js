const express = require('express')

const router = express.Router()

const {assignmentController} = require('../controllers/assignmentController')

//const authorize = require('../middlewares/authorize')

router.post('/createAssignment', assignmentController.createAssignment)

router.get('/assignments', assignmentController.getAssignments)

router.get('/assignment/:id', assignmentController.getAssignment)

router.delete('/delete/:id', assignmentController.deleteAssignment)

router.put('/update/:id', assignmentController.updateAssignment)

//router.get('/me',authorize , userController.getUser)

module.exports = router