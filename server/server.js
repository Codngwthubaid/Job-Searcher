import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { ConnectDB } from "./config/database.config.js"
import connectCloudinary from "./config/cloudinary.config.js"
import companyRoutes from "./routes/company.route.js"

import { clerkWebhooks } from "./controller/webhooks.controller.js"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/webhooks", clerkWebhooks)
app.use("/api/company", companyRoutes)


const PORT = process.env.PORT || 5000
await ConnectDB()
await connectCloudinary()
app.listen(PORT, () => {
    console.log(`Server is running on port at http://localhost:${PORT}`)
})

