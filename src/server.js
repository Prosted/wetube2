import express, { urlencoded } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const PORT= 4000;
const logger = morgan("combined");

console.log(process.cwd());
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(urlencoded({extended:true}));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleServerOpen = () => console.log(`server is open on http://localhost:${PORT}`);

app.listen(PORT, handleServerOpen);