import express from "express";
const router = express.Router();
import { getColumnAndCount, getUniqueFields } from "../controllers/charts.js";

router.get("/get_unique_fields", getUniqueFields);

router.get("/get_column_and_count", getColumnAndCount);

export default router