import { createUser } from '../models/usersModel.js'
import { findUserByEmail } from '../models/usersModel.js'
import jwt from 'jsonwebtoken'

export const getLoggedInUser = async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userEmail = decodedToken.email
    const user = await findUserByEmail({ email: userEmail })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Error al buscar el usuario:', error)
    res
      .status(500)
      .json({ message: 'Error en la solicitud de obtener el usuario actual' })
  }
}

export const createNewUser = async (req, res) => {
  try {
    const { user } = req.body
    const newUser = await createUser(user)
    res.status(201).json({ user: newUser })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(400).json({ mensaje: 'Error en la solicitud' })
  }
}
