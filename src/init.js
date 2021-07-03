import "./db";
import "./models/Video";
import app from "./server";


const PORT= 4000;

const handleServerOpen = () => console.log(`server is open on http://localhost:${PORT}`);

app.listen(PORT, handleServerOpen);