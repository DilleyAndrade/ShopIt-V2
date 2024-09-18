import express from 'express'
import dotenv from'dotenv'
import productRoutes from './routes/product.js'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'

const app = express()

dotenv.config({ path: "backend/config/config.env" })

connectDatabase()

app.use(express.json())

app.use("/api/v1", productRoutes)

//Use error middleware
app.use(errorMiddleware)

app.listen(process.env.PORT, ()=> {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})