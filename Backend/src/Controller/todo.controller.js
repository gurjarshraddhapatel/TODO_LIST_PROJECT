import { Todo } from "../Model/todo.model.js";
import { User } from "../Model/user.model.js";

const createTodo = async(req,res)=>{
    const {title,description,isCompleted} = req.body;

    const userId = req.user;    
    
    findUser = await User.findById(userId)
    if(!findUser)
    {
        return res.status(404).json({message:"User not found"})
    }

    const todoList = await Todo.create({
        title,
        description,
        userId,
        isCompleted
    })
    return res
    .status(201)
    .json({todo:todoList,message:"Todo list created successfully"})
}

const getTodo = async(req,res)=>{
    const getTodo = await Todo.find({userId:req.user})
    if(!getTodo)
    {
        return res.status(404).json({message:"Todo list not found"})
    }
    return res
    .status(200)
    .json({getTodo,message:"Todo list fetched successfully"})
}

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
        { _id: id},
        { title, description, isCompleted },
        { new: true }
    );

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    return res
        .status(200)
        .json({ todo: updatedTodo, message: "Todo updated successfully" });
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete({ _id: id});

    if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    return res
        .status(200)
        .json({ message: "Todo deleted successfully" });
};

export{
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}