const express = require('express')
const app = express()
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const cors = require("cors");

const userRoute = require('./router/User');
const stockRoute = require('./router/Stock');
const moneyRoute = require('./router/Money');
const transactionRoute = require('./router/Pembukuan');
const projectRoute = require('./router/project');
const testRoute = require('./router/test')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.use('/user', userRoute)
app.use('/stock', stockRoute)
app.use('/money', moneyRoute)
app.use('/transaction', transactionRoute)
app.use('/project', projectRoute)
app.use('/test', testRoute)

const db = require("./models")

db.sequelize.sync({ alter: true}).then((res) => {
    app.listen(3031, () => {
        console.log(`Example app listening on port 3031`)
    });
});