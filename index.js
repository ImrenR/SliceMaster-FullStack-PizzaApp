"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env  
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000
// query parse was 'extended' with v5 it is using built in library which is 'qs'
app.set('query parser', 'extended')
/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */
//Email
// npm i nodemailer

const nodemailer = require('nodemailer')
/* ------------------------------------------------------- */
// Send email with ethernal (fake) email
// Create Tet Account:

// nodemailer.createTestAccount().then(email=>console.log(email));

// user: 'voeoqmumy3vcdz72@ethereal.email',
//   pass: 'fz8d8EAhc739sajS6K',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//   web: 'https://ethereal.email',
//   mxEnabled: false

// Connect to MailServer / SMTP:
const transporter = nodemailer.createTransport({
     host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'voeoqmumy3vcdz72@ethereal.email',
        pass: 'fz8d8EAhc739sajS6K', }
});


// Send Mail:
transporter.sendMail({
    from: 'voeoqmumy3vcdz72@ethereal.email',
    to: 'imren@gmail.com',
    subject: 'Test Email',
    html: '<h1>Hello</h1><p>Test Email</p>',
    text: 'Test Email',
},function ( error, success) {
    success ? console.log('Email sent: ' , success) :
    console.log('Error: ' , error);
});


/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use('/', require('./src/routes'))

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
})

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.