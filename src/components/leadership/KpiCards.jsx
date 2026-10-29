import React, { useState } from 'react';
import { calculateIncidentMetrics } from '../../utils/incidentMetrics';

function KpiCards({ incidents }) {
  const [showFormula, setShowFormula] = useState(false);
  const { openCount, criticalOpenCount, mttrMinutes, slaPercentage, completedCount } =
    calculateIncidentMetrics(incidents);
  const formattedMttr = mttrMinutes === null
    ? 'Sem dados'
    : `${(mttrMinutes / 60).toFixed(1)}h`;

  return (
    <div className="row g-4 mb-4">
      {/* KPI 1: Ocorrências Ativas */}
      <div className="col-12 col-md-4">
        <div className="card-otis p-4 h-100 position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
              Ocorrências em Aberto
            </span>
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 small">
              {criticalOpenCount} Críticos
            </span>
          </div>
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="display-5 fw-bold text-dark">{openCount}</span>
            <span className="text-muted small">elevadores em atenção</span>
          </div>
          <div className="text-muted small mb-3">
            <i className="bi bi-activity text-danger me-1"></i> Total de chamados não concluídos
          </div>
          <div className="progress" style={{ height: '5px' }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${Math.min(100, (openCount / 10) * 100)}%` }}
              aria-valuenow={openCount}
              aria-valuemin="0"
              aria-valuemax="20"
            ></div>
          </div>
        </div>
      </div>

      {/* KPI 2: MTTR com Fórmula */}
      <div className="col-12 col-md-4">
        <div className="card-otis p-4 h-100 position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
              Tempo Médio de Reparo (MTTR)
            </span>
            <button
              className="btn btn-sm btn-link text-decoration-none text-muted p-0"
              onClick={() => setShowFormula(!showFormula)}
              title="Exibir fórmula de cálculo"
            >
              <i className="bi bi-info-circle fs-6"></i>
            </button>
          </div>
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="display-5 fw-bold text-dark">{formattedMttr}</span>
            <span className="badge bg-pink text-white fw-bold px-2 py-1 small">
              {completedCount} concluído(s)
            </span>
          </div>
          <div className="text-success small mb-3">
            <i className="bi bi-stopwatch me-1"></i> Calculado com abertura e conclusão do chamado
          </div>
          <div className="progress" style={{ height: '5px' }}>
            <div
              className="progress-bar bg-pink"
              role="progressbar"
              style={{ width: '45%' }}
              aria-valuenow="45"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          {showFormula && (
            <div className="mt-3 p-3 rounded-3 bg-dark text-white text-center font-monospace small">
              <div className="text-pink fw-bold">MTTR = Σ Tempo de Inatividade / Total de Reparos</div>
              <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
                Fórmula oficial do painel de governança
              </span>
            </div>
          )}
        </div>
      </div>

      {/* KPI 3: Conformidade com SLA */}
      <div className="col-12 col-md-4">
        <div className="card-otis p-4 h-100 position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
              Conformidade de SLA
            </span>
            <i className="bi bi-shield-check text-success fs-5"></i>
          </div>
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="display-5 fw-bold text-dark">{slaPercentage.toFixed(1)}%</span>
            <span className="text-muted small">Meta: 97.5%</span>
          </div>
          <div className="text-success small mb-3">
            <i className="bi bi-check-circle-fill me-1"></i> Operação dentro do padrão contratual
          </div>
          <div className="progress" style={{ height: '5px' }}>
            <div
              className="progress-bar bg-navy"
              role="progressbar"
              style={{ width: `${slaPercentage}%` }}
              aria-valuenow={slaPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KpiCards;
