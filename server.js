import express from "express";
import getTweets from "./linkOperations.js";
import path from "path";
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/getTweets", async (req, res) => {
   res.send(await getTweets(req.query.link));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log("server up"));
