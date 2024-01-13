require('dotenv').config();

const express = require('express')
const cors = require('cors')
const dbUtil = require('./config/mongoose');
const {getTodos, createTodo, deleteTodo, updateTodo} = require('./controllers/todoController')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
const auth = require("./middleware/auth");

const app = express()
const port  = process.env.PROJECT_PORT || 5000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api/tasks",auth,todoRoutes)
app.use(authRoutes)

app.get('/', (req,res) => {
    res.send("Hello World")
})

dbUtil.connectToServer(function(err, client) {
  if (err) console.log(err);

  app.listen(port, () => {
    console.log("Server listening on port 5000")
  })
});
