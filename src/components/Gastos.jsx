import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from "../helpers";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";
import IconoSalud from "../img/icono_salud.svg";

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gasto: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

//SwipeableList para dar los estilos para borra los gastos

const Gastos = ({ gasto, setGastoEditar,eliminarGastos }) => {
  const { categoria, nombre, cantidad, fecha, id } = gasto;

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() =>  eliminarGastos(id) }
      destructive={true}
      >
        
        ELIMINAR
      </SwipeAction>
    </TrailingActions>
  );
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto) }>
         EDITAR
      </SwipeAction>
    </LeadingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra ">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto"> {nombre} </p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gastos;
