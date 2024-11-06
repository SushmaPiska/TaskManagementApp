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
    assigneeEmail:{
        type:String,
    },
    checkList: {
        type: Map,  
        of: Boolean,  
        required: true,  
      },
    dueDate:{
        type:Date,
        required:false,
        default:null
    },
    taskType:{
        type:String,
        default:"toDo",
        enum:["toDo","backlog", "inProgress", "done"],
    }
})
// TaskSchema.virtual('assignee', {
//     ref: 'User', 
//     localField: 'assigneeEmail', 
//     foreignField: 'email', 
//     justOne: true, 
//   });
// TaskSchema.set('toJSON', { virtuals: true });
const Task=mongoose.model('Task',TaskSchema);

export default Task