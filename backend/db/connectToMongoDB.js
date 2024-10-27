import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectToMongoDB=async()=>{
    try {
        const mongoURI=process.env.MONGO_DB_URI  || 'mongodb://127.0.0.1:27017/taskManageApp'
        await mongoose.connect(process.env.MONGO_DB_URI
            ,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
    )
        console.log("connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to mongoDB",error.message)
    }
}
export default connectToMongoDB