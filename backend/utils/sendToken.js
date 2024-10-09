//Criar token e salvar no cookie
export default (user, statusCode, res) => {

  //Criar JWT Token
  const token = user.getJwtToken()

  //Opções para cookies
  const options = {
    expirse: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),

    //httpOnly Só pode ser acessado no back-end
    httpOnly: true 
  }
  res.status(statusCode).cookie("token", token, options).json({
    token,
  })
}