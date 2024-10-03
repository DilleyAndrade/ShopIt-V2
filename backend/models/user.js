import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'Your name cannot exceed 50 characteres ']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      maxLength: [50, 'Your email cannot exceed 50 characteres '],
      //Denifinir que só pode haver um usuário com esse email
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      mixLength: [6, 'Your password must be longer than 6 characteres '],
      //Não enviar a senha na resposta da requisição aumentando a segurança
      select: false
    },
    avatar: {
      public_id: String,
      url: String
    },
    role: {
      type: String,
      default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {timestamps: true}
)

export default mongoose.model('User', userSchema)