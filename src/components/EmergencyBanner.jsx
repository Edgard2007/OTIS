import React from 'react';

function EmergencyBanner({ criticalIncident, onAcknowledge, onDispatchToTech }) {
  if (!criticalIncident) return null;

  return (
    <aside aria-label="Alerta de Emergência" className="emergency-ticker py-2 px-3">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <div className="emergency-message d-flex align-items-center gap-2 text-white">
          <span className="pulse-indicator"></span>
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          <span className="fw-bold">DESPACHO DE EMERGÊNCIA:</span>
          <span>
            {criticalIncident.description || `Retenção de passageiros reportada em ${criticalIncident.location} (${criticalIncident.elevatorId})`}
          </span>
        </div>
        <div className="emergency-actions d-flex gap-2 align-items-center flex-shrink-0">
          <button
            className="btn btn-sm btn-outline-light px-3 py-1 fw-semibold"
            onClick={onAcknowledge}
          >
            <i className="bi bi-check2 me-1"></i> Reconhecer
          </button>
          <button
            className="btn btn-sm btn-light text-danger px-3 py-1 fw-bold shadow-sm"
            onClick={() => onDispatchToTech(criticalIncident)}
          >
            <i className="bi bi-send-fill me-1"></i> Ver Protocolo / Despacho
          </button>
        </div>
      </div>
    </aside>
  );
}

export default EmergencyBanner;
