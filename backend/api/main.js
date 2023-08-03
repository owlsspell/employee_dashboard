import express from "express";
const router = express.Router();

import employees from "../src/routes/employees.js"
import charts from "../src/routes/charts.js"

router.use('/employees', employees)
router.use('/charts', charts)

export default router