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
import { protectionForCompany } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/register", upload.single("image"), registerCompany)
router.post("/login", loginCompany)
router.get("/company", protectionForCompany, getCompanyData)
router.post("/post-job", protectionForCompany, postJobsData)
router.get("/company-posted-jobs", protectionForCompany, getCompanyPostedJobsData)
router.post("/change-job-application-status", protectionForCompany, changeJobApplicationStatus)
router.post("/change-availability-of-posted-job", protectionForCompany, changeAvailabilityOfPostedJob)
router.get("/company-job-applications", protectionForCompany, getCompanyJobApplicationsData)


export default router