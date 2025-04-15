import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String
        },
        description:{
            type:String
        },
        isCompleted:{
            type:Boolean,
        },

    },
    {timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema)