import { Router } from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../Controller/todo.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router()

router.route("/create").post(verifyJWT,createTodo)
router.route("/get-todo").get(verifyJWT,getTodo)
router.route("/update-todo/:id").patch(verifyJWT,updateTodo)
router.route("/delete-todo/:id").delete(verifyJWT,deleteTodo)


export default router