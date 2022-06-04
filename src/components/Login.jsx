import React from 'react'
import { db, auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [modoRegistro, setModoRegistro]=React.useState(true)
    const [email, setEmail]=React.useState("")
    const [pass, setPass]=React.useState("")
    const [error, setError]=React.useState(null)
    const navigate=useNavigate()

    //guardar los datos
    const guardarDatos=(e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError("Ingrese un Email")
            return
        }
        if (!pass.trim()) {
            setError("Ingrese la Contraseña")
            return
        }
        if (pass.length<6) {
            setError("Su contraseña debe tener mínimo 6 carácteres.")
            return            
        }
        setError(null)
        if (modoRegistro) {
            registrar()            
        }else{
            Login()
        }
    }
    const Login=React.useCallback(async()=>{
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail("")
            setPass("")
            setError(null)
            navigate("/admin")
        } catch (error) {
            console.log(error)
            if (error.code==="auth/invalid-email") {
                setError("Email no válido.")
            }
            if (error.code==="auth/user-not-found") {
                setError("Email no registrado.")
            }
            if (error.code==="auth/wrong-password") {
                setError("Contraseña incorrecta.")
            }
        }
    },[email,pass])
    const registrar=React.useCallback(async()=>{
        try {
            const res= await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection("usuariosdb").doc(res.user.email).set(
                {
                    email: res.user.email,
                    id: res.user.uid
                }
            )
            await db.collection(res.user.uid).add()
            setEmail("")
            setPass("")
            setError(null)
            navigate("/admin")
        } catch (error) {
            console.log(error)
            if (error.code==="auth/invalid-email") {
                setError("Email no válido.")
            }
            if (error.code==="auth/email-already-in-use") {
                setError("Este Email ya ha sido registrado.")
            }
        }
    },[email,pass,navigate])
  return (
    <div>
        <h3 className='text-center'>
            {
                modoRegistro ? "Registro de usuario": "Login"
            }
        </h3>
        <div className="row justify-content-center"></div>
        <div className="col-12 col-sm-10 col-md-6 col-xl-4"></div>
        <form onSubmit={guardarDatos}>
            {
                error ? (<div className="alert-danger">{error}</div>): null
            }
            <input type="email" className='form-control mb-3' placeholder='Ingrese su Email' 
            onChange={e=>setEmail(e.target.value)} value={email}></input>
            <input type="password" className='form-control mb-3' placeholder='Ingrese su Contraseña' 
            onChange={e=>setPass(e.target.value)} value={pass}></input>
            <div className='d-grid gap-2'>
            <button className="btn btn-dark">
                {
                    modoRegistro ? "Registrarse": "Acceder"
                }
            </button>
            <button className="btn btn-primary" type="button" onClick={()=>{setModoRegistro(!modoRegistro)}}>
                {
                    modoRegistro ? "¿Ya está registrado?": "¿No tienes cuenta?"
                }
            </button>
            </div>
        </form>
    </div>
  )
}

export default Login