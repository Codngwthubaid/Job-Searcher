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
router.post("/postJob", protectionForCompany, postJobsData)
router.get("/getCompanyData", protectionForCompany, getCompanyData)
router.get("/getCompanyPostedJobs", protectionForCompany, getCompanyPostedJobsData)
router.post("/getChangeAvailabilityOfPostedJob", protectionForCompany, changeAvailabilityOfPostedJob)
router.get("/getCompanyJobApplications", protectionForCompany, getCompanyJobApplicationsData)
router.post("/getChangeJobApplicationStatus", protectionForCompany, changeJobApplicationStatus)


export default router