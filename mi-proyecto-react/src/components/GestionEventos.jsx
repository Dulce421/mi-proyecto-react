import { useState } from 'react';

function GestionEventos() {
  // 1. Estado para onClick (Contador)
  const [contador, setContador] = useState(0);

  // 2. Estado para onChange (Texto en vivo)
  const [textoInput, setTextoInput] = useState('');

  // 3. Estado para onSubmit (Mensaje enviado)
  const [mensajeEnviado, setMensajeEnviado] = useState('');

  // 4. Estado para onMouseEnter (Cambio de color/efecto hover)
  const [esHover, setEsHover] = useState(false);

  // Manejador del evento onSubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (textoInput.trim() !== '') {
      setMensajeEnviado(`¡Formulario enviado con éxito con el texto: "${textoInput}"!`);
    } else {
      setMensajeEnviado('Por favor escribe algo antes de enviar.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      
      {/* EVENTO 1: onClick */}
      <section style={seccionEstilo}>
        <h3>1. Evento <code>onClick</code></h3>
        <p>Haz clic para incrementar el contador:</p>
        <button 
          onClick={() => setContador(contador + 1)}
          style={botonEstilo}
        >
          Clics realizados: {contador}
        </button>
      </section>

      {/* EVENTO 2: onChange */}
      <section style={seccionEstilo}>
        <h3>2. Evento <code>onChange</code></h3>
        <p>Escribe algo en el campo de texto:</p>
        <input 
          type="text" 
          value={textoInput}
          onChange={(e) => setTextoInput(e.target.value)}
          placeholder="Escribe aquí..."
          style={inputEstilo}
        />
        <p style={{ marginTop: '8px', color: '#38bdf8' }}>
          <strong>Texto en tiempo real:</strong> {textoInput || '(Vacío)'}
        </p>
      </section>

      {/* EVENTO 3: onSubmit */}
      <section style={seccionEstilo}>
        <h3>3. Evento <code>onSubmit</code></h3>
        <form onSubmit={handleSubmit}>
          <button type="submit" style={{ ...botonEstilo, backgroundColor: '#059669' }}>
            Enviar Formulario
          </button>
        </form>
        {mensajeEnviado && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#14532d', borderRadius: '5px', color: '#4ade80' }}>
            {mensajeEnviado}
          </div>
        )}
      </section>

      {/* EVENTO 4: onMouseEnter (y onMouseLeave para restaurar) */}
      <section style={seccionEstilo}>
        <h3>4. Evento <code>onMouseEnter</code></h3>
        <p>Pasa el puntero del ratón sobre la caja:</p>
        <div 
          onMouseEnter={() => setEsHover(true)}
          onMouseLeave={() => setEsHover(false)}
          style={{
            padding: '20px',
            textAlign: 'center',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backgroundColor: esHover ? '#eab308' : '#334155',
            color: esHover ? '#000000' : '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {esHover ? '¡El ratón está ENCIMA de la caja! 🎯' : 'Pasa el ratón por aquí 🖱️'}
        </div>
      </section>

    </div>
  );
}

// Estilos básicos reutilizables
const seccionEstilo = {
  backgroundColor: '#1e293b',
  padding: '15px 20px',
  borderRadius: '8px',
  marginBottom: '15px',
  border: '1px solid #334155'
};

const botonEstilo = {
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const inputEstilo = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: 'white',
  boxSizing: 'border-box'
};

export default GestionEventos;