import mongoose from "mongoose";

export const connectDB = async()=>{
try {
        const conection = await mongoose.connect("mongodb+srv://todo_list:04E7RpYpQFks5HwP@cluster0.w98dotv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  

        console.log("Database connected successfully",conection.connection.readyState);
} catch (error) {
    console.log("Database not connected",error.message)
    process.exit(1)
} 
 }  
 