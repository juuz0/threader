import express from "express";
import getTweets from "./linkOperations.js";
const app = express();
const port = 3001;

app.get("/getTweets", async (req, res) => {
   res.send(await getTweets(req.query.link));
});

app.listen(port, () => console.log("server up"));
