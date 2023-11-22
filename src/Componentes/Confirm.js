import React from 'react';
import './confirm.css';

const Confirm = ({setBorrardata}) => {
 
  return (
    <>
      <div className="contenedorConfirm">        
          <p>¿Esta seguro de eliminar el registro seleccionado?</p>
          <button className="btn" onClick={() => setBorrardata(true)} >SI</button>
          <button className="btn" onClick={() => setBorrardata(false)}>NO</button>         
        
         </div>
    </>
  )
}
export default Confirm;