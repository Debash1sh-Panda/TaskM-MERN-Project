const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },    
    status:{
        type:String,
        default: "not done"
    }
});


module.exports = mongoose.model("Task", taskSchema);