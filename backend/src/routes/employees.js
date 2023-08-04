import express from "express";
const router = express.Router();
import { createEmployee, editEmployeeData, getEmployees } from "../controllers/employees.js";

router.get('/get_employees', getEmployees)

router.post("/create_employee", createEmployee);

router.post("/edit_employee_data", editEmployeeData);


// router.post("/doSomething", async (req, res) => {
//creante a new emloyees
// await sql`\COPY  Employees FROM '/tmp/data.csv' DELIMITER ',' CSV`

//change data
// await sql`UPDATE "Employees" SET name='Leo Yorkston' WHERE  id=1`
// })

export default router