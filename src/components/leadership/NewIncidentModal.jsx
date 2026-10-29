import React, { useState } from 'react';
import { INCIDENT_SEVERITIES } from '../../utils/incidentMetrics';

function NewIncidentModal({ isOpen, onClose, onSaveIncident }) {
  const [formData, setFormData] = useState({
    elevatorId: '',
    building: 'Willis Tower',
    floor: '10º Andar',
    carNumber: 'Cabine 01',
    type: 'Passageiro Preso',
    severity: INCIDENT_SEVERITIES.CRITICAL,
    description: '',
    technician: 'Marcus Vane (Equipe Alpha)'
  });
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormError('');
    if (name === 'type' && value === 'Passageiro Preso') {
      setFormData(prev => ({ ...prev, [name]: value, severity: INCIDENT_SEVERITIES.CRITICAL }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const elevatorId = formData.elevatorId.trim().slice(0, 30);
    const description = formData.description.trim().slice(0, 500);
    if (!elevatorId || !description) {
      setFormError('Informe a identificação do elevador e a descrição da ocorrência.');
      return;
    }

    const newIncident = {
      id: `INC-${crypto.randomUUID()}`,
      elevatorId: elevatorId.toUpperCase(),
      building: formData.building,
      location: `${formData.building}, ${formData.floor}`,
      carNumber: formData.carNumber,
      type: formData.type,
      severity: formData.severity,
      status: 'Aberto',
      reportedAt: 'Agora',
      timestamp: Date.now(),
      technician: formData.technician,
      eta: 'Aguardando despacho',
      description,
      history: [
        { date: new Date().toLocaleDateString('pt-BR'), event: 'Abertura de Chamado Digital', tech: 'Sistema BRIDGE' }
      ],
      telemetry: {
        voltage: '380V Nominal',
        tempMotor: '62°C',
        doorCycles: '31.400 ciclos',
        healthScore: formData.severity === INCIDENT_SEVERITIES.CRITICAL ? '58%' : '80%'
      }
    };

    onSaveIncident(newIncident);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-navy text-white p-4">
            <h5 className="modal-title fs-5 fw-bold">
              <i className="bi bi-plus-circle-fill text-pink me-2"></i>
              Registrar Ocorrência Operacional (OTIS BRIDGE)
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Fechar"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4 p-lg-5">
              {formError && (
                <div className="alert alert-danger py-2" role="alert">
                  {formError}
                </div>
              )}
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Identificação do Elevador *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg fs-6"
                    placeholder="Ex: E-8820"
                    name="elevatorId"
                    value={formData.elevatorId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Edifício / Complexo</label>
                  <select
                    className="form-select form-select-lg fs-6"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                  >
                    <option value="Willis Tower">Willis Tower</option>
                    <option value="Tribune East">Tribune East</option>
                    <option value="Aon Center">Aon Center</option>
                    <option value="Water Tower Pl">Water Tower Pl</option>
                    <option value="The Franklin">The Franklin</option>
                    <option value="North Pier Apt.">North Pier Apt.</option>
                    <option value="Metropolitan Plaza">Metropolitan Plaza</option>
                  </select>
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold text-secondary">Andar / Pavimento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 42º Andar ou 2º Subsolo"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold text-secondary">Identificação da Cabine</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Cabine 04 (Expressa)"
                    name="carNumber"
                    value={formData.carNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Tipo de Falha ou Chamado</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="Passageiro Preso">Passageiro Preso (Emergência)</option>
                    <option value="Falha de Tração">Falha de Tração Mecânica</option>
                    <option value="Interrupção de Energia">Interrupção de Energia</option>
                    <option value="Sensor de Porta">Sensor de Porta / Fechamento</option>
                    <option value="Ruído Mecânico Anômalo">Ruído Mecânico Anômalo</option>
                    <option value="Solicitação Geral de Cliente">Solicitação Geral de Cliente</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Nível de Severidade</label>
                  <select
                    className="form-select"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    <option value="CRÍTICO">CRÍTICO (Prioridade Máxima)</option>
                    <option value="ALERTA">ALERTA (Aviso Preventivo)</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-secondary">Descrição Técnica dos Sintomas *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="description"
                    placeholder="Descreva o que foi observado pelo cliente ou pelos sensores IoT..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light p-4">
              <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-otis-pink px-4 fw-semibold shadow-sm">
                <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                Salvar Ocorrência
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewIncidentModal;
