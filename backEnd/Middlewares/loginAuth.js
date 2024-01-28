import jwt from 'jsonwebtoken'

const loginAuth = async (req, res, next) => {
  try {
    headerValidation(req, res)
    const token = req.header('Authorization').split(' ')[1]
    const data = await validateToken(token)
    req.user = data
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en la auth' })
  }
}

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    console.error(error)
    throw new Error('Error interno, Token no válido')
  }
}

const headerValidation = (req) => {
  if (!req.header('Authorization')) {
    throw new Error('Error interno, Token no encontrado')
  }
}

export { loginAuth }
