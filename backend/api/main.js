import express from "express";
const router = express.Router();

import employees from "../src/routes/employees.js"
import charts from "../src/routes/charts.js"
import { checkJwt, checkScopes } from "../src/middlewares/auth.js";

router.get('/', (req, res) => {
    res.send("It is working!")
})

router.use('/employees', checkJwt, employees)
router.use('/charts', charts)

export default router