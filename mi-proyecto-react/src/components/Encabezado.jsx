function Encabezado({ titulo, subtitulo }) {
  const estilos = {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px'
  };

  return (
    <header style={estilos}>
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </header>
  );
}

export default Encabezado;