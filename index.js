require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DB
const morgan = require('morgan');
const cors = require('cors');

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
/**** Routes End *******/


app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})