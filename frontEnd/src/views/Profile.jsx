import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

/* const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')

    console.log(token)

    axios
      .get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response: { data } }) => {
        console.error(data)
        window.sessionStorage.removeItem('token')
        setDeveloper(null)
        navigate('/')
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper.email}</span>
      </h1>
      <h3>
        {getDeveloper.rol} en {getDeveloper.lenguage}
      </h3>
    </div>
  )
}

export default Profile */

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)
  console.log(getDeveloper)

  const getDeveloperData = async () => {
    const token = window.sessionStorage.getItem('token')
    try {
      const response = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log('Respuesta completa:', response.data.user)

      const { user } = response.data

      console.log(user)

      setDeveloper(user)
    } catch (error) {
      console.error(error.response?.data || error.message)
      window.sessionStorage.removeItem('token')
      setDeveloper(null)
      navigate('/')
    }
  }

  useEffect(() => {
    getDeveloperData()
  }, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper.email}</span>
      </h1>
      <h3>
        {getDeveloper.rol} en {getDeveloper.lenguage}
      </h3>
    </div>
  )
}

export default Profile
