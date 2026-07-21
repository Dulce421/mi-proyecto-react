import BotonPersonalizado from './BotonPersonalizado';

function TarjetaInformacion({ titulo, descripcion, textoBoton, onAccion }) {
  const estilos = {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '350px',
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
  };

  return (
    <div style={estilos}>
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>{titulo}</h3>
      <p style={{ color: '#475569', fontSize: '14px' }}>{descripcion}</p>
      {textoBoton && (
        <BotonPersonalizado 
          texto={textoBoton} 
          onClick={onAccion} 
          color="#059669" 
        />
      )}
    </div>
  );
}

export default TarjetaInformacion;