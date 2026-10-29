import React, { useState } from 'react';
import KpiCards from './KpiCards';
import FleetHeatmap from './FleetHeatmap';
import ActiveFaultsTable from './ActiveFaultsTable';
import OperationsStatusBar from './OperationsStatusBar';

function LeadershipView({
  incidents,
  onDispatchToTech,
  onOpenNewIncident
}) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'table' | 'map'

  const handleSelectBuilding = (bld) => {
    setSelectedBuilding(bld);
    const found = incidents.find(
      incident => incident.building === bld.name && incident.status !== 'Concluído'
    );
    if (found) {
      setSelectedIncident(found);
    }
  };

  return (
    <div className="container-fluid px-4 px-lg-5 py-4">
      {/* Título e Ação Principal */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4 pb-2 border-bottom">
        <div>
          <span className="badge bg-navy text-white text-uppercase px-2 py-1 small mb-1">
            Painel Executivo
          </span>
          <h2 className="fs-3 fw-bold text-dark mb-0">
            Governança da Informação & Gestão de Frotas
          </h2>
          <span className="text-muted small">
            Supervisão e despacho cirúrgico de chamados operacionais em tempo real
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Seletor de Visualização para Espaçamento */}
          <div className="btn-group btn-group-sm me-2 d-none d-md-inline-flex" role="group">
            <button
              type="button"
              className={`btn ${viewMode === 'both' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('both')}
            >
              Visão Completa
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'table' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              Apenas Chamados
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'map' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('map')}
            >
              Apenas Mapa
            </button>
          </div>

          <button
            className="btn btn-otis-pink d-flex align-items-center gap-2 shadow-sm px-3 py-2 fw-semibold"
            onClick={onOpenNewIncident}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Novo Registro</span>
          </button>
        </div>
      </div>

      {/* Indicadores Principais de Desempenho (MTTR, SLA, Ocorrências) */}
      <KpiCards incidents={incidents} />

      {/* Grid Central Espaçoso */}
      <div className="row g-4 mb-4">
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className={viewMode === 'both' ? 'col-12 col-xl-6' : 'col-12'}>
            <FleetHeatmap
              incidents={incidents}
              onSelectBuilding={handleSelectBuilding}
              selectedBuildingId={selectedBuilding?.id}
            />
          </div>
        )}

        {(viewMode === 'both' || viewMode === 'table') && (
          <div className={viewMode === 'both' ? 'col-12 col-xl-6' : 'col-12'}>
            <ActiveFaultsTable
              incidents={incidents}
              onSelectIncident={setSelectedIncident}
              onDispatchToTech={onDispatchToTech}
              selectedIncidentId={selectedIncident?.id}
            />
          </div>
        )}
      </div>

      {/* Detalhes do Elevador Selecionado (Painel Espaçoso) */}
      {selectedIncident && (
        <div className="card-otis p-4 mb-4 bg-white border-top border-4 border-danger shadow-sm">
          <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
            <div className="d-flex align-items-center gap-3">
              <span className={`badge ${selectedIncident.severity === 'CRÍTICO' ? 'badge-critical' : 'badge-warning'} px-3 py-2 fs-6`}>
                {selectedIncident.severity}
              </span>
              <div>
                <h5 className="mb-0 fw-bold text-dark fs-5">
                  Diagnóstico do Elevador {selectedIncident.elevatorId} — {selectedIncident.building}
                </h5>
                <small className="text-secondary">{selectedIncident.location} • {selectedIncident.carNumber}</small>
              </div>
            </div>
            <button
              className="btn-close"
              onClick={() => setSelectedIncident(null)}
              aria-label="Fechar painel"
            ></button>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="p-3 rounded-3 bg-light border h-100">
                <span className="text-secondary small fw-bold text-uppercase">Status Operacional</span>
                <div className="fs-5 fw-bold text-dark mt-1">{selectedIncident.status}</div>
                <div className="text-secondary small mt-2">
                  <strong>Tipo de Falha:</strong> {selectedIncident.type}
                </div>
                <div className="text-secondary small mt-1">
                  <strong>Técnico Designado:</strong> {selectedIncident.technician}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 rounded-3 bg-light border h-100">
                <span className="text-secondary small fw-bold text-uppercase">Telemetria de Sensores</span>
                <div className="d-flex justify-content-between small text-secondary mt-2">
                  <span>Tensão Elétrica:</span>
                  <strong className="text-dark">{selectedIncident.telemetry?.voltage || '380V'}</strong>
                </div>
                <div className="d-flex justify-content-between small text-secondary mt-1">
                  <span>Temp. do Motor:</span>
                  <strong className="text-dark">{selectedIncident.telemetry?.tempMotor || '65°C'}</strong>
                </div>
                <div className="d-flex justify-content-between small text-secondary mt-1">
                  <span>Ciclos de Abertura:</span>
                  <strong className="text-dark">{selectedIncident.telemetry?.doorCycles || '42.000'}</strong>
                </div>
                <div className="d-flex justify-content-between small text-secondary mt-1">
                  <span>Índice de Saúde:</span>
                  <strong className="text-danger">{selectedIncident.telemetry?.healthScore || '70%'}</strong>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column justify-content-between">
              <div className="p-3 rounded-3 bg-light border flex-grow-1 mb-3">
                <span className="text-secondary small fw-bold text-uppercase">Descrição dos Sintomas</span>
                <p className="small text-dark mt-2 mb-0">
                  {selectedIncident.description}
                </p>
              </div>
              <button
                className="btn btn-otis-pink w-100 py-2 fw-semibold shadow-sm"
                onClick={() => onDispatchToTech(selectedIncident)}
              >
                <i className="bi bi-wrench-adjustable me-2"></i>
                Abrir Chamado no Portal do Técnico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Operações de Campo */}
      <OperationsStatusBar onSiteCount={28} totalTechs={42} />
    </div>
  );
}

export default LeadershipView;
