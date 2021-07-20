import express, { urlencoded } from "express";
import session from "express-session";
import morgan from "morgan";
import { localMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const logger = morgan("combined");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(urlencoded({extended:true}));

app.use(session({
    secret : "keyboard cat",
    resave : true,
    saveUninitialized : true,
}))

// app.use((req, res, next)=>{
//     req.sessionStore.all((error, sessions)=>{
//         console.log(sessions);
//         next();
//     });
// });

app.use(localMiddleware);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;