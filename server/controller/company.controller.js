import { Company } from "../models/company.model.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/generateToken.js"
import { Job } from "../models/job.model.js"
import { JobApplication } from "../models/jobApplications.model.js"

export const registerCompany = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !imageFile) { return res.status(400).json({ message: "Please fill all the fields", success: false }) }

        const companyExists = await Company.findOne({ email })
        if (companyExists) { return res.status(400).json({ message: "Company already exists", success: false }) }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imploadImage = await cloudinary.uploader.upload(imageFile.path, {
            folder: "CompanyLogo's"
        })

        const company = new Company({
            name,
            email,
            password: hashedPassword,
            image: imploadImage.secure_url
        })

        await company.save()
        res.status(200).json(
            {
                message: "Company registered successfully",
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

export const loginCompany = async (req, res) => {

    try {

        const { email, password } = req.body
        if (!email || !password) { return res.status(400).json({ message: "Please fill all the fields", success: false }) }

        const company = await Company.findOne({ email })

        if (await bcrypt.compare(password, company.password)) {
            res.status(200).json({
                message: "Company logged in successfully",
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        } else {
            res.status(400).json({ message: "Invalid email or password", success: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

export const postJobsData = async (req, res) => {

    try {

        const { title, description, location, salary, level, category, date, available } = req.body
        const companyId = req.company._id
        console.log(companyId)

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category,
            available
        })

        await newJob.save()
        res.json({ success: true, message: "Successfully added a new job", newJob })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

export const getCompanyData = async (req, res) => {

    try {

        const company = req.company
        if (!company) { return res.json({ success: false, message: "Company not found" }) }
        res.json({ success: true, message: "Successfully fetched company data", company })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const getCompanyPostedJobsData = async (req, res) => {

    try {
        const company = req.company._id
        const jobs = await Job.find({ companyId: company })

        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applications = await JobApplication.find({ jobId: job._id })
            return { ...job.toObject(), applications: applications.length }
        }))

        if (!jobs) { return res.json({ success: false, message: "No jobs found" }) }
        res.json({ success: true, message: "Successfully fetched company posted jobs", jobsData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const changeAvailabilityOfPostedJob = async (req, res) => {

    try {
        const { id } = req.body
        const companyId = req.company._id

        const job = await Job.findById(id)
        if (!job) return res.json({ success: false, message: "Job not found" })

        if (job.companyId.toString() === companyId.toString()) {
            job.available = !job.available
            await job.save()
            res.json({ success: true, message: "Successfully changed availability of job", job })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


export const getCompanyJobApplicationsData = async (req, res) => {

    try {

        const companyId = req.company._id
        const applications = await JobApplication.find({ companyId })
            .populate("userId", "name image resume")
            .populate("jobId", "title location category level salary")
            .populate("companyId", "email name image")
            .exec()

        res.json({ success: true, message: "Successfully fetched company job applications", applications })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}



export const changeJobApplicationStatus = async (req, res) => {
    try {

        const { id, status } = req.body
        const applicationStatus = await JobApplication.findByIdAndUpdate(id, { status })
        res.json({ success: true, message: "Successfully changed job application status", applicationStatus })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

