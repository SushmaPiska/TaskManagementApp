import mongoose from "mongoose";



const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    priority:{
        type:String,
        required:true,
        enum:["high","moderate", "low"],
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: false,
    },
    checkList: {
        type: Map,  
        of: Boolean,  
        required: true,  
      },
    dueDate:{
        type:Date,
        required:true,
    },
    taskType:{
        type:String,
        default:"toDo",
        enum:["toDo","backlog", "inProgress", "done"],
    }
})

const Task=mongoose.model('Task',TaskSchema);

export default Task