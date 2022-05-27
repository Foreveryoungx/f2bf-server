require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DB
const morgan = require('morgan');
const cors = require('cors');
const nodemailer = require("nodemailer")

/**** Database Connection *******/
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
/**** Database Connection End *******/


const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors({
    origin: '*'
}))

/**** Routes *******/
const routes = require('./routes/routes')

app.use('/api', routes)
app.post("/send_mail", async (req, res) => {
    let {name} = req.body
    let {message} = req.body
    let {email} = req.body
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOSTM,
        port: process.env.MAIL_PORTM,
        auth: {
            user: process.env.MAIL_USERM,
            pass: process.env.MAIL_PASSM
        }
    })

    await transport.sendMail({
        from: "trevon.allen1994@gmail.com",
        to: "k1dpr3sh@gmail.com",
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
        ">
        <h2>Here is your email!</h2>
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
        
        <p>All the best, Trey</p>
        </div>
`

    })
})
/**** Routes End *******/


app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})