import React from 'react';
import { MATURITY_STAGES } from '../../data/initialData';

function MaturityRoadmap({ onBackToDashboard }) {
  return (
    <div className="container px-3 py-4">
      {/* Cabeçalho da Seção (Slide 7) */}
      <div className="text-center mb-5">
        <span className="badge bg-pink text-white text-uppercase px-3 py-1 mb-2 fw-bold" style={{ fontSize: '0.8rem' }}>
          Indústria 4.0 Aplicada à Mobilidade Vertical
        </span>
        <h1 className="fw-black display-6 text-dark mb-2">
          Jornada de Maturidade Digital
        </h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: '780px' }}>
          "Nossa base de dados estruturada hoje é o alicerce absoluto para a <strong>Manutenção Preditiva via IoT</strong> de amanhã."
        </p>
      </div>

      {/* Linha do Tempo Horizontal / Steps (Slide 7) */}
      <div className="card-otis p-4 p-lg-5 mb-5 shadow-sm">
        <div className="row g-4 justify-content-center align-items-start position-relative">
          {MATURITY_STAGES.map((stage, idx) => {
            return (
              <div key={stage.step} className="col-12 col-md-2 text-center position-relative">
                {/* Círculo do Step */}
                <div
                  className={`timeline-circle mx-auto mb-3 ${
                    stage.highlight
                      ? 'active'
                      : stage.step < 3
                      ? 'completed'
                      : 'future'
                  }`}
                >
                  {stage.step}
                </div>

                {/* Título do Step */}
                <h6 className="fw-bold text-dark mb-1">{stage.title}</h6>

                {/* Badge de Status */}
                <span className={`badge ${stage.badgeClass} mb-2 small`} style={{ fontSize: '0.7rem' }}>
                  {stage.status}
                </span>

                {/* Descrição Curta */}
                <p className="text-muted small lh-sm" style={{ fontSize: '0.78rem' }}>
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card da Visão de Futuro (Slide 8: O Futuro é Antecipação) */}
      <div
        className="card-otis p-4 p-lg-5 text-white position-relative overflow-hidden mb-4"
        style={{
          background: 'linear-gradient(135deg, #0d233a 0%, #1a365d 60%, #ed145b 150%)',
          borderRadius: '16px'
        }}
      >
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <span className="badge bg-danger text-uppercase px-2 py-1 mb-2">
              Horizonte Tecnológico OTIS
            </span>
            <h2 className="display-6 fw-bold mb-3">
              O Futuro é Antecipação
            </h2>
            <p className="fs-5 text-light mb-4" style={{ lineHeight: '1.6' }}>
              Onde a Inteligência Artificial e a telemetria em tempo real preveem anomalias de desgaste e emitem alertas cirúrgicos de reparo <strong>muito antes de qualquer passageiro ficar preso</strong>.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-center mt-4 mt-lg-0">
            <div className="bg-white bg-opacity-10 p-4 rounded-4 border border-white border-opacity-25">
              <i className="bi bi-robot fs-1 text-pink mb-2 d-block"></i>
              <h5 className="fw-bold">Status da Plataforma BRIDGE</h5>
              <p className="small text-light mb-3">
                Fase 3 consolidada: Visibilidade plena de despacho, centralização e governança operacional de dados.
              </p>
              <button
                className="btn btn-otis-pink btn-sm w-100 fw-bold shadow"
                onClick={onBackToDashboard}
              >
                <i className="bi bi-speedometer2 me-1"></i> Explorar Painel da Frota
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaturityRoadmap;
