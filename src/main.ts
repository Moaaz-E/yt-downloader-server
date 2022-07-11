import express, { json, urlencoded } from "express"
import VideoRoute from "./routes/videos"
const app = express();
app.use(urlencoded({extended: true}));
app.use(json());
app.use("/", VideoRoute);
app.listen(8500, () => {
    console.log("listening.");
})
