function TablaRegistros({ datos }) {
  const estilosTabla = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    marginBottom: '20px'
  };

  const estilosCelda = {
    border: '1px solid #cbd5e1',
    padding: '10px',
    textAlign: 'left'
  };

  const estilosHeader = {
    ...estilosCelda,
    backgroundColor: '#0f172a',
    color: 'white'
  };

  return (
    <table style={estilosTabla}>
      <thead>
        <tr>
          <th style={estilosHeader}>ID</th>
          <th style={estilosHeader}>Nombre</th>
          <th style={estilosHeader}>Rol</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((registro) => (
          <tr key={registro.id}>
            <td style={estilosCelda}>{registro.id}</td>
            <td style={estilosCelda}>{registro.nombre}</td>
            <td style={estilosCelda}>{registro.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaRegistros;