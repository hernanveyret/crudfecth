import React from "react";
import "./crudList.css";

const CrudList = ({data,handleDelete,handleEdit}) => {
  const {id,apellido,nombre,edad} = data // Destructuracion del objeto


  return (
    <>
      <div className="contenedorLista" key={id}>       
          <p>Apellido: {apellido} / Nombre: {nombre} / Edad: {edad}</p>
          <nav>
          <button onClick={handleEdit} data-id={id}>🖊️</button>
          <button onClick={handleDelete} data-id={id}>🗑️</button>
          </nav> 
      </div>
    </>
  )
};
export default CrudList;