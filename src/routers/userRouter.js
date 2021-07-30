import express from "express";
import {remove, see, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadAvatar } from "../middlewares";

const userRouter = express.Router();



userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.get("/delete", remove);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;