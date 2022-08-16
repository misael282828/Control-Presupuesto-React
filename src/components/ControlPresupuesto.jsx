import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ 
  presupuesto,
  setPresupuesto, 
  gastos,
  setGastos,
  setIsvalidPresupuesto }) => {
  
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    //calcular porcentaje gastado 
    const nuevoPorcentaje = ( ( ( presupuesto - totalDisponible) / presupuesto ) * 100 ).toFixed(2)

    
    setGastado(totalGastado);
    setDisponible(totalDisponible);

    //motras animacion de porcentaje 
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1000);

  }, [gastos]);

  const formatearCantidada = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency", 
      currency: "USD",
    });
  };

  const handelResetApp = () => { 
    
    const resultado = confirm('¿Deseas eliminar Presupuesto y Gastos ?')
    
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsvalidPresupuesto(false)
      
    }


 }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
        styles={buildStyles ({
          pathColor: porcentaje > 100 ? '#DC2626': '#3B82F6',
          trailColor: '#F5F5F5',
          textColor: porcentaje > 100 ? '#DC2626': '#3B82F6',
        })}
        
        value={porcentaje}
         text={`${porcentaje}% Gastado`}
        
        />
        
      </div>

      <div className="contenido-presupuesto">

        <button className="reset-app"
        type="button"
        onClick={handelResetApp}>
          Resetear App
        </button>



        <p>
          <span>Presupuesto: </span> {formatearCantidada(presupuesto)}
        </p>

        <p className=  { `${disponible < 0 ? 'negativo' : '' } `}>
          <span>Disponible: </span> {formatearCantidada(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidada(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
