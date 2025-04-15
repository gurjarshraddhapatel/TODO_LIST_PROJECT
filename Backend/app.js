import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
    // credentials:true
}))
app.use(cookieParser())
import userRouter from "./src/Route/user.route.js"
app.use("/users",userRouter)

import todoRouter from "./src/Route/todo.route.js"
app.use("/todos", todoRouter)

export{app}