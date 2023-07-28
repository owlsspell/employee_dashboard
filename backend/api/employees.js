import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
import dayjs from "dayjs";
import _ from "lodash"
const prisma = new PrismaClient();

router.get('/', (req, res) => {
  res.send("It is working!")
})

router.get('/getEmployees', async (req, res) => {
  const employees = await prisma.employees.findMany({
    // orderBy: [{ date: "asc" }]
  })
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
  // console.log(req.query.column);
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
      // orderBy: [
      //   { [req.query.column]: "asc" }
      // ]
    })
    const resultData = result.map((item) => ({ name: item[req.query.column], value: item._count }));
    // const resultCountry = resultData.reduce((total, item) => {
    //   total.push(item.name);
    //   return total;
    // }, []);
    return res.json(resultData);

  } catch (err) {
    return res.status(404).send(err.message);
  }
});


router.get("/getColumnAndCount", async (req, res) => {
  try {
    const result = await prisma.employees.findMany({
      // distinct: [req.query.column],
      select: {
        date: true
      },
      orderBy: [
        {
          date: 'asc',
        },
      ],
    })
    // const result = await prisma.employees.groupBy({
    // by: [req.query.column],
    // _count: true,
    // orderBy: [
    //   { [req.query.column]: "asc" }
    // ]
    // })
    const rowArr = result.reduce((acc, item) => { acc.push(dayjs(Number(item.date)).format("YYYY-MM-DD")); return acc }, [])
    // console.log(_.countBy(rowArr));
    const counts = _.countBy(rowArr)
    console.log('counts', counts);
    const timeArr = Object.keys(counts).map(key => ([key, counts[key]]));
    // const timeArr = Object.keys(counts).map(key => ([dayjs(key).unix(), counts[key]]));

    return res.json({ timeArr });
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