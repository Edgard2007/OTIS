export const INCIDENT_SEVERITIES = Object.freeze({
  CRITICAL: 'CRÍTICO',
  WARNING: 'ALERTA',
  NORMAL: 'NORMAL'
});

export const SLA_TARGET_MINUTES = Object.freeze({
  [INCIDENT_SEVERITIES.CRITICAL]: 30,
  [INCIDENT_SEVERITIES.WARNING]: 120,
  [INCIDENT_SEVERITIES.NORMAL]: 240
});

export function normalizeSeverity(value) {
  if (value === 'CRITICAL') return INCIDENT_SEVERITIES.CRITICAL;
  if (value === 'WARNING') return INCIDENT_SEVERITIES.WARNING;
  return value || INCIDENT_SEVERITIES.NORMAL;
}

export function normalizeIncident(incident) {
  return {
    ...incident,
    severity: normalizeSeverity(incident.severity),
    timestamp: Number(incident.timestamp) || Date.now()
  };
}

export function calculateElapsedMinutes(startTimestamp, endTimestamp = Date.now()) {
  const elapsedMilliseconds = Math.max(0, endTimestamp - startTimestamp);
  return elapsedMilliseconds / 60000;
}

export function calculateIncidentMetrics(incidents, now = Date.now()) {
  const normalizedIncidents = incidents.map(normalizeIncident);
  const openIncidents = normalizedIncidents.filter(incident => incident.status !== 'Concluído');
  const completedIncidents = normalizedIncidents.filter(
    incident => incident.status === 'Concluído' && Number.isFinite(Number(incident.resolvedAt))
  );

  const completedDurations = completedIncidents.map(incident =>
    calculateElapsedMinutes(incident.timestamp, Number(incident.resolvedAt))
  );

  const mttrMinutes = completedDurations.length
    ? completedDurations.reduce((total, duration) => total + duration, 0) / completedDurations.length
    : null;

  const slaEligibleIncidents = normalizedIncidents.filter(incident => {
    const endTimestamp = incident.status === 'Concluído' && Number.isFinite(Number(incident.resolvedAt))
      ? Number(incident.resolvedAt)
      : now;
    return calculateElapsedMinutes(incident.timestamp, endTimestamp) >= 0;
  });

  const slaCompliantIncidents = slaEligibleIncidents.filter(incident => {
    const endTimestamp = incident.status === 'Concluído' && Number.isFinite(Number(incident.resolvedAt))
      ? Number(incident.resolvedAt)
      : now;
    return calculateElapsedMinutes(incident.timestamp, endTimestamp) <=
      SLA_TARGET_MINUTES[normalizeSeverity(incident.severity)];
  });

  return {
    openCount: openIncidents.length,
    criticalOpenCount: openIncidents.filter(
      incident => normalizeSeverity(incident.severity) === INCIDENT_SEVERITIES.CRITICAL
    ).length,
    mttrMinutes,
    slaPercentage: slaEligibleIncidents.length
      ? (slaCompliantIncidents.length / slaEligibleIncidents.length) * 100
      : 100,
    completedCount: completedIncidents.length
  };
}
