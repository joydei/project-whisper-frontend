import styles from '../../../../styles/civil/Analytics.module.css';

const Analytics = () => {
  const regionStats = [
    { region: 'Greater Accra', incidents: 478, resolved: 412, responseTime: '14 min', satisfaction: '87%' },
    { region: 'Ashanti', incidents: 312, resolved: 268, responseTime: '19 min', satisfaction: '82%' },
    { region: 'Western', incidents: 198, resolved: 175, responseTime: '18 min', satisfaction: '84%' },
    { region: 'Northern', incidents: 145, resolved: 119, responseTime: '24 min', satisfaction: '76%' },
    { region: 'Central', incidents: 121, resolved: 108, responseTime: '21 min', satisfaction: '80%' },
    { region: 'Volta', incidents: 87, resolved: 74, responseTime: '28 min', satisfaction: '78%' },
  ];

  const monthlyTrend = [
    { month: 'Jan', incidents: 320, resolved: 295 },
    { month: 'Feb', incidents: 298, resolved: 278 },
    { month: 'Mar', incidents: 345, resolved: 312 },
    { month: 'Apr', incidents: 367, resolved: 340 },
    { month: 'May', incidents: 402, resolved: 378 },
    { month: 'Jun', incidents: 389, resolved: 365 },
  ];

  const maxIncidents = Math.max(...monthlyTrend.map(m => m.incidents));

  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Analytics</h1>
        <p className={styles.pageSubtitle}>Performance metrics and operational insights by region</p>
      </div>

      {/* KPI Overview */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiValue}>1,341</h3>
          <p className={styles.kpiLabel}>Total Incidents (6 mo)</p>
        </div>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiValue}>91.2%</h3>
          <p className={styles.kpiLabel}>Resolution Rate</p>
        </div>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiValue}>18.6 min</h3>
          <p className={styles.kpiLabel}>Avg Response Time</p>
        </div>
        <div className={styles.kpiCard}>
          <h3 className={styles.kpiValue}>82%</h3>
          <p className={styles.kpiLabel}>Citizen Satisfaction</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Monthly Trend */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Monthly Trend (6 Months)</h2>
          <div className={styles.chartContainer}>
            {monthlyTrend.map(m => (
              <div key={m.month} className={styles.barGroup}>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.barIncidents}
                    style={{ height: `${(m.incidents / maxIncidents) * 100}%` }}
                  />
                  <div
                    className={styles.barResolved}
                    style={{ height: `${(m.resolved / maxIncidents) * 100}%` }}
                  />
                </div>
                <span className={styles.barLabel}>{m.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}><span className={styles.legendDotIncidents} /> Incidents</span>
            <span className={styles.legendItem}><span className={styles.legendDotResolved} /> Resolved</span>
          </div>
        </div>

        {/* Top Categories */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Top Incident Categories</h2>
          <div className={styles.categoryList}>
            {[
              { name: 'Theft / Robbery', pct: 28 },
              { name: 'Traffic Incidents', pct: 22 },
              { name: 'Domestic Disturbance', pct: 18 },
              { name: 'Public Disorder', pct: 14 },
              { name: 'Missing Persons', pct: 10 },
              { name: 'Other', pct: 8 },
            ].map(c => (
              <div key={c.name} className={styles.categoryRow}>
                <span className={styles.categoryName}>{c.name}</span>
                <div className={styles.categoryBarBg}>
                  <div className={styles.categoryBarFill} style={{ width: `${c.pct}%` }} />
                </div>
                <span className={styles.categoryPct}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Breakdown Table */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Performance by Region</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Region</th>
                <th>Total Incidents</th>
                <th>Resolved</th>
                <th>Rate</th>
                <th>Avg Response Time</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {regionStats.map(r => (
                <tr key={r.region}>
                  <td className={styles.regionName}>{r.region}</td>
                  <td>{r.incidents}</td>
                  <td>{r.resolved}</td>
                  <td>{((r.resolved / r.incidents) * 100).toFixed(1)}%</td>
                  <td>{r.responseTime}</td>
                  <td>{r.satisfaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
