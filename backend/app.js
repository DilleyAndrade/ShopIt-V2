import express from 'express'
import dotenv from'dotenv'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/product.js'
import authRoutes from './routes/auth.js'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'


process.on("uncaughtException", (err) =>{
  console.log(`ERROR: ${err}`)
  console.log("Shutting down server due to uncaught exception")
  process.exit(1)
})

const app = express()

dotenv.config({ path: "backend/config/config.env" })

connectDatabase()

app.use(express.json())

app.use(cookieParser()) //Para acessar a solicitação dos cookies

app.use("/api/v1", productRoutes)

app.use("/api/v1", authRoutes)

app.use(errorMiddleware)

const server = app.listen(process.env.PORT, ()=> {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})

process.on("unhandledRejection", (err) =>{
  console.log(`ERROR: ${err}`)
  console.log("Shutting down server due to Unhandled Promise Rejection")
  server.close(()=>{
    process.exit(1)
  })
})