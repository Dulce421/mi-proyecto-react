import React, { useState } from 'react';

function Inicio() {
  // 1. Datos temporales iniciales para la tabla
  const [registros, setRegistros] = useState([
    { id: 1, nombre: 'Dulce María', correo: 'dulce@ejemplo.com', rol: 'Estudiante' },
    { id: 2, nombre: 'Aldo Álvarez', correo: 'aldo@ejemplo.com', rol: 'Docente' }
  ]);

  // Estado temporal para el formulario
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');

  // 2. Función para agregar un nuevo registro
  const agregarRegistro = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoCorreo) return;

    const nuevoItem = {
      id: registros.length + 1,
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      rol: 'Usuario'
    };

    setRegistros([...registros, nuevoItem]);
    setNuevoNombre('');
    setNuevoCorreo('');
  };

  // 3. Función para eliminar un registro
  const eliminarRegistro = (id) => {
    setRegistros(registros.filter((item) => item.id !== id));
  };

  return (
    <div className="text-start">
      {/* Alerta de confirmación */}
      <div className="alert alert-success shadow-sm mb-4" role="alert">
        ✨ <strong>Panel Principal:</strong> Componentes integrados y recibiendo datos correctamente.
      </div>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-12 col-md-5">
          <div className="card border-0 shadow-sm p-3 bg-light">
            <h4 className="text-danger mb-3">Registrar Datos ✍️</h4>
            <form onSubmit={agregarRegistro}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. María López"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Correo:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger w-100 fw-bold">
                ➕ Agregar a la Tabla
              </button>
            </form>
          </div>
        </div>

        {/* Tabla con datos temporales */}
        <div className="col-12 col-md-7">
          <h4 className="text-danger mb-3">Tabla de Registros 📋</h4>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle bg-white shadow-sm">
              <thead className="table-danger">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.correo}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarRegistro(item.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;