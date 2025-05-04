import { Company } from "../models/company.model.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/generateToken.js"

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

        if (bcrypt.compare(password, company.password)) {
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

export const getCompanyData = async (req, res) => { }

export const postJobsData = async (req, res) => { }

export const getCompanyJobApplicationsData = async (req, res) => { }

export const getCompanyPostedJobsData = async (req, res) => { }

export const changeJobApplicationStatus = async (req, res) => { }

export const changeAvailabilityOfPostedJob = async (req, res) => { }

