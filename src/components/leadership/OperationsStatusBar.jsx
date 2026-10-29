import React from 'react';

function OperationsStatusBar({ onSiteCount = 28, totalTechs = 42 }) {
  return (
    <div className="row g-4 my-2">
      {/* Widget 1: Técnicos em Campo */}
      <div className="col-12 col-md-4">
        <div className="operations-status-card card-otis p-4 h-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-light p-3 rounded-circle text-dark border">
              <i className="bi bi-tools fs-4"></i>
            </div>
            <div>
              <div className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                Técnicos em Campo
              </div>
              <div className="fs-3 fw-bold text-dark">{onSiteCount} de {totalTechs}</div>
              <div className="text-muted small">66% da equipe alocada</div>
            </div>
          </div>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
            Operação Normal
          </span>
        </div>
      </div>

      {/* Widget 2: Consumo Elétrico */}
      <div className="col-12 col-md-4">
        <div className="operations-status-card p-4 h-100 rounded-3 text-white bg-navy shadow-sm d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-circle text-warning">
              <i className="bi bi-lightning-charge-fill fs-4"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  Consumo Elétrico
                </span>
                <span className="badge bg-primary text-uppercase" style={{ fontSize: '0.65rem' }}>
                  Tempo Real
                </span>
              </div>
              <div className="fs-3 fw-bold text-white">1.240 kWh</div>
              <div className="text-white-50 small">-4.8% em relação à média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 3: Sensores IoT */}
      <div className="col-12 col-md-4">
        <div className="operations-status-card card-otis p-4 h-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-light p-3 rounded-circle text-primary border">
              <i className="bi bi-broadcast-pin fs-4"></i>
            </div>
            <div>
              <div className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                Disponibilidade IoT
              </div>
              <div className="fs-3 fw-bold text-dark">99.98%</div>
              <div className="text-muted small">1.420 nós ativos</div>
            </div>
          </div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
            Conectado
          </span>
        </div>
      </div>
    </div>
  );
}

export default OperationsStatusBar;
