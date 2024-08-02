const express = require('express');
const TaskM = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000

TaskM.use(cors());
TaskM.use(express.json());

require('./database').databaseConnection();

const route = require('./routes/task.route');
TaskM.use('/task/api/v', route);

TaskM.get('/',(req, res) => {
    res.send("Welcome to Task Management App !");
});

TaskM.listen(PORT, () => {
    console.log("running on PORT", PORT);
})