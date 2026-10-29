import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-top py-3 mt-auto">
      <div className="container-fluid px-3 px-lg-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-muted">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-black text-dark fs-6" style={{ letterSpacing: '0.5px' }}>OTIS</span>
            <span className="badge bg-pink text-white fw-bold px-2 py-1" style={{ fontSize: '0.65rem' }}>
              BRIDGE
            </span>
            <span className="text-secondary border-start ps-2 ms-1">
              Plataforma de Gestão de Ocorrências e Telemetria Operacional
            </span>
          </div>

          <div className="text-secondary">
            &copy; {new Date().getFullYear()} Otis Elevator Company. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
