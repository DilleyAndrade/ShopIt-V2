import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from '../models/user.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from "../utils/sendToken.js";


//Register User
export const registerUser = catchAsyncError( async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
  })

  sendToken(user, 201, res)
})

//login User
export const loginUser = catchAsyncError( async (req, res, next) => {
  const { email, password } = req.body

  if(!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400))
  }

  //Procurar usuário no banco de dados
  const user = await User.findOne({ email }).select("+password")

  if(!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  //Verificar se o password está correto
  const isPasswordMatched = await user.comparePassword(password)
  if(!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  sendToken(user, 200, res)
})