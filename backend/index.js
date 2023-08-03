import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";
import mainRouter from "./api/main.js"

const whitelist = [
  process.env.VITE_FRONTEND_BASE
]

const corsOptions = {
  origin: whitelist,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/api', mainRouter)

process.on('warning', e => console.warn('warning', e.stack));

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
