import { useState, useEffect } from "react";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import Header from "./components/Header";
import { Filtro } from "./components/Filtro";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./helpers";

function App() {
  //traer los gastos guardados en el localStorage
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? []),
  ]);

  //traer el presupuesto de localStorage
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsvalidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 100);
    }
  }, [gastoEditar]);

  // guarda el presupuesto en el localStorage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  // guarda el gastos en el localStorage

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  //Filtrar gastos por categoria
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  // verifica la informacion del localstorage para mostrar
  useEffect(() => {
    const presupuestoLs =
      Number(localStorage.getItem("presupuesto", presupuesto)) ?? 0;

    if (presupuestoLs > 0) {
      setIsvalidPresupuesto(true);
    }
  }, []);

  const handelNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar gasto
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //nuevo gasto
      gasto.id = generarId(); //generarId es importado para generar el id
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  //funcion para eliminar los gastos iterando por el id unico de cada gasto
  //con el filtre mostramos todos los id que sean diferente al que estamos eligiendo

  const eliminarGastos = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro setFiltro={setFiltro} filtro={filtro} />

            <ListadoGastos
              gastos={gastos}
              key={gastos.id}
              setGastoEditar={setGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handelNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
