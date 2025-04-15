import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { app } from "./app.js";

const PORT = 1000

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`);
    })
})
.catch((err)=>{
    console.log("server not connected",err);
})
