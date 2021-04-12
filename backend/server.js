import express from "express"

import connectDB from "./db.js"
import router from "./routes/Router.js"
import cors from "cors"

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", router)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port PORT ` + PORT))
