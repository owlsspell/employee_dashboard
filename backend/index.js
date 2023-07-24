import express from "express";
const app = express();
const port = process.env.PORT || 5000;
// import cors from "cors";
import employees from "./api/employees.js"

// const corsOptions = {
//   origin: '*',
//   optionSuccessStatus: 200,
// }

// app.use(cors(corsOptions))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/api/', employees)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
