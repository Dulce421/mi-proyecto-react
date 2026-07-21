import React from 'react';

// 5. Componente optimizado con React.memo para evitar renderizados innecesarios
const FilaUsuario = React.memo(({ item, prepararEdicion, confirmarEliminacion }) => {
  return (
    <tr>
      <td className="fw-bold">{item.id}</td>
      <td>{item.name}</td>
      <td>
        <span className="badge bg-secondary">@{item.username}</span>
      </td>
      <td>{item.email}</td>
      <td>{item.city}</td>
      <td>
        <div className="btn-group btn-group-sm">
          {/* Botón para Editar */}
          <button
            className="btn btn-outline-warning"
            onClick={() => prepararEdicion(item)}
          >
            ✏️ Editar
          </button>
          {/* 1. Botón para Eliminar */}
          <button
            className="btn btn-outline-danger"
            onClick={() => confirmarEliminacion(item)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
});

export default FilaUsuario;