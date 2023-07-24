import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import employees from "./employees.js"

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/api/', employees)

app.listen(port, () => {
    console.log(`Example app listening on port ${port} `);
});
