require('dotenv').config();
const express = require('express');
const connectDB = require("./db/connectDB")
const usersRouter = require("./routs/usersRout")
const tsaksRouter = require("./routs/tasksRout")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use("/user", usersRouter)
app.use("/api", tsaksRouter)

const start = async()=>{
    await connectDB()
    app.listen(3000, () => {
        console.log(`Server has started...`);
    });
}

start()