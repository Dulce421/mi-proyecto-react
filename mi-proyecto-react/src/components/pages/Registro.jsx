import React, { useState } from 'react';

function Registro() {
  // 1. Configurar la dirección del backend / API
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // Datos de ejemplo iniciales (incluyendo tus datos)
  const [listado, setListado] = useState([
    { id: 1, name: 'Dulce María', email: 'dulce@ejemplo.com', role: 'Alumna' },
    { id: 2, name: 'Aldo Álvarez Jurado', email: 'aldo@ejemplo.com', role: 'Profesor' }
  ]);

  // Estados para el formulario
  const [idEditando, setIdEditando] = useState(null); // Saber si estamos editando
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('Alumna');

  // Estados para avisos y mensajes (Punto 3 y 7)
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // 2 y 6. Función principal para Crear (POST) o Editar (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');
    setCargando(true);

    try {
      if (idEditando) {
        // --- 6. Enviar modificaciones mediante PUT ---
        const respuesta = await fetch(`${API_URL}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nombre, email: correo, role: rol }),
        });

        if (!respuesta.ok) throw new Error('Error al actualizar en el backend');

        // 4. Actualizar automáticamente el listado local
        setListado(listado.map(item => 
          item.id === idEditando 
            ? { ...item, name: nombre, email: correo, role: rol }
            : item
        ));

        // 3. Confirmación exitosa
        setMensajeExito('¡Registro actualizado exitosamente con PUT! ✨');
        setIdEditando(null);
      } else {
        // --- 2. Enviar los datos mediante POST ---
        const respuesta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nombre, email: correo, role: rol }),
        });

        if (!respuesta.ok) throw new Error('Error procedentes del backend');

        const nuevoUsuarioAPI = await respuesta.json();

        // 4. Actualizar automáticamente el listado agregando el nuevo
        const nuevoRegistro = {
          id: listado.length + 1,
          name: nombre,
          email: correo,
          role: rol
        };

        setListado([...listado, nuevoRegistro]);

        // 3. Confirmación exitosa
        setMensajeExito('¡Nuevo registro guardado exitosamente con POST! 🎉');
      }

      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setRol('Alumna');

    } catch (error) {
      // 7. Validar errores procedentes del backend
      setMensajeError(`⚠️ Fallo en el backend: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  // 5. Opción para cargar datos en el formulario y EDITAR
  const prepararEdicion = (item) => {
    setIdEditando(item.id);
    setNombre(item.name);
    setCorreo(item.email);
    setRol(item.role || 'Alumna');
    setMensajeExito('');
    setMensajeError('');
  };

  // Cancelar la edición
  const cancelarEdicion = () => {
    setIdEditando(null);
    setNombre('');
    setCorreo('');
    setRol('Alumna');
  };

  return (
    <div className="container py-3 text-start">
      <h2 className="text-danger fw-bold text-center mb-4">
        Gestión de Registros (POST y PUT) 🌸
      </h2>

      {/* 3. Confirmación de Éxito */}
      {mensajeExito && (
        <div className="alert alert-success shadow-sm alert-dismissible fade show" role="alert">
          {mensajeExito}
        </div>
      )}

      {/* 7. Mensaje de Error del Backend */}
      {mensajeError && (
        <div className="alert alert-danger shadow-sm alert-dismissible fade show" role="alert">
          {mensajeError}
        </div>
      )}

      <div className="row g-4">
        {/* FORMULARIO (POST / PUT) */}
        <div className="col-12 col-md-5">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <h4 className="text-danger mb-3">
              {idEditando ? '✏️ Editar Registro' : '➕ Nuevo Registro'}
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre Completo:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Dulce María"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="dulce@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Rol:</label>
                <select
                  className="form-select"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="Alumna">Alumna</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className={`btn ${idEditando ? 'btn-warning' : 'btn-danger'} fw-bold`}
                  disabled={cargando}
                >
                  {cargando
                    ? 'Procesando en Backend...'
                    : idEditando
                    ? '🔄 Actualizar con PUT'
                    : '📤 Enviar mediante POST'}
                </button>

                {idEditando && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={cancelarEdicion}
                  >
                    Cancelar Edición
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* LISTADO ACTUALIZADO AUTOMÁTICAMENTE (4 y 5) */}
        <div className="col-12 col-md-7">
          <h4 className="text-danger mb-3">Listado en Tiempo Real 📋</h4>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle bg-white mb-0">
              <thead className="table-danger">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {listado.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className="badge bg-secondary">{item.role}</span>
                    </td>
                    <td>
                      {/* 5. Opción para Editar */}
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => prepararEdicion(item)}
                      >
                        ✏️ Editar
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

export default Registro;