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

const app = express()

app.use(cors({
    origin: ["https://energy-management-app-backend.herokuapp.com", "https://energy-management-software.herokuapp.com", "http://localhost:3000", "http://localhost:5000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(deserializeUser)
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
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