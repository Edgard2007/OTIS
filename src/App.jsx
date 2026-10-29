import React, { useState, useEffect } from 'react';
import './App.css';
import { INITIAL_INCIDENTS } from './data/initialData';
import Navbar from './components/Navbar';
import EmergencyBanner from './components/EmergencyBanner';
import LeadershipView from './components/leadership/LeadershipView';
import TechnicianView from './components/technician/TechnicianView';
import MaturityRoadmap from './components/maturity/MaturityRoadmap';
import NewIncidentModal from './components/leadership/NewIncidentModal';
import Footer from './components/Footer';
import { normalizeIncident, INCIDENT_SEVERITIES } from './utils/incidentMetrics';

function App() {
  // Estado de Ocorrências com persistência em localStorage para teste no Vercel
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('otis_bridge_incidents');
    if (saved) {
      try {
        return JSON.parse(saved).map(normalizeIncident);
      } catch (err) {
        console.error('Erro ao ler localStorage', err);
      }
    }
    return INITIAL_INCIDENTS;
  });

  // Controle de Abas: 'leadership' | 'technician' | 'maturity'
  const [activeTab, setActiveTab] = useState('leadership');

  // ID da ocorrência em foco no Portal do Técnico
  const [activeTechIncidentId, setActiveTechIncidentId] = useState(null);

  // Controle do Modal de Cadastro
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Flag de Reconhecimento do Banner de Emergência
  const [emergencyDismissed, setEmergencyDismissed] = useState(false);

  // Sincroniza estado com o localStorage
  useEffect(() => {
    localStorage.setItem('otis_bridge_incidents', JSON.stringify(incidents));
  }, [incidents]);

  // Encontra a ocorrência crítica com passageiro preso ativa
  const criticalIncident = !emergencyDismissed
    ? incidents.find(i => i.severity === INCIDENT_SEVERITIES.CRITICAL && i.type === 'Passageiro Preso' && i.status !== 'Concluído')
    : null;

  // Criação de nova ocorrência
  const handleSaveIncident = (newIncident) => {
    setIncidents(prev => [newIncident, ...prev]);
    // Se for crítica, reativa o banner
    if (newIncident.severity === INCIDENT_SEVERITIES.CRITICAL) {
      setEmergencyDismissed(false);
    }
  };

  // Atualização de status da ocorrência (pelo técnico ou liderança)
  const handleUpdateIncidentStatus = (incidentId, newStatus, notes) => {
    setIncidents(prev => prev.map(item => {
      if (item.id === incidentId) {
        const updatedHistory = [...(item.history || [])];
        if (notes) {
          updatedHistory.unshift({
            date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            event: `Intervenção Técnica: ${notes}`,
            tech: 'Marcus Vane (Equipe Alpha)'
          });
        }
        return {
          ...item,
          status: newStatus,
          resolvedAt: newStatus === 'Concluído' ? Date.now() : item.resolvedAt,
          history: updatedHistory
        };
      }
      return item;
    }));
  };

  // Ação de despachar chamado específico para a visão do técnico
  const handleDispatchToTech = (incident) => {
    setActiveTechIncidentId(incident.id);
    setActiveTab('technician');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Barra de Navegação Superior com Alternância de Perfis */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewIncident={() => setIsNewModalOpen(true)}
        unreadAlertsCount={incidents.filter(i => i.severity === INCIDENT_SEVERITIES.CRITICAL && i.status === 'Aberto').length}
      />

      {/* Banner de Despacho de Emergência (Slide 6) */}
      <EmergencyBanner
        criticalIncident={criticalIncident}
        onAcknowledge={() => setEmergencyDismissed(true)}
        onDispatchToTech={handleDispatchToTech}
      />

      {/* Conteúdo Dinâmico conforme a Aba Selecionada */}
      <main className="flex-grow-1">
        {activeTab === 'leadership' && (
          <LeadershipView
            incidents={incidents}
            onDispatchToTech={handleDispatchToTech}
            onOpenNewIncident={() => setIsNewModalOpen(true)}
          />
        )}

        {activeTab === 'technician' && (
          <TechnicianView
            incidents={incidents}
            activeIncidentId={activeTechIncidentId}
            onUpdateIncidentStatus={handleUpdateIncidentStatus}
            onSelectIncident={setActiveTechIncidentId}
          />
        )}

        {activeTab === 'maturity' && (
          <MaturityRoadmap
            onBackToDashboard={() => setActiveTab('leadership')}
          />
        )}
      </main>

      {/* Modal de Cadastro de Ocorrência Estruturada */}
      <NewIncidentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSaveIncident={handleSaveIncident}
      />

      {/* Rodapé Institucional OTIS */}
      <Footer />
    </div>
  );
}

export default App;
