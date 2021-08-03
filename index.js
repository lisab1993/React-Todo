const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT || 8000

const users = require('./routes/userRoutes')
const todos = require('./routes/todoRoutes')


mongoose.connect(`mongodb+srv://lisa:lisalisa@queencluster.qbmnz.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

    .then(() => {
        console.log('connected to db')
        app.set('secretKey', 'nodeRestApi')

        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

        app.use(morgan('dev'))
        app.use(bodyParser.urlencoded({ extended: false }))

        app.use(express.json())

        app.use('/users', users)

        app.use('/todos', validateUser, todos)


        function validateUser(req, res, next) {
            jwt.verify(req.headers['x-access-token'],
                req.app.get('secretKey'), function (err, decoded) {
                    if (err) {
                        console.log(req.headers)
                        res.json({ status: 'error', message: err.message, data: null })
                    } else {
                        req.body.userId = decoded.id
                        next()
                    }
                }
            )
        }

        //this is because doesnt consider 404 as an error so this is supposed to handle it
        app.use(function (req, res, next) {
            let err = new Error('Not Found')
            err.status = 404
            next(err)
        })

        app.use(function (err, req, res, next) {
            console.log(err)
            if (err.status === 404)
                res.status(404).json({ message: 'not found' })
            else
                res.status(500).json({ messsage: '500- something is bad' })
        })


    })

app.listen(port, function () {
    console.log('server listening on 8000')
})