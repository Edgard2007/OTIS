import React, { useState, useEffect } from 'react';
import { INCIDENT_SEVERITIES, calculateElapsedMinutes } from '../../utils/incidentMetrics';

function TechnicianView({
  incidents,
  activeIncidentId,
  onUpdateIncidentStatus
}) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [qrScanned, setQrScanned] = useState(false);
  const [repairNotes, setRepairNotes] = useState('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dispatch'); // 'dispatch' | 'telemetry' | 'history' | 'qr'

  const currentIncident = incidents.find(i => i.id === activeIncidentId) ||
    incidents.find(i => i.severity === INCIDENT_SEVERITIES.CRITICAL && i.status !== 'Concluído') ||
    incidents[0];

  useEffect(() => {
    if (!currentIncident) return undefined;

    const updateTimer = () => {
      const endTimestamp = currentIncident.resolvedAt || Date.now();
      setTimerSeconds(Math.floor(calculateElapsedMinutes(currentIncident.timestamp, endTimestamp) * 60));
    };

    updateTimer();
    if (currentIncident.status === 'Concluído') return undefined;

    const interval = setInterval(() => {
      updateTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIncident]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptDispatch = () => {
    onUpdateIncidentStatus(currentIncident.id, 'Em Rota');
  };

  const handlePerformCheckIn = () => {
    setQrScanned(true);
    onUpdateIncidentStatus(currentIncident.id, 'Em Atendimento');
  };

  const handleFinishRepair = () => {
    onUpdateIncidentStatus(currentIncident.id, 'Concluído', repairNotes.trim());
    setShowCompleteModal(false);
  };

  return (
    <div className="container-fluid px-4 px-lg-5 py-4">
      {/* Cabeçalho do Técnico Minimalista e Espaçoso */}
      <div className="card-otis p-4 mb-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
            alt="Foto do Técnico Marcus Vane"
            className="rounded-circle border border-secondary shadow-sm"
            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
          />
          <div>
            <div className="d-flex align-items-center gap-2">
              <h4 className="fw-bold text-dark mb-0 fs-5">Marcus Vane</h4>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
                Disponível em Campo
              </span>
            </div>
            <div className="text-secondary small">
              Técnico Especialista de Campo • Equipe Alpha 01 • Região Central
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4 text-secondary small">
          <div>
            <span className="d-block text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Chamado Atribuído</span>
            <strong className="text-dark fs-6">{currentIncident.elevatorId}</strong>
          </div>
          <div>
            <span className="d-block text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Tempo desde abertura</span>
            <strong className="text-danger font-monospace fs-6">{formatTimer(timerSeconds)}</strong>
          </div>
          <div>
            <span className="d-block text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Status da Ação</span>
            <span className="badge bg-light text-dark border">{currentIncident.status}</span>
          </div>
        </div>
      </div>

      {/* Navegação de Abas em Mobile e Desktop */}
      <div className="mb-4">
        <ul className="technician-tabs nav nav-pills gap-2 border-bottom">
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${activeTab === 'dispatch' ? 'active bg-pink fw-semibold' : 'text-secondary bg-white border'}`}
              onClick={() => setActiveTab('dispatch')}
            >
              <i className="bi bi-geo-alt me-2"></i>
              Despacho & Rota
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${activeTab === 'telemetry' ? 'active bg-pink fw-semibold' : 'text-secondary bg-white border'}`}
              onClick={() => setActiveTab('telemetry')}
            >
              <i className="bi bi-cpu me-2"></i>
              Telemetria & Diagnóstico
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${activeTab === 'history' ? 'active bg-pink fw-semibold' : 'text-secondary bg-white border'}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="bi bi-clock-history me-2"></i>
              Histórico da Cabine
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${activeTab === 'qr' ? 'active bg-pink fw-semibold' : 'text-secondary bg-white border'}`}
              onClick={() => setActiveTab('qr')}
            >
              <i className="bi bi-qr-code-scan me-2"></i>
              Check-in no Local (QR)
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo Espaçoso conforme a Aba Selecionada */}
      {activeTab === 'dispatch' && (
        <div className="row g-4">
          {/* Card Principal: Alerta e Rota */}
          <div className="col-12 col-lg-8">
            <div className="card-otis overflow-hidden h-100 d-flex flex-column">
              {/* Alerta de Gravidade */}
              <div className={`p-4 text-white d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 ${
                currentIncident.severity === INCIDENT_SEVERITIES.CRITICAL ? 'bg-danger' : 'bg-warning text-dark'
              }`}>
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-exclamation-triangle-fill fs-3"></i>
                  <div>
                    <h5 className="mb-0 fw-bold fs-6">
                      {currentIncident.type === 'Passageiro Preso'
                        ? 'Crítico: Passageiro Retido na Cabine'
                        : `Ocorrência Prioritária: ${currentIncident.type}`}
                    </h5>
                    <small className="opacity-75">{currentIncident.building} • {currentIncident.location}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="small">Cronômetro SLA:</span>
                  <span className="badge bg-dark text-white font-monospace fs-6 px-3 py-2">
                    {formatTimer(timerSeconds)}
                  </span>
                </div>
              </div>

              {/* Rota no Mapa */}
              <div className="p-4 bg-light flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Trajeto Otimizado de Deslocamento</h6>
                    <small className="text-muted">Cálculo de rota direta com menor tempo de tráfego</small>
                  </div>
                  <span className="badge bg-white text-dark border px-3 py-2 fs-6">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {currentIncident.eta || '4.2 km até o local'}
                  </span>
                </div>

                <div
                  className="position-relative rounded-4 overflow-hidden d-flex align-items-center justify-content-center shadow-inner"
                  style={{
                    height: '280px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white'
                  }}
                >
                  <div
                    className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill bg-white text-dark small fw-bold shadow"
                    style={{ fontSize: '0.8rem', zIndex: 3 }}
                  >
                    <i className="bi bi-car-front-fill text-danger me-1"></i>
                    4.2 km até {currentIncident.building}
                  </div>

                  <svg className="w-100 h-100" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <path
                      d="M 60 220 Q 220 160 300 120 T 520 60"
                      fill="none"
                      stroke="#ed145b"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="220" r="8" fill="#38bdf8" />
                    <circle cx="520" cy="60" r="10" fill="#ed145b" />
                  </svg>

                  <div className="position-absolute" style={{ bottom: '20px', left: '40px' }}>
                    <span className="badge bg-primary px-3 py-2">Sua Posição</span>
                  </div>

                  <div className="position-absolute text-center" style={{ top: '30px', right: '50px' }}>
                    <i className="bi bi-geo-alt-fill text-danger fs-2"></i>
                    <div className="badge bg-dark px-2 py-1">{currentIncident.elevatorId}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Lateral: Ações de Campo */}
          <div className="col-12 col-lg-4">
            <div className="card-otis p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <span className="badge bg-light text-secondary border px-2 py-1 mb-2">
                  Etapa Operacional
                </span>
                <h5 className="fw-bold text-dark mb-3">Ações de Atendimento</h5>
                <p className="text-secondary small mb-4">
                  {currentIncident.description}
                </p>
              </div>

              <div>
                {currentIncident.status === 'Aberto' && (
                  <button
                    className="btn btn-otis-navy w-100 py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow"
                    onClick={handleAcceptDispatch}
                  >
                    <i className="bi bi-check2-circle fs-5"></i>
                    <span>Aceitar Chamado</span>
                  </button>
                )}

                {currentIncident.status === 'Em Rota' && (
                  <div className="d-flex flex-column gap-3">
                    <div className="alert alert-info py-3 mb-0 small">
                      <i className="bi bi-speedometer2 me-2 fs-5"></i>
                      Deslocamento em andamento. Ao chegar ao local, realize a confirmação.
                    </div>
                    <button
                      className="btn btn-otis-pink w-100 py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow"
                      onClick={() => {
                        setActiveTab('qr');
                        handlePerformCheckIn();
                      }}
                    >
                      <i className="bi bi-qr-code-scan fs-5"></i>
                      <span>Confirmar Chegada (Check-in)</span>
                    </button>
                  </div>
                )}

                {currentIncident.status === 'Em Atendimento' && (
                  <div className="d-flex flex-column gap-3">
                    <div className="alert alert-warning py-3 mb-0 small">
                      <i className="bi bi-wrench-adjustable me-2 fs-5"></i>
                      Em intervenção técnica no local. Proceda com a liberação da cabine.
                    </div>
                    <button
                      className="btn btn-success w-100 py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow"
                      onClick={() => setShowCompleteModal(true)}
                    >
                      <i className="bi bi-check-circle-fill fs-5"></i>
                      <span>Finalizar Reparo e Concluir</span>
                    </button>
                  </div>
                )}

                {currentIncident.status === 'Concluído' && (
                  <div className="alert alert-success py-4 text-center mb-0">
                    <i className="bi bi-shield-check fs-2 text-success d-block mb-2"></i>
                    <h6 className="fw-bold mb-1">Chamado Concluído</h6>
                    <small className="text-muted">Elevador operando em condições normais de segurança.</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aba de Telemetria */}
      {activeTab === 'telemetry' && (
        <div className="card-otis p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
            <div>
              <h5 className="fw-bold text-dark mb-0">Telemetria de Sensores IoT</h5>
              <small className="text-muted">Diagnóstico contínuo do elevador {currentIncident.elevatorId}</small>
            </div>
            <span className="badge bg-light text-dark border px-3 py-2 fs-6">
              Saúde do Equipamento: {currentIncident.telemetry?.healthScore || '74%'}
            </span>
          </div>

          <div className="row g-4 text-center">
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light border">
                <span className="text-secondary small fw-semibold text-uppercase d-block mb-2">Tensão Elétrica</span>
                <div className="fs-4 fw-bold text-dark">{currentIncident.telemetry?.voltage || '380V'}</div>
                <small className="text-success">Alimentação estável</small>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light border">
                <span className="text-secondary small fw-semibold text-uppercase d-block mb-2">Temp. do Motor</span>
                <div className="fs-4 fw-bold text-dark">{currentIncident.telemetry?.tempMotor || '68°C'}</div>
                <small className="text-muted">Dentro da faixa segura</small>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light border">
                <span className="text-secondary small fw-semibold text-uppercase d-block mb-2">Ciclos de Porta</span>
                <div className="fs-4 fw-bold text-dark">{currentIncident.telemetry?.doorCycles || '42.850'}</div>
                <small className="text-muted">Desgaste monitorado</small>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light border">
                <span className="text-secondary small fw-semibold text-uppercase d-block mb-2">Previsão Preventiva</span>
                <div className="fs-4 fw-bold text-primary">Normal</div>
                <small className="text-muted">Sem anomalias preditivas</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aba de Histórico */}
      {activeTab === 'history' && (
        <div className="card-otis p-4 p-md-5">
          <h5 className="fw-bold text-dark pb-3 border-bottom mb-4">
            Histórico de Intervenções Anteriores ({currentIncident.elevatorId})
          </h5>
          <div className="list-group list-group-flush">
            {currentIncident.history && currentIncident.history.map((h, i) => (
              <div key={i} className="list-group-item px-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold text-dark mb-1">{h.event}</h6>
                  <span className="text-muted small">Técnico Responsável: {h.tech}</span>
                </div>
                <span className="badge bg-light text-secondary border px-3 py-2">
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aba de QR Code */}
      {activeTab === 'qr' && (
        <div className="card-otis p-4 p-md-5 text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h5 className="fw-bold text-dark mb-2">Check-in de Campo no Painel de Controle</h5>
          <p className="text-secondary small mb-4">
            Aponte para a tag digital fixada no quadro de força do elevador <strong>{currentIncident.elevatorId}</strong>.
          </p>

          <div
            className="border border-2 border-secondary border-opacity-25 rounded-4 p-4 mx-auto mb-4 d-flex flex-column align-items-center justify-content-center"
            style={{
              maxWidth: '220px',
              height: '180px',
              background: '#f8fafc'
            }}
          >
            <i className="bi bi-qr-code fs-1 text-secondary"></i>
            <span className="badge bg-dark mt-3 px-3 py-1 font-monospace">
              OTIS-{currentIncident.elevatorId}
            </span>
          </div>

          {qrScanned ? (
            <div className="alert alert-success py-3 mb-0">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              Check-in realizado com sucesso! Atendimento registrado.
            </div>
          ) : (
            <button
              className="btn btn-otis-pink py-3 px-4 fw-semibold shadow-sm"
              onClick={handlePerformCheckIn}
            >
              <i className="bi bi-camera me-2"></i>
              Simular Leitura do QR Code
            </button>
          )}
        </div>
      )}

      {/* Modal de Conclusão */}
      {showCompleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-navy text-white p-4">
                <h5 className="modal-title fs-6 fw-bold">Conclusão de Chamado Técnico</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCompleteModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-secondary small mb-3">
                  Registre o laudo das ações executadas para arquivamento estruturado e recálculo do tempo de resposta da frota:
                </p>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Laudo Técnico de Intervenção</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ex: Reset do inversor, liberação manual dos passageiros sem intercorrências, teste de nivelamento concluído com sucesso."
                    value={repairNotes}
                    onChange={(e) => setRepairNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer bg-light p-3">
                <button
                  type="button"
                  className="btn btn-secondary px-3"
                  onClick={() => setShowCompleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success fw-bold px-4"
                  onClick={handleFinishRepair}
                >
                  <i className="bi bi-check2-circle me-1"></i> Concluir Atendimento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianView;
