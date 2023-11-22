import React from 'react';

  const Error = ({error}) => {
  console.log(error)  
  return (
    <div className="error">
      <h3>Error {error.status} : {error.statusText}</h3>
    </div>    
  )
}
export default Error;