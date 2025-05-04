import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplications.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary"


// export const getUserData = async (req, res) => {

//     try {
//         const userId = req.auth.userId
//         console.log(userId)
//         const user = await User.findById(userId)
//         if (!user) return res.json({ success: false, message: "User not found" })
//         res.json({ success: true, message: "Successfully fetched user data", user })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

export const getUserData = async (req, res) => {
    try {
        console.log("Auth object:", req.auth);
        const userId = req.auth?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Successfully fetched user data", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getUserAppliedForJobsData = async (req, res) => {

    try {
        const { jobId } = req.body
        const userId = req.auth.userId

        const isAllreadyApplied = await JobApplication.findOne({ userId, jobId })
        if (isAllreadyApplied.length > 0) return res.json({ success: false, message: "You have already applied for this job" })
        else {
            const job = await Job.findById(jobId)
            if (!job) return res.json({ success: false, message: "Job not found" })
            else {
                const newJobApplication = new JobApplication({
                    jobId,
                    userId,
                    date: Date.now(),
                    status: "Pending",
                    companyId: job.companyId
                })
                await newJobApplication.save()
                res.json({
                    success: true,
                    message: "Successfully applied for job",
                    newJobApplication
                })
            }
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const getUserJobApplicationsData = async (req, res) => {

    try {

        const userId = req.auth.userId
        const jobApplications = await JobApplication.find({ userId })
            .populate("companyId", "email name image")
            .populate("jobId", "title description location salary level category")
            .exec()

        if (!jobApplications) return res.json({ success: false, message: "No job applications found for this user" })

        res.json({ success: true, message: "Successfully fetched user job applications", jobApplications })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const updateUserResume = async (req, res) => {

    try {
        const userId = req.auth.userId
        const resumeFile = req.resumeFile
        const user = await User.findById(userId)
        if (!user) return res.json({ success: false, message: "User not found" })
        else {
            const resumeUploadOnCloudinary = await cloudinary.uploader.upload(resumeFile)
            user.resume = resumeUploadOnCloudinary.secure_url
            await user.save()
            res.json({ success: true, message: "Successfully uploaded resume", user })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}