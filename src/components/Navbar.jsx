import React from 'react';

function Navbar({ activeTab, setActiveTab, onOpenNewIncident, unreadAlertsCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navy sticky-top shadow-sm py-2">
      <div className="container-fluid px-3 px-lg-4">
        {/* Brand / Logo (Esquerda) */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center text-white text-decoration-none me-3">
            <span className="fw-black fs-4 tracking-tight text-white me-2" style={{ letterSpacing: '1px' }}>
              OTIS
            </span>
            <span className="badge bg-pink text-white fw-bold me-2 px-2 py-1" style={{ fontSize: '0.75rem' }}>
              BRIDGE
            </span>
            <div className="navbar-brand-copy d-none d-md-block border-start border-secondary ps-2 ms-1">
              <span className="d-block text-white fw-semibold small lh-1">Digital Bridge</span>
              <span className="text-secondary small" style={{ fontSize: '0.7rem' }}>Operações de Campo</span>
            </div>
          </div>
        </div>

        {/* Toggle para Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Conteúdo da Navbar */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navegação Centralizada (Centro) */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-2 justify-content-center">
            <li className="nav-item">
              <button
                className={`btn btn-sm px-3 py-1 text-center ${
                  activeTab === 'leadership'
                    ? 'btn-otis-pink shadow-sm'
                    : 'text-white-50 hover-text-white btn-outline-secondary border-0'
                }`}
                onClick={() => setActiveTab('leadership')}
              >
                <i className="bi bi-speedometer2 me-1"></i> Painel Liderança
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm px-3 py-1 text-center position-relative ${
                  activeTab === 'technician'
                    ? 'btn-otis-pink shadow-sm'
                    : 'text-white-50 hover-text-white btn-outline-secondary border-0'
                }`}
                onClick={() => setActiveTab('technician')}
              >
                <i className="bi bi-wrench-adjustable me-1"></i> Portal do Técnico
                {unreadAlertsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">Novos chamados</span>
                  </span>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm px-3 py-1 text-center ${
                  activeTab === 'maturity'
                    ? 'btn-otis-pink shadow-sm'
                    : 'text-white-50 hover-text-white btn-outline-secondary border-0'
                }`}
                onClick={() => setActiveTab('maturity')}
              >
                <i className="bi bi-graph-up-arrow me-1"></i> Maturidade Digital
              </button>
            </li>
          </ul>

          {/* Ações e Perfil do Usuário (Direita) */}
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            {/* Botão Registrar Ocorrência */}
            <button
              className="btn btn-sm btn-otis-pink text-nowrap d-flex align-items-center gap-1 shadow-sm px-3 py-1"
              onClick={onOpenNewIncident}
              title="Cadastrar nova ocorrência"
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Novo Chamado</span>
            </button>

            {/* Perfil do Usuário com Foto Genérica do Unsplash */}
            <div className="d-flex align-items-center text-white border-start border-secondary ps-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Foto de perfil de Marcus Vane"
                className="rounded-circle me-2 border border-secondary"
                style={{ width: '36px', height: '36px', objectFit: 'cover' }}
              />
              <div className="lh-sm d-none d-sm-block">
                <div className="fw-semibold small">Marcus Vane</div>
                <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Supervisor Operacional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
