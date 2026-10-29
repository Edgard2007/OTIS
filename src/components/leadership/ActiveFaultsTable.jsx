import React, { useState } from 'react';
import { INCIDENT_SEVERITIES } from '../../utils/incidentMetrics';

function ActiveFaultsTable({ incidents, onSelectIncident, onDispatchToTech, selectedIncidentId }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ACTIVE');

  const filtered = incidents.filter(inc => {
    const matchesStatus = filterStatus === 'ACTIVE'
      ? inc.status !== 'Concluído'
      : inc.status === 'Concluído';
    if (!matchesStatus) return false;
    if (filterSeverity === 'ALL') return true;
    return inc.severity === filterSeverity;
  });

  const activeCount = incidents.filter(incident => incident.status !== 'Concluído').length;
  const completedCount = incidents.filter(incident => incident.status === 'Concluído').length;

  return (
    <div className="card-otis h-100 d-flex flex-column p-3 p-md-4">
      {/* Cabeçalho da Tabela */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 pb-3 mb-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-bold text-dark fs-6">
            {filterStatus === 'ACTIVE' ? 'Chamados Ativos' : 'Chamados Concluídos'}
          </h5>
          <span className="badge bg-danger text-uppercase px-2 py-1" style={{ fontSize: '0.65rem' }}>
            TEMPO REAL
          </span>
        </div>
        {/* Filtros */}
        <div className="d-flex flex-wrap justify-content-end gap-2">
          <div className="btn-group btn-group-sm" role="group" aria-label="Status dos chamados">
            <button
              type="button"
              className={`btn px-3 ${filterStatus === 'ACTIVE' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setFilterStatus('ACTIVE')}
            >
              Ativos ({activeCount})
            </button>
            <button
              type="button"
              className={`btn px-3 ${filterStatus === 'COMPLETED' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setFilterStatus('COMPLETED')}
            >
              Concluídos ({completedCount})
            </button>
          </div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Severidade dos chamados">
          <button
            type="button"
            className={`btn btn-sm px-3 ${filterSeverity === 'ALL' ? 'btn-dark' : 'btn-outline-secondary'}`}
            onClick={() => setFilterSeverity('ALL')}
          >
            Todos ({filterStatus === 'ACTIVE' ? activeCount : completedCount})
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 ${filterSeverity === INCIDENT_SEVERITIES.CRITICAL ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilterSeverity(INCIDENT_SEVERITIES.CRITICAL)}
          >
            Críticos
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 ${filterSeverity === INCIDENT_SEVERITIES.WARNING ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
            onClick={() => setFilterSeverity(INCIDENT_SEVERITIES.WARNING)}
          >
            Alertas
          </button>
          </div>
        </div>
      </div>

      {/* Lista Espaçada e Limpa */}
      <div className="table-responsive flex-grow-1" style={{ minHeight: '340px' }}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-secondary small text-uppercase">
            <tr>
              <th scope="col" className="py-3 ps-3" style={{ width: '45%' }}>Equipamento / Local</th>
              <th scope="col" className="py-3" style={{ width: '25%' }}>Severidade</th>
              <th scope="col" className="py-3 pe-3 text-end" style={{ width: '30%' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-5 text-muted">
                  Nenhuma ocorrência encontrada para o filtro selecionado.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedIncidentId === item.id;
                return (
                  <tr
                    key={item.id}
                    className={`cursor-pointer ${isSelected ? 'table-active' : ''}`}
                    onClick={() => onSelectIncident(item)}
                  >
                    <td className="py-3 ps-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i
                            className={`bi ${
                              item.type === 'Passageiro Preso'
                                ? 'bi-people-fill text-danger fs-4'
                                : item.type === 'Falha de Tração'
                                ? 'bi-gear-wide-connected text-danger fs-4'
                                : 'bi-tools text-warning fs-4'
                            }`}
                          ></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark fs-6">{item.elevatorId}</div>
                          <div className="text-secondary small">{item.location} • {item.carNumber}</div>
                          <span className="badge bg-light text-secondary border mt-1" style={{ fontSize: '0.7rem' }}>
                            Status: {item.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      {item.severity === INCIDENT_SEVERITIES.CRITICAL ? (
                        <span className="badge badge-critical px-2 py-1">
                          CRÍTICO
                        </span>
                      ) : (
                        <span className="badge badge-warning px-2 py-1">
                          ALERTA
                        </span>
                      )}
                    </td>
                    <td className="py-3 pe-3 text-end">
                      {item.status !== 'Concluído' && (
                        <button
                          className="btn btn-sm btn-outline-dark me-2 px-3 py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDispatchToTech(item);
                          }}
                          title="Despachar chamado para o técnico"
                        >
                          <i className="bi bi-send text-primary me-1"></i>
                          <span className="d-none d-md-inline">Despachar</span>
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-light border px-2 py-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIncident(item);
                        }}
                        title="Ver detalhes"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveFaultsTable;
