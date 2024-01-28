import { findUserByEmail } from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
  const { user } = req.body

  try {
    const foundUser = await findUserByEmail(user)
    if (!foundUser) {
      return res.status(400).json({ message: 'Usuario no encontrado' })
    } else {
      const isPasswordValid = bcrypt.compareSync(
        user.password,
        foundUser.password
      )
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Contraseña inválida' })
      } else {
        const { email } = foundUser
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        })
        res.status(200).json({
          message: `Bienvenido, ${email}, has iniciado sesión`,
          code: 200,
          token,
        })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en la solicitud de login' })
  }
}
