import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";
import history from 'connect-history-api-fallback';
import employees from "./api/employees.js"

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
}
app.get('/', (req, res) => {
  res.send("It is working without!")
})
// app.use(history({
//   // index: '/index.js',
//   logger: console.log.bind(console)
// }));
// app.use(history({
//   index: '/index.js'
// }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOptions))

app.use('/api/', employees)
// app.use(history({
//   // index: '/index.js',
//   logger: console.log.bind(console)
// }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
