import styles from '../../styles/municipality/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
        <p className={styles.pageSubtitle}>Monitor and manage municipal activities</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>248</h3>
            <p className={styles.statLabel}>Total Reports</p>
          </div>
          <span className={styles.statBadge}>+12%</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>45</h3>
            <p className={styles.statLabel}>Pending</p>
          </div>
          <span className={`${styles.statBadge} ${styles.warning}`}>15</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>187</h3>
            <p className={styles.statLabel}>Resolved</p>
          </div>
          <span className={`${styles.statBadge} ${styles.success}`}>+8%</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>1,254</h3>
            <p className={styles.statLabel}>Active Users</p>
          </div>
          <span className={styles.statBadge}>+5%</span>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Recent Reports */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Reports</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>🚧</div>
              <div className={styles.reportInfo}>
                <h4 className={styles.reportTitle}>Road Damage on Main Street</h4>
                <p className={styles.reportMeta}>Submitted by John Doe • 2 hours ago</p>
              </div>
              <span className={`${styles.statusBadge} ${styles.pending}`}>Pending</span>
            </div>

            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>💡</div>
              <div className={styles.reportInfo}>
                <h4 className={styles.reportTitle}>Street Light Not Working</h4>
                <p className={styles.reportMeta}>Submitted by Jane Smith • 5 hours ago</p>
              </div>
              <span className={`${styles.statusBadge} ${styles.progress}`}>In Progress</span>
            </div>

            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>🗑️</div>
              <div className={styles.reportInfo}>
                <h4 className={styles.reportTitle}>Garbage Collection Missed</h4>
                <p className={styles.reportMeta}>Submitted by Mike Johnson • 1 day ago</p>
              </div>
              <span className={`${styles.statusBadge} ${styles.resolved}`}>Resolved</span>
            </div>

            <div className={styles.reportItem}>
              <div className={styles.reportIcon}>🚰</div>
              <div className={styles.reportInfo}>
                <h4 className={styles.reportTitle}>Water Leakage in Park Area</h4>
                <p className={styles.reportMeta}>Submitted by Sarah Lee • 1 day ago</p>
              </div>
              <span className={`${styles.statusBadge} ${styles.pending}`}>Pending</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Quick Actions</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.actionsGrid}>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>📋</span>
                <span className={styles.actionLabel}>View Reports</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>➕</span>
                <span className={styles.actionLabel}>New Task</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>👥</span>
                <span className={styles.actionLabel}>Manage Users</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>📈</span>
                <span className={styles.actionLabel}>Analytics</span>
              </button>
            </div>

            <div className={styles.notificationSection}>
              <h3 className={styles.notificationTitle}>Recent Notifications</h3>
              <div className={styles.notification}>
                <span className={styles.notifIcon}>🔔</span>
                <p className={styles.notifText}>New report submitted in Zone A</p>
                <span className={styles.notifTime}>10 min ago</span>
              </div>
              <div className={styles.notification}>
                <span className={styles.notifIcon}>✅</span>
                <p className={styles.notifText}>Report #245 marked as resolved</p>
                <span className={styles.notifTime}>1 hour ago</span>
              </div>
              <div className={styles.notification}>
                <span className={styles.notifIcon}>⚠️</span>
                <p className={styles.notifText}>High priority issue requires attention</p>
                <span className={styles.notifTime}>3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Activity Overview</h2>
          <select className={styles.filterSelect}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.chartPlaceholder}>
            <p>📊 Activity chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
