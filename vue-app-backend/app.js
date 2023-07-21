import express from "express";
const app = express();
const port = 5000;
import { PrismaClient } from "@prisma/client";
// const { sql } = require("@vercel/postgres")
import { sql } from '@vercel/postgres';
import path from "path";

const prisma = new PrismaClient();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.post("/createReport", async (req, res) => {
  const employee = req.body;
  console.log(Object.keys(employee).join());
  console.log(Object.values(employee).join());
  const columns = Object.keys(employee).join();
  const values = Object.values(employee).join()
  // "INSERT INTO Employee(name, email, gender, job,company, country, date) VALUES ($1,$2)"
  // await sql`SELECT * from CARTS where user_id=${params.user}`;
  // await sql`INSERT INTO Employees (${columns}) VALUES (${values});`;
  await sql`\COPY  Employees FROM '/tmp/data.csv' DELIMITER ',' CSV`
  // await prisma.employees.create({ data: employee })
  // await sql`UPDATE "Employees" SET name='Leo Yorkston' WHERE  id=1`
  // console.log('Created new user: ', newUser)
  res.send(employee);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
