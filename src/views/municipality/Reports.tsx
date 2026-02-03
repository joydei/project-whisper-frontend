import styles from '../../styles/municipality/Reports.module.css';

const Reports = () => {
  return (
    <div className={styles.reportsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Reports Management</h1>
          <p className={styles.pageSubtitle}>View and manage all citizen reports</p>
        </div>
        <button className={styles.exportBtn}>Export Reports</button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search reports..." 
            className={styles.searchInput}
          />
        </div>

        <select className={styles.filterSelect}>
          <option>All Categories</option>
          <option>Infrastructure</option>
          <option>Sanitation</option>
          <option>Safety</option>
          <option>Utilities</option>
        </select>

        <select className={styles.filterSelect}>
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>

        <select className={styles.filterSelect}>
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryValue}>45</h3>
          <p className={styles.summaryLabel}>Pending</p>
        </div>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryValue}>23</h3>
          <p className={styles.summaryLabel}>In Progress</p>
        </div>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryValue}>187</h3>
          <p className={styles.summaryLabel}>Resolved</p>
        </div>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryValue}>8</h3>
          <p className={styles.summaryLabel}>Rejected</p>
        </div>
      </div>

      {/* Reports Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableRow}>
              <td>#248</td>
              <td>Road Damage on Main Street</td>
              <td><span className={styles.categoryBadge}>Infrastructure</span></td>
              <td>Main St, Zone A</td>
              <td><span className={`${styles.priorityBadge} ${styles.high}`}>High</span></td>
              <td><span className={`${styles.statusBadge} ${styles.pending}`}>Pending</span></td>
              <td>2 hours ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>

            <tr className={styles.tableRow}>
              <td>#247</td>
              <td>Street Light Not Working</td>
              <td><span className={styles.categoryBadge}>Utilities</span></td>
              <td>5th Avenue, Zone B</td>
              <td><span className={`${styles.priorityBadge} ${styles.medium}`}>Medium</span></td>
              <td><span className={`${styles.statusBadge} ${styles.progress}`}>In Progress</span></td>
              <td>5 hours ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>

            <tr className={styles.tableRow}>
              <td>#246</td>
              <td>Garbage Collection Missed</td>
              <td><span className={styles.categoryBadge}>Sanitation</span></td>
              <td>Park Lane, Zone C</td>
              <td><span className={`${styles.priorityBadge} ${styles.medium}`}>Medium</span></td>
              <td><span className={`${styles.statusBadge} ${styles.resolved}`}>Resolved</span></td>
              <td>1 day ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>

            <tr className={styles.tableRow}>
              <td>#245</td>
              <td>Water Leakage in Park Area</td>
              <td><span className={styles.categoryBadge}>Infrastructure</span></td>
              <td>Central Park, Zone A</td>
              <td><span className={`${styles.priorityBadge} ${styles.high}`}>High</span></td>
              <td><span className={`${styles.statusBadge} ${styles.progress}`}>In Progress</span></td>
              <td>1 day ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>

            <tr className={styles.tableRow}>
              <td>#244</td>
              <td>Broken Sidewalk</td>
              <td><span className={styles.categoryBadge}>Infrastructure</span></td>
              <td>Oak Street, Zone B</td>
              <td><span className={`${styles.priorityBadge} ${styles.low}`}>Low</span></td>
              <td><span className={`${styles.statusBadge} ${styles.pending}`}>Pending</span></td>
              <td>2 days ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>

            <tr className={styles.tableRow}>
              <td>#243</td>
              <td>Noise Complaint - Construction</td>
              <td><span className={styles.categoryBadge}>Safety</span></td>
              <td>Elm Street, Zone C</td>
              <td><span className={`${styles.priorityBadge} ${styles.medium}`}>Medium</span></td>
              <td><span className={`${styles.statusBadge} ${styles.resolved}`}>Resolved</span></td>
              <td>3 days ago</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="View">👁️</button>
                  <button className={styles.actionIcon} title="Edit">✏️</button>
                  <button className={styles.actionIcon} title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn} disabled>Previous</button>
        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
        <button className={styles.pageBtn}>2</button>
        <button className={styles.pageBtn}>3</button>
        <button className={styles.pageBtn}>4</button>
        <button className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
};

export default Reports;
