import React, { useState } from 'react';
import { FLEET_BUILDINGS } from '../../data/initialData';
import { INCIDENT_SEVERITIES } from '../../utils/incidentMetrics';

function FleetHeatmap({ incidents, onSelectBuilding, selectedBuildingId }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  const activeIncidents = incidents.filter(incident => incident.status !== 'Concluído');
  const buildings = FLEET_BUILDINGS.map(building => {
    const buildingIncidents = activeIncidents.filter(incident => incident.building === building.name);
    const hasCritical = buildingIncidents.some(
      incident => incident.severity === INCIDENT_SEVERITIES.CRITICAL
    );
    const hasWarning = buildingIncidents.some(
      incident => incident.severity === INCIDENT_SEVERITIES.WARNING
    );

    return {
      ...building,
      activeFaults: buildingIncidents.length,
      severity: hasCritical
        ? INCIDENT_SEVERITIES.CRITICAL
        : hasWarning
          ? INCIDENT_SEVERITIES.WARNING
          : INCIDENT_SEVERITIES.NORMAL
    };
  });

  return (
    <div className="card-otis overflow-hidden h-100 position-relative p-3 p-md-4 d-flex flex-column">
      {/* Header do Card */}
      <div className="pb-3 mb-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold text-dark fs-6">Mapa de Monitoramento da Frota</h5>
          <small className="text-muted">Distribuição geográfica dos edifícios e criticidade de chamados</small>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1 small text-secondary">
            <span className="badge rounded-pill bg-danger p-1"> </span>
            <span>Crítico</span>
          </div>
          <div className="d-flex align-items-center gap-1 small text-secondary">
            <span className="badge rounded-pill bg-warning p-1"> </span>
            <span>Alerta</span>
          </div>
        </div>
      </div>

      {/* Área do Mapa Espaçosa */}
      <div className="fleet-map-container p-4 position-relative d-flex align-items-center justify-content-center flex-grow-1" style={{ minHeight: '340px' }}>
        <div className="map-grid-overlay"></div>

        {/* Linhas de conexão */}
        <svg
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{ pointerEvents: 'none', opacity: 0.35 }}
        >
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#ed145b" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#ed145b" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="65%" y2="75%" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Edifícios Mapeados */}
        <div
          className="position-relative w-100 h-100"
          style={{
            minHeight: '260px',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease'
          }}
        >
          {buildings.map((building, index) => {
            const positions = [
              { top: '25%', left: '20%' }, // Willis Tower
              { top: '15%', left: '60%' }, // Tribune East
              { top: '35%', left: '78%' }, // Aon Center
              { top: '10%', left: '42%' }, // Water Tower Pl
              { top: '65%', left: '25%' }, // The Franklin
              { top: '75%', left: '65%' }, // North Pier Apt.
              { top: '48%', left: '48%' }  // Metropolitan Plaza
            ];
            const pos = positions[index] || { top: '50%', left: '50%' };
            const isSelected = selectedBuildingId === building.id;

            return (
              <div
                key={building.id}
                className="position-absolute text-center cursor-pointer"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 10 : 2
                }}
                onClick={() => onSelectBuilding(building)}
                title={`Clique para inspecionar ${building.name}`}
              >
                <div
                  className={`p-2 rounded-circle shadow d-inline-flex align-items-center justify-content-center ${
                    building.severity === 'CRÍTICO'
                      ? 'bg-danger text-white'
                      : building.severity === 'ALERTA'
                      ? 'bg-warning text-dark'
                      : 'bg-success text-white'
                  } ${isSelected ? 'border border-3 border-white' : ''}`}
                  style={{ width: '40px', height: '40px' }}
                >
                  <i className="bi bi-buildings-fill fs-6"></i>
                </div>
                <div
                  className="fleet-map-label bg-dark text-white rounded px-2 py-1 mt-1 small shadow fw-semibold"
                  style={{ fontSize: '0.75rem', opacity: 0.95 }}
                >
                  {building.name}
                  {building.activeFaults > 0 && (
                    <span className="ms-1 badge bg-danger text-white" style={{ fontSize: '0.65rem' }}>
                      {building.activeFaults}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de Zoom */}
        <div className="position-absolute bottom-0 end-0 m-3 d-flex flex-column gap-1" style={{ zIndex: 12 }}>
          <button
            className="btn btn-sm btn-dark text-white shadow px-2 py-1"
            onClick={handleZoomIn}
            title="Aumentar Zoom"
          >
            <i className="bi bi-plus-lg"></i>
          </button>
          <button
            className="btn btn-sm btn-dark text-white shadow px-2 py-1"
            onClick={handleZoomOut}
            title="Diminuir Zoom"
          >
            <i className="bi bi-dash-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FleetHeatmap;
