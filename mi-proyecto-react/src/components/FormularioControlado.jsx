import { useState } from 'react';

function FormularioControlado() {
  // 1. Estado inicial del formulario (vacío)
  const estadoInicial = {
    nombre: '',
    correo: '',
    edad: '',
    categoria: '',
    fecha: '',
    comentarios: ''
  };

  // Punto 3: Almacenar los valores mediante estado
  const [formData, setFormData] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar error del campo que se está editando
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  // Punto 4: Validaciones requeridas
  const validarFormulario = () => {
    let erroresDetectados = {};

    // Campo de texto: Nombre (Obligatorio y longitud mínima de 3 caracteres)
    if (!formData.nombre.trim()) {
      erroresDetectados.nombre = 'El nombre es obligatorio.';
    } else if (formData.nombre.trim().length < 3) {
      erroresDetectados.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    // Formato de correo (Obligatorio y regex válido)
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      erroresDetectados.correo = 'El correo electrónico es obligatorio.';
    } else if (!regexCorreo.test(formData.correo)) {
      erroresDetectados.correo = 'Ingresa un formato de correo válido (ej. usuario@dominio.com).';
    }

    // Campo numérico: Edad (Obligatorio y valores entre 15 y 99)
    if (!formData.edad) {
      erroresDetectados.edad = 'La edad es obligatoria.';
    } else if (Number(formData.edad) < 15 || Number(formData.edad) > 99) {
      erroresDetectados.edad = 'La edad debe estar entre 15 y 99 años.';
    }

    // Lista desplegable: Categoría (Obligatoria)
    if (!formData.categoria) {
      erroresDetectados.categoria = 'Selecciona una categoría.';
    }

    // Fecha (Obligatoria)
    if (!formData.fecha) {
      erroresDetectados.fecha = 'La fecha es obligatoria.';
    }

    // Área de texto: Comentarios (Obligatoria y longitud mínima de 10 caracteres)
    if (!formData.comentarios.trim()) {
      erroresDetectados.comentarios = 'Los comentarios son obligatorios.';
    } else if (formData.comentarios.trim().length < 10) {
      erroresDetectados.comentarios = 'Los comentarios deben tener al menos 10 caracteres.';
    }

    return erroresDetectados;
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length > 0) {
      // Punto 5: Mostrar mensajes específicos de error
      setErrores(erroresValidacion);
      setMensajeExito('');
    } else {
      // Éxito: Formulario válido
      setErrores({});
      setMensajeExito('💖 ¡Formulario registrado con éxito!');

      // Punto 6: Limpiar el formulario cuando se complete correctamente
      setFormData(estadoInicial);
    }
  };

  // --- PALETA ROSA PASTEL ---
  const colores = {
    fondoSeccion: '#fdf2f8',
    borde: '#fbcfe8',
    textoPrincipal: '#831843',
    textoSecundario: '#db2777',
    boton: '#f472b6',
    error: '#e11d48',
    exito: '#059669',
    exitoFondo: '#dcfce7'
  };

  const inputEstilo = (tieneError) => ({
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: `2px solid ${tieneError ? colores.error : colores.borde}`,
    backgroundColor: '#ffffff',
    color: colores.textoPrincipal,
    boxSizing: 'border-box',
    fontSize: '14px',
    outline: 'none',
    marginTop: '4px'
  });

  return (
    <div style={{
      maxWidth: '550px',
      margin: '0 auto',
      backgroundColor: colores.fondoSeccion,
      padding: '25px',
      borderRadius: '15px',
      border: `2px solid ${colores.borde}`,
      boxShadow: '0 4px 6px rgba(219, 39, 119, 0.05)',
      color: colores.textoPrincipal,
      textAlign: 'left'
    }}>
      <h2 style={{ color: colores.textoSecundario, marginTop: 0, textAlign: 'center' }}>
        Registro de Proyecto 🎀
      </h2>

      {mensajeExito && (
        <div style={{
          padding: '12px',
          backgroundColor: colores.exitoFondo,
          color: colores.exito,
          borderRadius: '8px',
          marginBottom: '15px',
          fontWeight: 'bold',
          textAlign: 'center',
          border: `1px solid ${colores.exito}`
        }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* 1. Campo de texto: Nombre */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Aldo Álvarez"
            style={inputEstilo(errores.nombre)}
          />
          {errores.nombre && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.nombre}</small>}
        </div>

        {/* 2. Campo de texto: Correo */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Correo electrónico *</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            style={inputEstilo(errores.correo)}
          />
          {errores.correo && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.correo}</small>}
        </div>

        {/* 3. Campo numérico: Edad */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Edad *</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Ej. 20"
            style={inputEstilo(errores.edad)}
          />
          {errores.edad && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.edad}</small>}
        </div>

        {/* 4. Lista desplegable: Categoría */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Categoría del proyecto *</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={inputEstilo(errores.categoria)}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="desarrollo">Desarrollo Web</option>
            <option value="diseno">Diseño UI/UX</option>
            <option value="base_datos">Bases de Datos</option>
          </select>
          {errores.categoria && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.categoria}</small>}
        </div>

        {/* 5. Fecha */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Fecha de entrega *</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            style={inputEstilo(errores.fecha)}
          />
          {errores.fecha && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.fecha}</small>}
        </div>

        {/* 6. Área de texto: Comentarios */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Detalles o Comentarios *</label>
          <textarea
            name="comentarios"
            rows="3"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Describe brevemente tu proyecto..."
            style={inputEstilo(errores.comentarios)}
          />
          {errores.comentarios && <small style={{ color: colores.error, fontWeight: 'bold' }}>{errores.comentarios}</small>}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: colores.boton,
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Guardar Registro ✨
        </button>

      </form>
    </div>
  );
}

export default FormularioControlado;