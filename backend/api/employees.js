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
  console.log('employee,', employee);
  // await sql`SELECT * from CARTS where user_id=${params.user}`;
  // await sql`INSERT INTO Employees (${columns}) VALUES (${values});`;

  // await prisma.employees.create({ data: employee })
  // console.log('employee', employee);
  // setTimeout(async () => {
  try {
    // throw new Error(' Could not create')
    // if()
    await prisma.employees.create({ data: employee })

    return res.send("Successfully!");
  } catch (err) {
    return res.status(404).send(err.message);
  }

  // }, 2000)

});

router.get("/getUniqueFields", async (req, res) => {
  console.log(req.query.column);
  try {
    // const result = await prisma.employees.findMany({
    //   distinct: [req.query.column],
    //   select: {
    //     country: true
    //   },
    // })
    const result = await prisma.employees.groupBy({
      by: [req.query.column],
      _count: true,
    })
    const resultData = result.map((item) => ({ name: item.country, value: item._count }));
    // const resultCountry = resultData.reduce((total, item) => {
    //   total.push(item.name);
    //   return total;
    // }, []);
    return res.json(resultData);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});


// router.post("/doSomething", async (req, res) => {
//creante a new emloyees
// await sql`\COPY  Employees FROM '/tmp/data.csv' DELIMITER ',' CSV`

//change data
// await sql`UPDATE "Employees" SET name='Leo Yorkston' WHERE  id=1`
// })

export default router