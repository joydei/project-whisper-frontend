import styles from '../../styles/civil/Dashboard.module.css';

// In a real app, the service type would come from auth context
const SERVICE_NAME = 'Ghana Police Service';
const SERVICE_EMOJI = '🚓';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>{SERVICE_NAME}</h1>
          <p className={styles.pageSubtitle}>Operations dashboard — nationwide overview</p>
        </div>
        <select className={styles.regionFilter}>
          <option>All Regions</option>
          <option>Greater Accra</option>
          <option>Ashanti</option>
          <option>Western</option>
          <option>Eastern</option>
          <option>Northern</option>
        </select>
      </div>

      <div className={styles.container}>
        {/* Stat Cards */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.emergency}`}>
            <div className={styles.statIcon}>🚨</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>12</h3>
              <p className={styles.statLabel}>Active Emergencies</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📋</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>156</h3>
              <p className={styles.statLabel}>Open Incidents</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>1,847</h3>
              <p className={styles.statLabel}>Resolved This Month</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏱️</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>18 min</h3>
              <p className={styles.statLabel}>Avg. Response Time</p>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className={styles.contentGrid}>
          {/* Active Emergencies */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Active Emergencies</h2>
              <span className={styles.liveBadge}>● LIVE</span>
            </div>
            <div className={styles.cardContent}>
              <div className={`${styles.incidentItem} ${styles.urgent}`}>
                <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
                <div className={styles.incidentInfo}>
                  <h4 className={styles.incidentTitle}>Armed Robbery in Progress</h4>
                  <p className={styles.incidentMeta}>Ring Road Central, Accra • Accra Metro</p>
                </div>
                <span className={`${styles.badge} ${styles.badgeEmergency}`}>EMERGENCY</span>
              </div>
              <div className={`${styles.incidentItem} ${styles.urgent}`}>
                <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
                <div className={styles.incidentInfo}>
                  <h4 className={styles.incidentTitle}>Domestic Disturbance</h4>
                  <p className={styles.incidentMeta}>Osu, Accra • Accra Metro</p>
                </div>
                <span className={`${styles.badge} ${styles.badgeEmergency}`}>EMERGENCY</span>
              </div>
              <div className={`${styles.incidentItem} ${styles.urgent}`}>
                <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
                <div className={styles.incidentInfo}>
                  <h4 className={styles.incidentTitle}>Suspicious Activity Near School</h4>
                  <p className={styles.incidentMeta}>Kumasi Central • Kumasi Metro</p>
                </div>
                <span className={`${styles.badge} ${styles.badgeHigh}`}>HIGH</span>
              </div>
            </div>
          </div>

          {/* Municipality Overview — shows activity per municipality */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>By Municipality</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.muniRow}>
                <span className={styles.muniName}>Accra Metropolitan</span>
                <div className={styles.muniStats}>
                  <span className={styles.muniEmergency}>4 active</span>
                  <span className={styles.muniTotal}>45 open</span>
                </div>
              </div>
              <div className={styles.muniRow}>
                <span className={styles.muniName}>Kumasi Metropolitan</span>
                <div className={styles.muniStats}>
                  <span className={styles.muniEmergency}>2 active</span>
                  <span className={styles.muniTotal}>28 open</span>
                </div>
              </div>
              <div className={styles.muniRow}>
                <span className={styles.muniName}>Tema Municipal</span>
                <div className={styles.muniStats}>
                  <span className={styles.muniEmergency}>1 active</span>
                  <span className={styles.muniTotal}>19 open</span>
                </div>
              </div>
              <div className={styles.muniRow}>
                <span className={styles.muniName}>Tamale Metropolitan</span>
                <div className={styles.muniStats}>
                  <span className={styles.muniEmergency}>0 active</span>
                  <span className={styles.muniTotal}>12 open</span>
                </div>
              </div>
              <div className={styles.muniRow}>
                <span className={styles.muniName}>Cape Coast Municipal</span>
                <div className={styles.muniStats}>
                  <span className={styles.muniEmergency}>1 active</span>
                  <span className={styles.muniTotal}>8 open</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Citizen Reports */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Citizen Reports</h2>
            <button className={styles.viewAllBtn}>View All Incidents</button>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.incidentItem}>
              <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
              <div className={styles.incidentInfo}>
                <h4 className={styles.incidentTitle}>Noise Complaint – Loud Music</h4>
                <p className={styles.incidentMeta}>East Legon, Accra • Reported by citizen • 30 min ago</p>
              </div>
              <span className={`${styles.badge} ${styles.badgeNormal}`}>NORMAL</span>
            </div>
            <div className={styles.incidentItem}>
              <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
              <div className={styles.incidentInfo}>
                <h4 className={styles.incidentTitle}>Vandalism at Public Park</h4>
                <p className={styles.incidentMeta}>Tema, Greater Accra • Reported by citizen • 1 hr ago</p>
              </div>
              <span className={`${styles.badge} ${styles.badgeNormal}`}>NORMAL</span>
            </div>
            <div className={styles.incidentItem}>
              <div className={styles.incidentIcon}>{SERVICE_EMOJI}</div>
              <div className={styles.incidentInfo}>
                <h4 className={styles.incidentTitle}>Traffic Light Malfunction Causing Accidents</h4>
                <p className={styles.incidentMeta}>Kaneshie, Accra • Reported by citizen • 2 hrs ago</p>
              </div>
              <span className={`${styles.badge} ${styles.badgeMedium}`}>MEDIUM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
