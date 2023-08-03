import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import mainRouter from "./main.js"

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/api', mainRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port} `);
});
