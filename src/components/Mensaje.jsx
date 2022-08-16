import React from 'react'

const Mensaje = ( {children, tipo} ) => {
  return (

      // alerta es una clase clarada en css
      // tipo es una variable dinamica

    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje