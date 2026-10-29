// Dados estruturados da plataforma The Otis Digital Bridge

export const INITIAL_INCIDENTS = [
  {
    id: "INC-2026-001",
    elevatorId: "E-9942",
    building: "Willis Tower",
    location: "Willis Tower, 42º Andar",
    carNumber: "Cabine 04 (Expressa)",
    type: "Passageiro Preso",
    severity: "CRÍTICO",
    status: "Em Rota",
    reportedAt: "Há 12 minutos",
    timestamp: Date.now() - 12 * 60 * 1000,
    technician: "Marcus Vane (Equipe Alpha)",
    eta: "8 min (4.2 km)",
    description: "Parada abrupta no 42º andar com 3 passageiros retidos. Sistema de ventilação operando normalmente.",
    history: [
      { date: "15/08/2026", event: "Manutenção Preventiva Semestral", tech: "Carlos Lima" },
      { date: "02/07/2026", event: "Calibração dos Sensores de Abertura de Porta", tech: "Marcus Vane" },
      { date: "19/04/2026", event: "Substituição de Sapata de Freio Secundária", tech: "Ana Ribeiro" }
    ],
    telemetry: {
      voltage: "380V Nominal",
      tempMotor: "68°C (Estável)",
      doorCycles: "42.850 ciclos",
      healthScore: "74%"
    }
  },
  {
    id: "INC-2026-002",
    elevatorId: "E-1025",
    building: "Tribune East",
    location: "Tribune East, 12º Andar",
    carNumber: "Cabine 02",
    type: "Sensor de Porta",
    severity: "ALERTA",
    status: "Aberto",
    reportedAt: "Há 25 minutos",
    timestamp: Date.now() - 25 * 60 * 1000,
    technician: "Não atribuído",
    eta: "--",
    description: "Porta do 12º andar com fechamento lento e repetição de ciclos de abertura.",
    history: [
      { date: "10/08/2026", event: "Limpeza de canaletas e lubrificação", tech: "Carlos Lima" }
    ],
    telemetry: {
      voltage: "380V Nominal",
      tempMotor: "55°C",
      doorCycles: "61.200 ciclos",
      healthScore: "88%"
    }
  },
  {
    id: "INC-2026-003",
    elevatorId: "E-7731",
    building: "Aon Center",
    location: "Aon Center, 1º Subsolo",
    carNumber: "Cabine 08 (Carga)",
    type: "Falha de Tração",
    severity: "CRÍTICO",
    status: "Em Atendimento",
    reportedAt: "Há 34 minutos",
    timestamp: Date.now() - 34 * 60 * 1000,
    technician: "Roberto Silva",
    eta: "No local",
    description: "Desarme do inversor de frequência durante descida com carga pesada.",
    history: [
      { date: "20/06/2026", event: "Troca de óleo da máquina de tração", tech: "Roberto Silva" }
    ],
    telemetry: {
      voltage: "372V (Oscilação)",
      tempMotor: "82°C (Elevada)",
      doorCycles: "19.400 ciclos",
      healthScore: "62%"
    }
  },
  {
    id: "INC-2026-004",
    elevatorId: "E-5520",
    building: "Water Tower Pl",
    location: "Water Tower Pl, 4º Andar",
    carNumber: "Cabine 01",
    type: "Interrupção de Energia",
    severity: "ALERTA",
    status: "Aberto",
    reportedAt: "Há 48 minutos",
    timestamp: Date.now() - 48 * 60 * 1000,
    technician: "Não atribuído",
    eta: "--",
    description: "Transição para o gerador de emergência causou reinício do controlador central.",
    history: [
      { date: "05/08/2026", event: "Inspeção semestral do quadro de comando", tech: "Juliana Mendes" }
    ],
    telemetry: {
      voltage: "380V",
      tempMotor: "50°C",
      doorCycles: "35.100 ciclos",
      healthScore: "91%"
    }
  },
  {
    id: "INC-2026-005",
    elevatorId: "E-2198",
    building: "The Franklin",
    location: "The Franklin, 33º Andar",
    carNumber: "Cabine 06",
    type: "Ruído Mecânico Anômalo",
    severity: "ALERTA",
    status: "Aberto",
    reportedAt: "Há 1h 10min",
    timestamp: Date.now() - 70 * 60 * 1000,
    technician: "Não atribuído",
    eta: "--",
    description: "Vibração acústica detectada pelo sensor IoT no contrapeso da torre norte.",
    history: [
      { date: "12/05/2026", event: "Aperto de fixações estruturais", tech: "Carlos Lima" }
    ],
    telemetry: {
      voltage: "380V",
      tempMotor: "58°C",
      doorCycles: "54.000 ciclos",
      healthScore: "85%"
    }
  },
  {
    id: "INC-2026-006",
    elevatorId: "E-4410",
    building: "North Pier Apt.",
    location: "North Pier Apt., 2º Subsolo",
    carNumber: "Cabine 01",
    type: "Passageiro Preso",
    severity: "CRÍTICO",
    status: "Aberto",
    reportedAt: "Há 4 minutos",
    timestamp: Date.now() - 4 * 60 * 1000,
    technician: "Não atribuído",
    eta: "--",
    description: "Despacho prioritário: retenção de passageiro reportada no 2º subsolo. Requer intervenção imediata.",
    history: [
      { date: "01/08/2026", event: "Revisão dos trincos de pavimento", tech: "Marcus Vane" }
    ],
    telemetry: {
      voltage: "380V",
      tempMotor: "60°C",
      doorCycles: "28.300 ciclos",
      healthScore: "78%"
    }
  }
];

export const FLEET_BUILDINGS = [
  { id: "b1", name: "Willis Tower", activeFaults: 1, severity: "CRÍTICO", elevatorsCount: 16 },
  { id: "b2", name: "Tribune East", activeFaults: 1, severity: "ALERTA", elevatorsCount: 8 },
  { id: "b3", name: "Aon Center", activeFaults: 1, severity: "CRÍTICO", elevatorsCount: 12 },
  { id: "b4", name: "Water Tower Pl", activeFaults: 1, severity: "ALERTA", elevatorsCount: 10 },
  { id: "b5", name: "The Franklin", activeFaults: 1, severity: "ALERTA", elevatorsCount: 14 },
  { id: "b6", name: "North Pier Apt.", activeFaults: 1, severity: "CRÍTICO", elevatorsCount: 6 },
  { id: "b7", name: "Metropolitan Plaza", activeFaults: 0, severity: "NORMAL", elevatorsCount: 18 }
];

export const MATURITY_STAGES = [
  {
    step: 1,
    title: "Informatização",
    status: "Concluído",
    badgeClass: "bg-secondary",
    description: "Eliminação total de formulários em papel. Registro padronizado de ocorrências técnicas em banco de dados estruturado."
  },
  {
    step: 2,
    title: "Conectividade",
    status: "Concluído",
    badgeClass: "bg-secondary",
    description: "Interligação direta entre canais de atendimento, técnicos de campo através de dispositivos móveis e centro de comando."
  },
  {
    step: 3,
    title: "Visibilidade",
    status: "Fase Atual",
    badgeClass: "bg-danger",
    highlight: true,
    description: "Plataforma BRIDGE com dados em tempo real, painéis executivos com cálculo do MTTR, SLA dinâmico e triagem cirúrgica de campo."
  },
  {
    step: 4,
    title: "Transparência",
    status: "Próxima Etapa",
    badgeClass: "bg-light text-dark border",
    description: "Diagnóstico profundo das causas raiz de falhas em elevadores, correlação de desgaste por tráfego e análise de gargalos logísticos."
  },
  {
    step: 5,
    title: "Previsão",
    status: "Visão Indústria 4.0",
    badgeClass: "bg-light text-dark border",
    description: "Manutenção Preditiva via sensores IoT e inteligência artificial que emite ordens de reparo preventivo antes da retenção de passageiros."
  }
];
