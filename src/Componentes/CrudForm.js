import React from 'react';
import "./form.css";

const CrudForm = ({handleChange,handleSubmit,form,dataToEdit}) => {
  return (
    <>
    <h3>{dataToEdit ? "Editar datos" : "Ingresar Datos" }</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" name="apellido" value={form.apellido} placeholder='Ingrese su Apellido' onChange={handleChange} required autoFocus/>
      <input type="text" name="nombre" value={form.nombre} placeholder='Ingrese su Nombre' onChange={handleChange} required/>
      <input type="number" name="edad" value={form.edad} placeholder='Edad' onChange={handleChange} required />
      <input type='submit' value={dataToEdit ? "GUARDAR" : "CARGAR"} />
      <input type="hidden" />
    </form>
    </>
  )
};
export default CrudForm;