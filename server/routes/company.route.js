import { Router } from "express"
import {
    changeAvailabilityOfPostedJob,
    changeJobApplicationStatus,
    getCompanyData,
    getCompanyJobApplicationsData,
    getCompanyPostedJobsData,
    loginCompany,
    postJobsData,
    registerCompany
} from "../controller/company.controller.js"
import upload from "../config/multer.config.js"

const router = Router()

router.post("/register", upload.single("image") , registerCompany)
router.post("/login", loginCompany)
router.get("/company", getCompanyData)
router.post("/post-job", postJobsData)
router.get("/company-posted-jobs", getCompanyPostedJobsData)
router.post("/change-job-application-status", changeJobApplicationStatus)
router.post("/change-availability-of-posted-job", changeAvailabilityOfPostedJob)
router.get("/company-job-applications", getCompanyJobApplicationsData)


export default router