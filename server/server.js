import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { ConnectDB } from "./config/database.js"
import { clerkWebhooks } from "./controller/webhooks.controller.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/webhooks" , clerkWebhooks)

const PORT = process.env.PORT || 5000


await ConnectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port at http://localhost:${PORT}`)
})

