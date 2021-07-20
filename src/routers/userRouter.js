import express from "express";
import {edit, remove, see} from "../controllers/userController";

const userRouter = express.Router();



userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);

export default userRouter;