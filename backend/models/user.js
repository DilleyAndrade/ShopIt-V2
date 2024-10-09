import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

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
      minLength: [6, 'Your password must be longer than 6 characteres '],
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

//Função para encriptar password no banco de dados antes de salvar o usuário (10 é o nível de encriptação)
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

//Retornar Json Web Token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRES_TIME
  })
}

//Comparar senha do usuário
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)