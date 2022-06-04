import React from 'react'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Admin = () => {
    const navigate = useNavigate()
    const [user,setUser]=React.useState(null)
    React.useEffect(()=>{
        //leer info usuario registrado
        if (auth.currentUser) {
            console.log("Existe usuario.")
            setUser(auth.currentUser)
        }else{
            console.log("No existe usuario.")
            navigate("/login")
        }
    },[navigate])
  return (
    <div>
        {
            user && (
                //<h3>Usuario: {user.email}</h3>
                <Registro user={user}/>
            )
        }
        
    </div>
  )
}

export default Admin