const express = require('express')

const router = express.Router()

const {studentController} = require('../controllers/studentController')

const authorize = require('../middlewares/authorize')

router.post('/createStudent', studentController.createStudent)

router.post('/loginStudent', studentController.loginStudent)

router.get('/me',authorize , studentController.getStudent)

router.put('/updateStudent/:id', studentController.updateStudent)

module.exports = router