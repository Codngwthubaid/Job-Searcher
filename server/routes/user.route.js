import { Router } from "express";
import { getUserAppliedForJobsData, getUserData, getUserJobApplicationsData, updateUserResume } from "../controller/user.controller.js";
import upload from "../config/multer.config.js";

const router = Router()

router.get("/userData" , getUserData)
router.post("/applyForJob", getUserAppliedForJobsData)
router.get("/applications", getUserJobApplicationsData)
router.post("/updateResume", upload.single("resume"), updateUserResume)


export default router