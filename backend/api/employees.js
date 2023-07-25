import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();

const prisma = new PrismaClient();

router.get('/', (req, res) => {
  res.send("It is working!")
})

router.get('/getEmployees', async (req, res) => {
  const employees = await prisma.employees.findMany()
  res.json(employees)
})

router.post("/createReport", async (req, res) => {
  const employee = req.body;

  // await sql`SELECT * from CARTS where user_id=${params.user}`;
  // await sql`INSERT INTO Employees (${columns}) VALUES (${values});`;

  // await prisma.employees.create({ data: employee })
  // console.log('employee', employee);
  // setTimeout(async () => {
  try {
    // throw new Error(' Could not create')
    await prisma.employees.create({ data: employee })

    return res.send("Successfully!");
  } catch (err) {
    return res.status(404).send(err.message);
  }

  // }, 1000)

});
//creante a new emloyees
// await sql`\COPY  Employees FROM '/tmp/data.csv' DELIMITER ',' CSV`
//change data
// await sql`UPDATE "Employees" SET name='Leo Yorkston' WHERE  id=1`

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port} `);
// });


export default router