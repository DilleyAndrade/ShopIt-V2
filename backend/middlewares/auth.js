import jwt  from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from '../models/user.js'
import catchAsyncError from "./catchAsyncError.js";

// Verificar se o usuário está autenticado ou não
export const isAuthenticatedUser = catchAsyncError( async(req, res, next) => {
  const { token } = req.cookies

  if(!token) {
    return next(new ErrorHandler('Login first to access this resource', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)

  next()
})