const express = require('express')

const router = express.Router()

const {answerController} = require('../controllers/answerController')

const authorize = require('../middlewares/authorize')

router.post('/createAnswer', answerController.createAnswer)

router.get('/answerToHide/:id', authorize, answerController.getAnswerTohideQuestion)

router.get('/adminAnswers', answerController.getAnswersForAdmin)

router.get('/adminAnswer/:id', answerController.getAnswerForAdmin)

router.get('/studentAnswers', authorize, answerController.getAnswersForStudent)

router.put('/updateAnswer/:id', answerController.updateAnswer)

// router.delete('/delete/:id', assignmentController.deleteAssignment)



module.exports = router