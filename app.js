const express = require('express')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')
require('dotenv/config')
const deserializeUser = require("./middleware/deserializeUser")
const cors = require('cors')

const authRoute = require('./routes/authRoute')
const equipmentRoute = require('./routes/equipmentRoute')
const electricalBillsRoute = require('./routes/electricalBillsRoute')
const meterReadingRoute = require('./routes/meterReadingRoute')
const { requireUser } = require("./middleware/requireUser")

const app = express()
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin",  ["https://energy-management-app-backend.herokuapp.com", "https://energy-management-software.herokuapp.com", "http://localhost:3000", "http://localhost:5000","https://nervous-goldwasser-ea1a45.netlify.app", "https://goofy-jang-79f2b5.netlify.app"])
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
//   })
app.use(cors({
    origin:  ["https://energy-management-app-backend.herokuapp.com", "https://energy-management-software.herokuapp.com", "http://localhost:3000", "http://localhost:5000","https://nervous-goldwasser-ea1a45.netlify.app", "https://goofy-jang-79f2b5.netlify.app"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(deserializeUser)
app.use(express.urlencoded({
    extended: false
}));

app.get('/', requireUser, (req, res) => {
    res.send('Welcome to group 4 Energy Management App')
})
app.use('/users', authRoute)
app.use('/equipments', equipmentRoute)
app.use('/electricalBills', electricalBillsRoute)
app.use('/meterReadings', meterReadingRoute)

// connect to Db
mongoose.connect(process.env.DB_CONNECTION, (err) => {
    console.log(err)
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
});