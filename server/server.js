import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { clerkWebhooks } from "./controller/webhooks.controller.js"
import connectCloudinary from "./config/cloudinary.config.js"
import { ConnectDB } from "./config/database.config.js"

import companyRoutes from "./routes/company.route.js"
import jobsRoutes from "./routes/job.route.js"
import userRoutes from "./routes/user.route.js"
import { clerkMiddleware } from '@clerk/express'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.post("/webhooks", clerkWebhooks)
app.use("/api/company", companyRoutes)
app.use("/api/jobs", jobsRoutes)
app.use("/api/users", userRoutes)


const PORT = process.env.PORT || 5000
await ConnectDB()
await connectCloudinary()
app.listen(PORT, () => {
    console.log(`Server is running on port at http://localhost:${PORT}`)
})

