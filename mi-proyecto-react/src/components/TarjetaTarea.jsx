import { useState } from 'react';

// ==========================================
// EXPLICACIÓN MEDIANTE COMENTARIOS (Punto 5):
// 
// 1. ¿QUÉ SON LAS PROPIEDADES (PROPS)?
//    Son datos que un componente padre le pasa a un componente hijo para personalizarlo. 
//    Son de SÓLO LECTURA (inmutables dentro del componente).
//
// 2. ¿QUÉ ES EL ESTADO (STATE)?
//    Es una variable interna gestionada por el propio componente que PUEDE CAMBIAR con el tiempo.
//    Cuando el estado cambia, React vuelve a renderizar el componente para mostrar el nuevo valor en pantalla.
//
// 3. ¿CUÁNDO UTILIZAR CADA UNO?
//    - Usa PROPS para configurar o pasar datos estáticos/iniciales desde afuera.
//    - Usa ESTADO para valores interactivos que cambian según las acciones del usuario (contadores, interruptores, formularios).
// ==========================================

function TarjetaTarea({ titulo, descripcion, categoria, estadoInicial }) {
  // Punto 3: Crear un contador/interruptor mediante estado
  const [completada, setCompletada] = useState(estadoInicial === 'Completada');
  const [votos, setVotos] = useState(0);

  // Punto 4: Botones/funciones para modificar el estado
  const toggleEstado = () => {
    setCompletada(!completada);
  };

  const incrementarVotos = () => {
    setVotos(votos + 1);
  };

  const estilosTarjeta = {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    border: completada ? '2px solid #af71bb' : '2px solid #ef4444',
    borderRadius: '8px',
    padding: '16px',
    margin: '12px 0',
    textAlign: 'left'
  };

  const estilosBoton = {
    backgroundColor: completada ? '#d587d8' : '#22c55e',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    fontWeight: 'bold'
  };

  const estilosBotonVoto = {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={estilosTarjeta}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{titulo}</h3>
        <span style={{ 
          backgroundColor: '#334155', 
          padding: '4px 8px', 
          borderRadius: '4px', 
          fontSize: '12px' 
        }}>
          {categoria}
        </span>
      </div>

      <p style={{ color: '#cbd5e1', fontSize: '14px', margin: '10px 0' }}>{descripcion}</p>
      
      <p style={{ fontSize: '13px' }}>
        <strong>Estado: </strong>
        <span style={{ color: completada ? '#4ade80' : '#f87171' }}>
          {completada ? 'Completada' : 'Pendiente'}
        </span>
      </p>

      {/* Punto 4: Botones que modifican el estado */}
      <div style={{ marginTop: '15px' }}>
        <button style={estilosBoton} onClick={toggleEstado}>
          {completada ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </button>

        <button style={estilosBotonVoto} onClick={incrementarVotos}>
          👍 Prioridad ({votos})
        </button>
      </div>
    </div>
  );
}

export default TarjetaTarea;