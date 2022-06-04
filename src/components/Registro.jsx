import React, {useState} from 'react'
import { db } from '../Firebase'

const Registro = (props) => {  
    const [nombre,setNombre]=React.useState('')
    const [apellido,setApellido]=React.useState('') 
    const [categoria,setCategoria]=React.useState('')
    const [tipo,setTipo]=React.useState('')
    const [descripcion,setDescripcion]=React.useState('')
    const [ubicacion,setUbicacion]=React.useState('')
    const [id,setId]=React.useState('')    
    const [fecha, setFecha]= useState (new Date().toLocaleDateString())
    const [lista,setLista]=React.useState([])
    const [modoEdicion,setModoEdicion]=React.useState(false)
    const [error,setError]=React.useState(null)
    /* const categorias = [
        {
            "categoria" : "Mantenimiento Inmuebles",
            "tipos" : ["Baños","Cielo raso","Eléctrico","Pared","Puerta"]
        },
        {
            "categoria" : "Mantenimiento Muebles",
            "tipos" : ["Aire acondicionado","Archivador","Puesto de trabajo","Silla"]
        },
        {
            "categoria" : "Servicios",
            "tipos" : ["Aseo","Transporte","Vigilancia"]
        }
    ] */
    React.useEffect(()=>{
      const obtenerDatos = async()=>{
        try {
          
          const data = await db.collection(props.user.email).get()
          /* console.log(data.docs); */
          const arrayData = data.docs.map(doc=>({id:doc.id,...doc.data()}))
          console.log(arrayData);
          setLista(arrayData);
        } catch (error) {
          console.log(error);
        }
      }
      obtenerDatos()
    },[])
    //guardardatos
    const guardarDatos = async (e)=>{
      e.preventDefault()    
      if(!nombre.trim()){
        setError('Ingrese el nombre')
        return
      }
      if(!apellido.trim()){
        setError('Ingrese el apellido')
        return
      }
      try {
        
        const nuevoUsuario={
          nombre, apellido, categoria, tipo, descripcion, ubicacion, fecha
        }
        const dato = await db.collection(props.user.email).add(nuevoUsuario)
        setLista([
          ...lista,
          {...nuevoUsuario,id:dato.id}
        ])
        
      } catch (error) {
        console.log(error)
        
      }     
       //limpiar estados
       setNombre('')
       setApellido('')
       setCategoria("")
       setTipo("")
       setDescripcion("")
       setUbicacion("")     
       setError(null)    
    }
    const eliminarDato = async (id)=>{
      try {
        
        await db.collection(props.user.email).doc(id).delete()
        const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
        setLista(listaFiltrada)
      } catch (error) {
        console.log(error)
        
      }
      
      const editar = (elemento)=>{
          setModoEdicion(true)
          setNombre(elemento.nombre)
          setApellido(elemento.apellido)
          setId(elemento.id)
      }

      
  }
    return (
      <div className="container">
        <h2 className="text-center">{
           modoEdicion ? 'Editar Usuario': 'Registro de Solicitudes'}</h2>
        {/*primera fila para el formulario*/}
        <div className="row">
          <div className="col-12">
            <form onSubmit={/* modoEdicion ? editarDatos : */ guardarDatos}>
              {/*mensaje error */}
              {
                error ? (
                  <div className="alert alert-danger" role="alert">
                {error}
              </div>
                ):
                null
              }
              {/*input nombre */}
              <input type="text" 
              placeholder="Ingrese el Nombre"
              className="form-control mb-3"
              onChange={(e)=>{setNombre(e.target.value)}}
              value={nombre}
              />
              {/*input nombre */}
              <input type="text" 
              placeholder="Ingrese el Apellido"
              className="form-control mb-3"
              onChange={(e)=>{setApellido(e.target.value)}}
              value={apellido}
              />
              {/* <div>
                  <label>Categorías</label>
                  <select name="categorias" id="selCategorias" ></select>
                  <option value={-1}>Seleccione una opción</option>
                  {
                      categorias.map((item, i)=>(
                          <option key={"categoria"+i} value={i}>{item.categoria}</option>
                      ))
                  }
              </div> */}
              <div>
              <label>Categoría principal</label>
              <select onChange={(e)=>{setCategoria(e.target.value)}}
              className='form-control mb-3'
              value={categoria}>                  
                  <option value="Mantenimiento Inmuebles">MANTENIMIENTO INMUEBLES</option>
                  <option value="Mantenimiento Muebles">MANTENIMIENTO MUEBLES</option>
                  <option value="Servicios">SERVICIOS</option>
              </select>
              <label>Tipo de servicio</label>
              <select onChange={(e)=>{setTipo(e.target.value)}}
              className='form-control mb-3'
              value={tipo}>
                  <hr/>                  
                  <option value="Baños">BAÑOS</option>
                  <option value="Cielo Raso">CIELO RASO</option>
                  <option value="Eléctrico">ELECTRICO</option>
                  <option value="Pared">PARED</option>
                  <option value="Puerta">PUERTA</option>
                  <hr/>
                  <option value="Aire acondicionado">AIRE ACONDICIONADO</option>
                  <option value="Archivador">ARCHIVADOR</option>
                  <option value="Puesto de trabajo">PUESTO DE TRABAJO</option>
                  <option value="Silla">SILLA</option>
                  <hr/>
                  <option value="Aseo">ASEO</option>
                  <option value="Transporte">TRANSPORTE</option>
                  <option value="Vigilancia">VIGILANCIA</option>
              </select>
              </div> 
              <div className="form-control mb-3">
                <label className="form-label">Descripción de solicitud</label>
                <input type="text" 
                 placeholder="Ingrese la descripción"
                className="form-control mb-3"
                onChange={(e)=>{setDescripcion(e.target.value)}}
                value={descripcion}
                />
                </div>
                <div className="form-control mb-3">
                <label className="form-label">Ubicación del servicio</label>
                <input type="text" 
                placeholder="Ingrese la ubicación"
                className="form-control mb-3"
                onChange={(e)=>{setUbicacion(e.target.value)}}
                value={ubicacion}
                />
                </div>  
                <div className='form-control mb-3'>
                    <label>Fecha: </label>
                    <input type="date" onChange={(e)=>{setFecha(e.target.value)}}
                    value={fecha}></input>
                </div>
                            
                              
              {/*boton agregar*/}
              <div className="d-grid gap-2">
                {
                  modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                  : <button className="btn btn-outline-info mb-3" type="submit">Agregar</button>
                }
              </div>
            </form>
          </div>
        </div>
        <hr/ >
        <div className="row">
          <div className="co-12"></div>
          <h4 className="text-center">Solicitudes</h4>
            <ul className="list-group">
            {         
                lista.map((elemento)=>(
                  <li className="list-group-item" key={elemento.id}><span className="lead">
                      Nombre: {elemento.nombre}, Apellido: {elemento.apellido}, Categoria: {elemento.categoria}, <br/> Tipo: {elemento.tipo},  
                    Descripción: {elemento.descripcion}, Ubicación: {elemento.ubicacion}, Fecha: {elemento.fecha}
                    </span>
                    <button className="btn btn-success btn-sm mx-2 float-end"
                    //onClick={()=>editar(elemento)} 
                    >Editar</button>
                    <button className="btn btn-danger btn-sm mx-2 float-end"
                    onClick={()=>eliminarDato(elemento.id)}
                    >Eliminar</button>
                  </li>
                ))                          
            }
            </ul>
        </div>
      </div>
    );
}

export default Registro