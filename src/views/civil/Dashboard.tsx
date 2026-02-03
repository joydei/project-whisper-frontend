import styles from '../../styles/civil/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Civil Services Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage emergency reports and civil service requests</p>
      </div>

      <div className={styles.container}>
        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.total}`}>
            <div className={styles.statIcon}>🚨</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>156</h3>
              <p className={styles.statLabel}>Total Reports</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.emergency}`}>
            <div className={styles.statIcon}>⚠️</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>8</h3>
              <p className={styles.statLabel}>Emergency</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.inProgress}`}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>23</h3>
              <p className={styles.statLabel}>In Progress</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.resolved}`}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>125</h3>
              <p className={styles.statLabel}>Resolved</p>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className={styles.servicesGrid}>
          <div className={`${styles.serviceCard} ${styles.police}`}>
            <div className={styles.serviceIcon}>🚓</div>
            <h3 className={styles.serviceTitle}>Police</h3>
            <div className={styles.serviceStats}>
              <span className={styles.emergencyCount}>3 Emergency</span>
              <span className={styles.totalCount}>45 Total</span>
            </div>
          </div>
          <div className={`${styles.serviceCard} ${styles.fire}`}>
            <div className={styles.serviceIcon}>🚒</div>
            <h3 className={styles.serviceTitle}>Fire Service</h3>
            <div className={styles.serviceStats}>
              <span className={styles.emergencyCount}>2 Emergency</span>
              <span className={styles.totalCount}>28 Total</span>
            </div>
          </div>
          <div className={`${styles.serviceCard} ${styles.ambulance}`}>
            <div className={styles.serviceIcon}>🚑</div>
            <h3 className={styles.serviceTitle}>Ambulance</h3>
            <div className={styles.serviceStats}>
              <span className={styles.emergencyCount}>3 Emergency</span>
              <span className={styles.totalCount}>52 Total</span>
            </div>
          </div>
          <div className={`${styles.serviceCard} ${styles.disaster}`}>
            <div className={styles.serviceIcon}>⚠️</div>
            <h3 className={styles.serviceTitle}>Disaster Management</h3>
            <div className={styles.serviceStats}>
              <span className={styles.emergencyCount}>0 Emergency</span>
              <span className={styles.totalCount}>31 Total</span>
            </div>
          </div>
        </div>

        {/* Recent Emergency Reports */}
        <div className={styles.recentReports}>
          <h2 className={styles.sectionTitle}>Recent Emergency Reports</h2>
          <div className={styles.reportsList}>
            <div className={`${styles.reportItem} ${styles.urgent}`}>
              <div className={styles.reportIcon}>🚓</div>
              <div className={styles.reportContent}>
                <h4 className={styles.reportTitle}>Armed Robbery in Progress</h4>
                <p className={styles.reportLocation}>Ring Road Central, Accra</p>
              </div>
              <span className={styles.reportTime}>3 min ago</span>
              <span className={`${styles.badge} ${styles.badgeEmergency}`}>EMERGENCY</span>
            </div>
            <div className={`${styles.reportItem} ${styles.urgent}`}>
              <div className={styles.reportIcon}>🚒</div>
              <div className={styles.reportContent}>
                <h4 className={styles.reportTitle}>Building Fire</h4>
                <p className={styles.reportLocation}>Osu, Accra</p>
              </div>
              <span className={styles.reportTime}>8 min ago</span>
              <span className={`${styles.badge} ${styles.badgeEmergency}`}>EMERGENCY</span>
            </div>
            <div className={`${styles.reportItem} ${styles.urgent}`}>
              <div className={styles.reportIcon}>🚑</div>
              <div className={styles.reportContent}>
                <h4 className={styles.reportTitle}>Medical Emergency</h4>
                <p className={styles.reportLocation}>East Legon, Accra</p>
              </div>
              <span className={styles.reportTime}>12 min ago</span>
              <span className={`${styles.badge} ${styles.badgeEmergency}`}>EMERGENCY</span>
            </div>
            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>🚓</div>
              <div className={styles.reportContent}>
                <h4 className={styles.reportTitle}>Noise Complaint</h4>
                <p className={styles.reportLocation}>Tema, Accra</p>
              </div>
              <span className={styles.reportTime}>45 min ago</span>
              <span className={`${styles.badge} ${styles.badgeNormal}`}>NORMAL</span>
            </div>
            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>🚒</div>
              <div className={styles.reportContent}>
                <h4 className={styles.reportTitle}>Fire Safety Inspection Request</h4>
                <p className={styles.reportLocation}>Madina, Accra</p>
              </div>
              <span className={styles.reportTime}>1 hour ago</span>
              <span className={`${styles.badge} ${styles.badgeNormal}`}>NORMAL</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>👁️</span>
              <span className={styles.actionLabel}>View All Reports</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>📊</span>
              <span className={styles.actionLabel}>Generate Report</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>👥</span>
              <span className={styles.actionLabel}>Manage Teams</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>⚙️</span>
              <span className={styles.actionLabel}>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
