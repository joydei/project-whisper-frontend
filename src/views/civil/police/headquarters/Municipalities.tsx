import styles from '../../../../styles/civil/Municipalities.module.css';

interface MunicipalityBreakdown {
  name: string;
  region: string;
  activeEmergencies: number;
  openIncidents: number;
  resolvedMonth: number;
  avgResponseTime: string;
  liaison: string;
}

const municipalities: MunicipalityBreakdown[] = [
  { name: 'Accra Metropolitan', region: 'Greater Accra', activeEmergencies: 4, openIncidents: 45, resolvedMonth: 312, avgResponseTime: '14 min', liaison: 'Daniel Adjei' },
  { name: 'Kumasi Metropolitan', region: 'Ashanti', activeEmergencies: 2, openIncidents: 28, resolvedMonth: 198, avgResponseTime: '19 min', liaison: 'Kwame Mensah' },
  { name: 'Tema Municipal', region: 'Greater Accra', activeEmergencies: 1, openIncidents: 19, resolvedMonth: 145, avgResponseTime: '16 min', liaison: 'Abena Sarpong' },
  { name: 'Tamale Metropolitan', region: 'Northern', activeEmergencies: 0, openIncidents: 12, resolvedMonth: 87, avgResponseTime: '24 min', liaison: 'Ibrahim Alhassan' },
  { name: 'Cape Coast Municipal', region: 'Central', activeEmergencies: 1, openIncidents: 8, resolvedMonth: 65, avgResponseTime: '21 min', liaison: 'Efua Mensah' },
  { name: 'Sekondi-Takoradi Metro', region: 'Western', activeEmergencies: 0, openIncidents: 15, resolvedMonth: 110, avgResponseTime: '18 min', liaison: 'Kofi Asante' },
  { name: 'Sunyani Municipal', region: 'Bono', activeEmergencies: 0, openIncidents: 6, resolvedMonth: 42, avgResponseTime: '28 min', liaison: 'Yaa Boateng' },
  { name: 'Ho Municipal', region: 'Volta', activeEmergencies: 0, openIncidents: 4, resolvedMonth: 31, avgResponseTime: '32 min', liaison: 'Edem Agbeko' },
];

const Municipalities = () => {
  const totalOpen = municipalities.reduce((s, m) => s + m.openIncidents, 0);
  const totalActive = municipalities.reduce((s, m) => s + m.activeEmergencies, 0);
  const totalResolved = municipalities.reduce((s, m) => s + m.resolvedMonth, 0);

  return (
    <div className={styles.municipalitiesPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Municipalities</h1>
          <p className={styles.pageSubtitle}>Activity breakdown per municipality across all regions</p>
        </div>
      </div>

      {/* National Summary */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{municipalities.length}</span>
          <span className={styles.summaryLabel}>Municipalities</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={`${styles.summaryValue} ${styles.emergencyText}`}>{totalActive}</span>
          <span className={styles.summaryLabel}>Active Emergencies</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{totalOpen}</span>
          <span className={styles.summaryLabel}>Open Incidents</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{totalResolved}</span>
          <span className={styles.summaryLabel}>Resolved (Month)</span>
        </div>
      </div>

      {/* Municipality Cards */}
      <div className={styles.muniGrid}>
        {municipalities.map(m => (
          <div key={m.name} className={styles.muniCard}>
            <div className={styles.muniHeader}>
              <div>
                <h3 className={styles.muniName}>{m.name}</h3>
                <p className={styles.muniRegion}>{m.region} Region</p>
              </div>
              {m.activeEmergencies > 0 && (
                <span className={styles.emergencyBadge}>{m.activeEmergencies} active</span>
              )}
            </div>
            <div className={styles.muniStats}>
              <div className={styles.muniStat}>
                <span className={styles.muniStatValue}>{m.openIncidents}</span>
                <span className={styles.muniStatLabel}>Open</span>
              </div>
              <div className={styles.muniStat}>
                <span className={styles.muniStatValue}>{m.resolvedMonth}</span>
                <span className={styles.muniStatLabel}>Resolved</span>
              </div>
              <div className={styles.muniStat}>
                <span className={styles.muniStatValue}>{m.avgResponseTime}</span>
                <span className={styles.muniStatLabel}>Avg Response</span>
              </div>
            </div>
            <div className={styles.muniFooter}>
              <span className={styles.liaisonLabel}>Liaison: {m.liaison}</span>
              <button className={styles.viewBtn}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Municipalities;
