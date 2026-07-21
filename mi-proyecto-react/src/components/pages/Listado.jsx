import React, { useState, useCallback } from 'react';
import FilaUsuario from '../FilaUsuario'; // 6. Separación de componente FilaUsuario

function Listado() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // Datos locales con clave única (key)
  const [usuarios, setUsuarios] = useState([
    { id: 1, name: 'Dulce María', username: 'dulce_maria', email: 'dulce@ejemplo.com', city: 'Ciudad de México' },
    { id: 2, name: 'Aldo Álvarez Jurado', username: 'profe_aldo', email: 'aldo@ejemplo.com', city: 'Estado de México' }
  ]);

  // Estados del Formulario
  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [ciudad, setCiudad] = useState('');

  // 2. Estado para la Confirmación de Eliminar
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Estados de carga y mensajes
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState(null);

  // --- CREAR (POST) Y ACTUALIZAR (PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setError(null);
    setCargando(true);

    try {
      if (idEditando) {
        // Petición PUT
        const res = await fetch(`${API_URL}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nombre, username: usuario, email: correo, city: ciudad }),
        });
        if (!res.ok) throw new Error('Error al actualizar');

        // 4. Actualizar el listado
        setUsuarios(usuarios.map(u => u.id === idEditando ? { ...u, name: nombre, username: usuario, email: correo, city: ciudad } : u));
        setMensajeExito('¡Registro actualizado con éxito mediante PUT! 🔄');
        setIdEditando(null);
      } else {
        // Petición POST
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nombre, username: usuario, email: correo, city: ciudad }),
        });
        if (!res.ok) throw new Error('Error al guardar');

        const nuevo = { id: usuarios.length + 1, name: nombre, username: usuario, email: correo, city: ciudad };
        
        // 4. Actualizar el listado
        setUsuarios([...usuarios, nuevo]);
        setMensajeExito('¡Registro guardado con éxito mediante POST! 🎉');
      }

      setNombre(''); setUsuario(''); setCorreo(''); setCiudad('');
    } catch (err) {
      setError(`⚠️ Error: ${err.message}`);
    } finally {
      setCargando(false);
    }
  };

  // 3 y 4. ELIMINAR REGISTRO (Petición DELETE y Actualización)
  const ejecutarEliminacion = async () => {
    if (!usuarioAEliminar) return;
    setCargando(true);
    setMensajeExito('');
    setError(null);

    try {
      // 3. Enviar la solicitud DELETE al backend
      const res = await fetch(`${API_URL}/${usuarioAEliminar.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar en la API');

      // 4. Actualizar el listado filtrando el elemento eliminado
      setUsuarios(usuarios.filter((u) => u.id !== usuarioAEliminar.id));
      setMensajeExito(`¡Registro de "${usuarioAEliminar.name}" eliminado correctamente mediante DELETE! 🗑️`);
      setUsuarioAEliminar(null);
    } catch (err) {
      setError(`⚠️ Error al eliminar: ${err.message}`);
    } finally {
      setCargando(false);
    }
  };

  // 5. Funciones memorizadas con useCallback para evitar renderizados innecesarios
  const prepararEdicion = useCallback((item) => {
    setIdEditando(item.id);
    setNombre(item.name);
    setUsuario(item.username);
    setCorreo(item.email);
    setCiudad(item.city);
  }, []);

  const solicitarEliminacion = useCallback((item) => {
    // 2. Solicitar confirmación antes de la operación
    setUsuarioAEliminar(item);
  }, []);

  return (
    <div className="container py-2 text-start">
      <h2 className="text-danger fw-bold text-center mb-4">
        CRUD Completo desde React 🌸
      </h2>

      {/* Alertas */}
      {mensajeExito && <div className="alert alert-success shadow-sm">{mensajeExito}</div>}
      {error && <div className="alert alert-danger shadow-sm">{error}</div>}

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <h5 className="text-danger mb-3 fw-bold">
              {idEditando ? '✏️ Editar Usuario' : '➕ Agregar Usuario'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small fw-bold">Nombre Completo:</label>
                <input type="text" className="form-control form-control-sm" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold">Usuario:</label>
                <input type="text" className="form-control form-control-sm" value={usuario} onChange={e => setUsuario(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold">Correo:</label>
                <input type="email" className="form-control form-control-sm" value={correo} onChange={e => setCorreo(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Ciudad:</label>
                <input type="text" className="form-control form-control-sm" value={ciudad} onChange={e => setCiudad(e.target.value)} required />
              </div>
              <button type="submit" className={`btn btn-sm w-100 ${idEditando ? 'btn-warning' : 'btn-danger'} fw-bold`} disabled={cargando}>
                {cargando ? 'Procesando...' : idEditando ? '🔄 Actualizar (PUT)' : '📤 Guardar (POST)'}
              </button>
            </form>
          </div>
        </div>

        {/* TABLA DE REGISTROS */}
        <div className="col-12 col-md-8">
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle bg-white mb-0">
              <thead className="table-danger">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Ciudad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      📭 No existen registros en el listado.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((item) => (
                    /* 7. Clave única en cada elemento de la lista (key={item.id}) */
                    <FilaUsuario
                      key={item.id}
                      item={item}
                      prepararEdicion={prepararEdicion}
                      confirmarEliminacion={solicitarEliminacion}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. VENTANA / MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {usuarioAEliminar && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">⚠️ Confirmar Eliminación</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setUsuarioAEliminar(null)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  ¿Estás segura de que deseas eliminar a <strong>{usuarioAEliminar.name}</strong> del listado?
                </p>
                <small className="text-muted">Esta acción enviará una solicitud DELETE al servidor.</small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setUsuarioAEliminar(null)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger btn-sm fw-bold" onClick={ejecutarEliminacion}>
                  🗑️ Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listado;