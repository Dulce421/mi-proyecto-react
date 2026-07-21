import { NavLink } from 'react-router-dom';

function MenuNavegacion() {
  const obtenerEstiloNavegacion = ({ isActive }) => ({
    color: isActive ? '#ffffff' : '#831843',
    backgroundColor: isActive ? '#f472b6' : 'transparent',
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: '#fdf2f8',
      padding: '12px',
      borderRadius: '12px',
      border: '2px solid #fbcfe8',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }}>
      <NavLink to="/" style={obtenerEstiloNavegacion}>Inicio</NavLink>
      <NavLink to="/listado" style={obtenerEstiloNavegacion}>Listado</NavLink>
      <NavLink to="/registro" style={obtenerEstiloNavegacion}>Registro</NavLink>
      <NavLink to="/acerca-de" style={obtenerEstiloNavegacion}>Acerca de</NavLink>
    </nav>
  );
}

export default MenuNavegacion;