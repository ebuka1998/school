const express  = require('express')
const cors  = require('cors')


const app = express()

app.use(cors())

app.use(express.json({extended: true}))


//ROUTES WILL GO IN HERE
app.use('/api', require('./routes/studentRoutes'))
app.use('/api', require('./routes/assignmentRoutes'))
app.use('/api', require('./routes/answerRoutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app started on port ${PORT}`))