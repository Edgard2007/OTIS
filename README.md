# The Otis Digital Bridge - Gestão de Ocorrências e Maturidade Digital

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![FIAP](https://img.shields.io/badge/FIAP-Challenge%202026-ED145B)](https://www.fiap.com.br/)

Projeto desenvolvido para o **Challenge FIAP 2026** em parceria com a **OTIS**, focado na digitalização de processos operacionais, redução drástica do tempo médio de reparo (**MTTR**) e triagem cirúrgica de ocorrências de elevadores.

---

##  Proposta de Valor e Pilares da Solução

A OTIS transporta mais de **2 bilhões de passageiros diariamente**. Nesta escala, qualquer parada não programada ou passageiro retido causa prejuízos financeiros e dano reputacional.

Nossa solução implementa uma **Plataforma de Dupla Operação**:

1. **Portal da Liderança (Dashboard Estratégico & Governança)**:
   - **Métricas em Tempo Real**: Monitoramento de ocorrências abertas, cálculo do **MTTR** somente a partir de chamados concluídos e índice de conformidade com **SLA** calculado a partir do timestamp de abertura, severidade e conclusão.
   - **Fleet Heatmap**: Visualização geoespacial da frota de edifícios e áreas de alta/moderada criticidade.
   - **Active Faults (Lista Viva)**: Relação prioritária de ocorrências classificadas no conjunto único `CRÍTICO`, `ALERTA` e `NORMAL`.
   - **Registro Estruturado**: Formulário para inserção e classificação imediata de ocorrências na base de dados.
   - **Indicadores de Campo**: Ocupação de técnicos (*28/42 on-site*), consumo elétrico (*Grid 1,240 kWh*) e disponibilidade de sensores IoT (*99.98%*).

2. **Portal do Técnico (Despacho Cirúrgico - Mobile-First)**:
   - Interface simulando dispositivo móvel de campo com alternância para tela cheia.
   - **Alerta Imediato de Passageiro Preso** com cronômetro calculado continuamente a partir do timestamp real da ocorrência.
   - **Trajeto e Rota Otimizada**: Cálculo de distância e rota até o edifício.
   - **Ações Rápidas de Campo**: *Aceitar Despacho*, *Check-in via QR Code* no quadro de comando e *Finalizar Reparo com Laudo*.
   - **Histórico & Diagnóstico do Equipamento**: Telemetria de ciclos de porta, temperatura do motor e recomendações preditivas.

3. **Jornada de Maturidade Digital**:
   - Trilha das 5 etapas da Indústria 4.0:
     1. *Informatização* (Eliminação do papel)
     2. *Conectividade* (Interligação entre cliente, central e técnicos)
     3. *Visibilidade* (**Status MVP BRIDGE**)
     4. *Transparência* (Diagnóstico de causa raiz)
     5. *Previsão* (Manutenção Preditiva via IA e IoT para evitar retenção de passageiros)

---

## Tecnologias Utilizadas (Aderência Estrita à Fase 7 FIAP)

Conforme os critérios de avaliação:
- **React.js** (JavaScript puro, hooks `useState` e `useEffect`)
- **Bootstrap 5.3** (Estilização responsiva via CDN, sem dependências de compilação pesadas)
- **Bootstrap Icons** (Iconografia leve e corporativa)
- **Persistência Local (localStorage)**: Permite que avaliadores criem ocorrências, alterem status e finalizem chamados diretamente pelo link da Vercel sem necessidade de backend externo.

---

## Como Executar Localmente

```bash
# 1. Clone ou acesse a pasta do projeto
cd otis-digital-bridge

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: `http://localhost:5173`

## Fluxo de demonstração do MVP

1. No **Painel Liderança**, crie uma ocorrência em **Novo Chamado**.
2. Selecione a ocorrência e use **Despachar** para abrir o **Portal do Técnico**.
3. Aceite o chamado, confirme a chegada e finalize o reparo com um laudo.
4. Observe o cronômetro baseado no horário de abertura e os KPIs de ocorrências abertas, MTTR e SLA reagindo ao ciclo.

O navegador mantém os chamados em `localStorage` para permitir a avaliação do fluxo sem backend. O identificador de cada chamado usa `crypto.randomUUID()` e os erros de formulário aparecem na própria modal.

---

## Deploy na Vercel (Passo a Passo)

O projeto foi configurado com Vite e está 100% pronto para a Vercel:

1. Suba o código para o seu repositório no **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: MVP The Otis Digital Bridge"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. Acesse sua conta no **[Vercel](https://vercel.com)**.
3. Clique em **"Add New..."** $\rightarrow$ **"Project"** e selecione o repositório.
4. As configurações padrão já serão reconhecidas automaticamente:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em **Deploy**. O link público será gerado em instantes para ser colocado no PDF da entrega da FIAP!

---

## 👤 Identificação dos Autores

- **Nomes**: Otávio Miguel Rocha, Edgard Fernandes da Costa e Lucca Miranda 
- **Instituição**: FIAP - Faculdade de Informática e Administração Paulista
- **Projeto**: Challenge 2026 - Parceria OTIS
