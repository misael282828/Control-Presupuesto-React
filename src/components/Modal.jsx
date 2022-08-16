import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  // rellena los campos cuando editamos
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha)
    }
  }, []);

  const ocultalModal = () => {
    setAnimarModal(false);
    setGastoEditar({})//borrar vacial el state luego de editar setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const handelSumit = (e) => {
    e.preventDefault();

    if ([nombre, categoria, cantidad].includes("") || cantidad <= 0) {
      setMensaje("Todo los campos son necesarios ");

      setTimeout(() => {
        setMensaje("");
      }, 1500);
      setNombre("");
      setCantidad("");
      setCategoria("");
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="btn cerrar modal" onClick={ocultalModal} />
      </div>

      <form
        onSubmit={handelSumit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        {/* conficional para cambiar el nombre de la modal */}
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto </label>

          <input
            type="text"
            id="nombre"
            placeholder=""
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad </label>

          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto: ej. 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria </label>

          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gasto">Gasto</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadiar Gastos"}
        />
      </form>
    </div>
  );
};

export default Modal;
