import jwt from "jsonwebtoken";
import { Company } from "../models/company.model.js";

export const protectionForCompany = async (req, res, next) => {
    try {

        const token = req.headers.token
        if(!token) { return res.json({ message: "Unauthorized ,Please login first", success: false }) }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.company = await Company.findById(decoded.id).select("-password")
        next()

    } catch (error) {
        console.log(error)
        res.json({ message: error.message, success: false })
    }
}