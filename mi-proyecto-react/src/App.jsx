import { Routes, Route } from 'react-router-dom';
import MenuNavegacion from './components/MenuNavegacion';
import Inicio from './components/pages/Inicio';
import Listado from './components/pages/Listado';
import Registro from './components/pages/Registro';
import AcercaDe from './components/pages/AcercaDe';
import NoEncontrada from './components/pages/NoEncontrada';

function App() {
  return (
    <div className="container-fluid min-vh-100 bg-light py-4">
      {/* 1. ENCABEZADO */}
      <header className="row justify-content-center mb-3 text-center">
        <div className="col-12 col-md-8">
          <h1 className="fw-bold text-danger">Sistema Integrado de Control 🌸</h1>
          <p className="text-muted fw-bold">
            Alumna: Dulce | Profe: Aldo Álvarez Jurado
          </p>
        </div>
      </header>

      {/* 2. MENÚ DE NAVEGACIÓN Y CONTENIDO */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-9">
          <MenuNavegacion />

          <main className="card shadow-sm border-0 mt-3 p-4 bg-white">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/listado" element={<Listado />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/acerca-de" element={<AcercaDe />} />
              <Route path="*" element={<NoEncontrada />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;