function BotonPersonalizado({ texto, onClick, color = '#2563eb' }) {
  const estilos = {
    backgroundColor: color,
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return (
    <button style={estilos} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotonPersonalizado;