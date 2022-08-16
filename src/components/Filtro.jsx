import {useEffect, useState} from 'react'

export const Filtro = ({filtro, setFiltro}) => {


  return (
    <div className='sombra filtros contenedor '>

      <form >

          <div className="campo">

            <label >Filtrar Gastos</label>
            <select 
            
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            >

            <option value="">-- Todo las Categorias --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gasto">Gasto</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>



            </select>

          </div>

      </form>




    </div>
  )
}
