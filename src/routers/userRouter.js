import express from "express";
import {edit, remove, see, startGithubLogin, finishGithubLogin} from "../controllers/userController";

const userRouter = express.Router();



userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/github/startGithubLogin", startGithubLogin);
userRouter.get("/github/finishGithubLogin", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;