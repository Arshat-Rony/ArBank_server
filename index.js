const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport')

// middlewares 
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// checking the user is authenticated or not using passport
app.use(passport.initialize())
require('./passport')(passport)


const port = process.env.PORT || 8000;



app.use('/api/users', require('./routers/userRouter'))
app.use('/api/users', require('./routers/transactionRouter'))
app.use('/api/users', require('./routers/worksRouter'))
app.use('/api/users', require('./routers/loansRouter'))
app.use('/api/users', require('./routers/messageRouter'))


app.get("/", (req, res) => {
    res.json({
        message: 'Welcome to our Money Management Application'
    })
})


app.listen(port, () => {
    console.log("SERVER IS RUNNING AT 8000")
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kffvv.mongodb.net/arbank?retryWrites=true&w=majority`)
        .then(() => {
            console.log("Database Connected")
        })
        .catch(e => console.log(e))
})