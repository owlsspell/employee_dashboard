import express from "express";
const app = express();
const port = process.env.PORT || 5000;
// import cors from "cors";
import { PrismaClient } from "@prisma/client";

// const corsOptions = {
//   origin: 'https://employee-dashboard-ecru.vercel.app/',
//   optionSuccessStatus: 200,
// }

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cors(corsOptions))

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send("It is working!")
})

app.get('/getEmployees', async (req, res) => {
  const employees = await prisma.employees.findMany()
  res.json(employees)
})

app.post("/createReport", async (req, res) => {
  const employee = req.body;

  // await sql`SELECT * from CARTS where user_id=${params.user}`;
  // await sql`INSERT INTO Employees (${columns}) VALUES (${values});`;

  await prisma.employees.create({ data: employee })

  // console.log('Created new user: ', newUser)
  res.send(employee);
});
//creante a new emloyees
// await sql`\COPY  Employees FROM '/tmp/data.csv' DELIMITER ',' CSV`
//change data
// await sql`UPDATE "Employees" SET name='Leo Yorkston' WHERE  id=1`

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});