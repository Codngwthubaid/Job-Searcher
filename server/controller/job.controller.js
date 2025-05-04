import { Job } from "../models/job.model.js"

export const getAllJobs = async (_, res) => {
    try {

        const jobs = await Job.find({ available: true }).populate({ path: "companyId", select: "-password" })
        res.json({ success: true, message: "Successfully fetched all jobs", jobs })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export const getJobsById = async (_, res) => {

    try {
        const { id } = req.params

        const job = await Job.findById({ id })
        if (!job) return res.status(404).json({ success: false, message: "Job not found" })
        else res.json({ success: true, message: "Successfully fetched job", job })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}