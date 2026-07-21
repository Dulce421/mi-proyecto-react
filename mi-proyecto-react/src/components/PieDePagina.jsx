function PieDePagina({ textoDerechos }) {
  const estilos = {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    textAlign: 'center',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '30px',
    fontSize: '14px'
  };

  return (
    <footer style={estilos}>
      <p>{textoDerechos}</p>
    </footer>
  );
}

export default PieDePagina;