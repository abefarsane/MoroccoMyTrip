const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())

const db = require('./models')


// Routers
const userRouter = require('./routes/Users')
app.use("/auth", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on server 3001.")
    })
})
