import React,{ useState, useEffect } from 'react';
import CrudForm from "./CrudForm";
import CrudList from "./CrudList";
import Confirm from "./Confirm.js";
import Error from './Error';
import "./micrud.css";
const MiCrud = () => {
  const [db, setDb] = useState([]);
  const [error, setError] = useState("");
  const [dataToEdit, setDataToEdit] = useState(false)
  const [delConfirm, setDelConfirm] = useState(false)

 

  // creo un estado form que es un objto para poner los valores del form.
  const [form,setForm] = useState({
    id:"",
    apellido:"",
    nombre:"",
    edad:""
  })

  let url ="http://localhost:5000/datos";

  useEffect(() => {
    const datafech = async () => {
        try {
          const res = await fetch(url);
          if(!res.ok){
            const dataError = {
              status: res.status || "00",
              statusText: res.statusText || "Error de servidor"
            }
            throw dataError
          }
            const data = await res.json();             
            setDb(data)          
        }catch(err){
          setError(err)
          let msj = `Error: ${err.status} / ${err.statusText}`;
          console.log(msj)
        }
    }
    datafech()
  },[url])
  
  // Obtengo los datos del formulario y lo guardo en la variable form.
  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    })
    
  }
  
  const handleEdit = (e) => {
    setDataToEdit(true)
  
    let id = parseFloat(e.target.dataset.id)
    let filtro = db.filter(e => e.id === id)
    form.id = id
    form.apellido = filtro[0].apellido
    form.nombre = filtro[0].nombre
    form.edad = filtro[0].edad
   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(dataToEdit === true){  // si es true edita el registro      
      try {

        let options = {
          method:'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }

        let id = form.id
        //let endpoint = `http://localhost:5000/datos/${id}`
        
        const res = await fetch(`${url}/${id}`,options);
          //console.log(res)
          if(!res.ok){
            const dataError = {
              status: res.status || "00",
              statusText: res.statusText || "Error en el servidor"
            }
            throw dataError;
          }
          //Crea una variable actualizada, recorre la base de datos, cuando encuentra el id correspondiente
          let newDate = db.map(el => el.id === form.id ? form : el);
          setDb(newDate)
      }catch(err){
          setError(err)
          let msg = `Error: ${err.status} / ${err.statustext}`;
          console.log(msg)
      }
      
      setDataToEdit(false)
      setForm({
        id:"",
        apellido:"",
        nombre:"",
        edad:""
      })
    
     
//-------------------------------FIN EDITo DATA------------------------------------------------------------
    }else {

    try {
      form.id = Date.now()
      const options = {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(form)
      }
      const respuesta = await fetch(url, options);
            // crea un error por si hay algun problema en el servidor
          if(!respuesta.ok){
              const dataError = {
                status:respuesta.status || "00",
                statusText: respuesta.statusText || "Error del servidor"
              }
              throw dataError
          }
       // guarda en el estado el nuevo registro para mostrarlo en pantalla 
      setDb([
        ...db,form
      ])
      
          if(respuesta.ok){
            
            setForm({
              id:"",
              apellido:"",
              nombre:"",
              edad:""
            })
          }else {
            alert("No se cargaron los datos")
          }
    }catch(err) {
      setError(err)
      let msj = `Error: ${err.status} / ${err.statusText}`;
      console.log(msj)
    }
  }
  }



  const handleDelete = async (e) => {

  let isDelete = window.confirm("¿Esta seguro de eliminar el registro?");
          
        if(isDelete) {
          let id = parseFloat(e.target.dataset.id)
    const filtro = db.filter(e => e.id !== id)
    setDb(filtro)
    
    let url = `http://localhost:5000/datos/${id}`
    let options = {
      method: 'DELETE',
      headers: { "Content-type": "application/json" }
    }
    try {
      const res = await fetch(url, options);
       if(!res.ok) {
        let dataError = {
          status: res.status || "00",
          statusText: res.statusText || "Error del servidor"
        }
        throw dataError
       }
   }catch(err){
        setError(err)
        let msg = `Error: ${err.status} / ${err.statusText}`;
        console.log(msg)
    }
        }else{
          
          return;
        }  
  }

  useEffect(() => {
    // Crear una copia de la base de datos
    const sortedDb = [...db];
  
    // Ordenar alfabeticamente por apellido
    sortedDb.sort((a, b) => {
      if (a.apellido < b.apellido) {
        return -1;
      }
      if (a.apellido > b.apellido) {
        return 1;
      }
      return 0;
    });
  
    // Actualizar el estado solo si los datos ordenados son diferentes a db
    if (JSON.stringify(sortedDb) !== JSON.stringify(db)) {
      setDb(sortedDb);
    }
  }, [db]);
  

  return (
    <>
      <h1>Mi Crud Fetch en React</h1>
      { delConfirm && <Confirm />}
      <div className="contenedor">
      
        <div className="formulario">
         <CrudForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}            
            form={form}
            dataToEdit={dataToEdit}
          />
        </div>
        <div className="verDatos">
          <h3>Informacion</h3>
          { !db.length && <h3>Registro vacio</h3>}
            {
              error ? <Error error={error}/> : db.map(e =>  <CrudList handleDelete={handleDelete} data={e} key={e.id}  handleEdit={handleEdit}/> )
            }
        </div>
      </div>
    </>
  )
};
export default MiCrud;