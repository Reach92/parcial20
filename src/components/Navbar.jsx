import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'

const Navbar = (props) => {
    const navigate = useNavigate()

    const cerrarSesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate("/Login")
        })
    }
  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className="navbar-brand" to="/">Login</Link>
        <div>
            <div className='d-flex'></div>
            <Link to="/" className='btn btn-dark mr-3'>Inicio</Link>
            {
                props.firebaseUser !== null ? (
                    <Link to="/Admin" className='btn btn-dark mr-3'>Admin</Link>
                ): null
            }
            
            {
                props.firebaseUser !== null ? (
                    <button className='btn btn-dark mr-3'
                    onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
                ):(<Link to="/Login" className='btn btn-dark mr-3'>Login</Link>)
            }
            
        </div>

    </div>
  )
}

export default Navbar