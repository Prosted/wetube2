import express, { urlencoded } from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const logger = morgan("combined");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(urlencoded({extended:true}));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;