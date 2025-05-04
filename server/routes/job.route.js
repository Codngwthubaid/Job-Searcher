import { Router } from "express";
import { getAllJobs, getJobsById } from "../controller/job.controller.js";

const router = Router()

router.get("/" ,getAllJobs)
router.get("/:id",getJobsById)


export default router   