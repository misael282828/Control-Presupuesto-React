import React from "react";
import Gastos from "./Gastos";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGastos,
  filtro,
  gastosFiltrados,
}) => {
  return (
    //se muestra cuando se llena el formulario de gastos
    <div className="listado-gastos contenedor">
      

      {/* condicionales para mostrar los gastos cuando se aplica los filtos. */}

      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos"
              : "No hay Gasto en esta categoria "}
          </h2>

          {gastosFiltrados.map((gasto) => {
            return (
              <Gastos
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "Agrega Nuevos Gastos "}</h2>

          {gastos.map((gasto) => {
            return (
              <Gastos
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
