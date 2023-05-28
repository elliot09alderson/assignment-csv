import mongoose from "mongoose";

export const connectDB=async(req,res)=>{
try {
    // const uri = "mongodb+srv://nodebaba:admin@cluster0.qpizq3v.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(process.env.MONGO_URI || uri,{dbName:"Students"}).then(()=>{
        console.log("connected")
    }).catch((e)=>{
        console.log("connection failed")
    })
    
} catch (error) {
    console.log(error)
}
}