import { Router } from "express";
import { getCurrentUser, login, logout, register } from "../Controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router()

router.route("/create").post(register)
router.route("/login").post(login)
router.route("/get-user").get(verifyJWT,getCurrentUser)
router.route("/logout").post(verifyJWT,logout)

export default router