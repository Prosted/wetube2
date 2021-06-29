import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const PORT= 4000;
const logger = morgan("short");

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleServerOpen = () => console.log(`server is open on http://localhost:${PORT}`);

app.listen(PORT, handleServerOpen);