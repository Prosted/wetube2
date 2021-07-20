import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, postJoin, postLogin, logout } from "../controllers/userController";

const rootRouter = express.Router();



rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);
rootRouter.get("/logout", logout);

export default rootRouter;