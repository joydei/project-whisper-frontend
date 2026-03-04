import styles from '../../styles/municipality/CivilServices.module.css';

interface ServiceOverview {
  name: string;
  emoji: string;
  activeInArea: number;
  totalIncidents: number;
  resolvedMonth: number;
  avgResponseTime: string;
  status: 'operational' | 'elevated' | 'critical';
}

const civilServices: ServiceOverview[] = [
  { name: 'Ghana Police Service', emoji: '🚓', activeInArea: 4, totalIncidents: 45, resolvedMonth: 312, avgResponseTime: '14 min', status: 'elevated' },
  { name: 'Ghana National Fire Service', emoji: '🚒', activeInArea: 1, totalIncidents: 8, resolvedMonth: 47, avgResponseTime: '11 min', status: 'operational' },
  { name: 'Ghana Ambulance Service', emoji: '🚑', activeInArea: 2, totalIncidents: 23, resolvedMonth: 186, avgResponseTime: '9 min', status: 'operational' },
  { name: 'National Disaster Management', emoji: '🚁', activeInArea: 0, totalIncidents: 2, resolvedMonth: 5, avgResponseTime: '45 min', status: 'operational' },
];

const recentCoordinations = [
  { service: '🚓 Police', event: 'Joint traffic operation at Circle Interchange', time: '2 hrs ago' },
  { service: '🚒 Fire Service', event: 'Fire incident response — Kaneshie Market', time: '1 day ago' },
  { service: '🚑 Ambulance', event: 'Multi-vehicle accident support — Motorway', time: '2 days ago' },
  { service: '🚓 Police', event: 'Community festival – security coordination', time: '3 days ago' },
];

const CivilServices = () => {
  const totalActive = civilServices.reduce((s, c) => s + c.activeInArea, 0);
  const totalOpen = civilServices.reduce((s, c) => s + c.totalIncidents, 0);

  return (
    <div className={styles.civilServicesPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Civil Services</h1>
        <p className={styles.pageSubtitle}>Overview of civil service activity within your municipality</p>
      </div>

      {/* Summary */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{civilServices.length}</span>
          <span className={styles.summaryLabel}>Services Active</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={`${styles.summaryValue} ${styles.emergencyText}`}>{totalActive}</span>
          <span className={styles.summaryLabel}>Active Emergencies</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{totalOpen}</span>
          <span className={styles.summaryLabel}>Open Incidents</span>
        </div>
      </div>

      {/* Service Cards */}
      <div className={styles.servicesGrid}>
        {civilServices.map(svc => (
          <div key={svc.name} className={styles.serviceCard}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceEmoji}>{svc.emoji}</span>
              <div>
                <h3 className={styles.serviceName}>{svc.name}</h3>
                <span className={`${styles.serviceStatus} ${styles[svc.status]}`}>{svc.status}</span>
              </div>
            </div>
            <div className={styles.serviceStats}>
              <div className={styles.serviceStat}>
                <span className={styles.serviceStatValue}>{svc.activeInArea}</span>
                <span className={styles.serviceStatLabel}>Active</span>
              </div>
              <div className={styles.serviceStat}>
                <span className={styles.serviceStatValue}>{svc.totalIncidents}</span>
                <span className={styles.serviceStatLabel}>Open</span>
              </div>
              <div className={styles.serviceStat}>
                <span className={styles.serviceStatValue}>{svc.resolvedMonth}</span>
                <span className={styles.serviceStatLabel}>Resolved</span>
              </div>
              <div className={styles.serviceStat}>
                <span className={styles.serviceStatValue}>{svc.avgResponseTime}</span>
                <span className={styles.serviceStatLabel}>Avg Resp.</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Coordinations */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Recent Coordinations</h2>
        <div className={styles.coordList}>
          {recentCoordinations.map((c, i) => (
            <div key={i} className={styles.coordItem}>
              <span className={styles.coordService}>{c.service}</span>
              <span className={styles.coordEvent}>{c.event}</span>
              <span className={styles.coordTime}>{c.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CivilServices;
