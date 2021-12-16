const express = require('express')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')
require('dotenv/config')
const deserializeUser = require("./middleware/deserializeUser")
const cors = require('cors')

const authRoute = require('./routes/authRoute')

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(deserializeUser)
app.use(express.urlencoded({
    extended: false
}));
app.use('/users', authRoute)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to group 4 Energy Management App')
})

// connect to Db
mongoose.connect(process.env.DB_CONNECTION, (err) => {
    console.log(err)
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
});