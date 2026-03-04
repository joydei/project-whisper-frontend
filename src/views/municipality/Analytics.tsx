import styles from '../../styles/municipality/Analytics.module.css';

const Analytics = () => {
  const kpis = [
    { label: 'Avg. Response Time', value: '4.2 hrs', change: '-12%', positive: true },
    { label: 'Resolution Rate', value: '87%', change: '+5%', positive: true },
    { label: 'Citizen Satisfaction', value: '4.2/5', change: '+0.3', positive: true },
    { label: 'Open Reports', value: '68', change: '+8', positive: false },
  ];

  const categoryBreakdown = [
    { category: 'Infrastructure', count: 87, percentage: 35 },
    { category: 'Sanitation', count: 62, percentage: 25 },
    { category: 'Utilities', count: 50, percentage: 20 },
    { category: 'Safety', count: 30, percentage: 12 },
    { category: 'Other', count: 19, percentage: 8 },
  ];

  const monthlyTrend = [
    { month: 'Sep', reports: 42, resolved: 38 },
    { month: 'Oct', reports: 55, resolved: 48 },
    { month: 'Nov', reports: 68, resolved: 60 },
    { month: 'Dec', reports: 51, resolved: 49 },
    { month: 'Jan', reports: 73, resolved: 65 },
    { month: 'Feb', reports: 64, resolved: 58 },
  ];

  const topZones = [
    { zone: 'Zone A – Central', reports: 45, status: 'High Activity' },
    { zone: 'Zone B – Industrial', reports: 38, status: 'High Activity' },
    { zone: 'Zone C – Residential North', reports: 27, status: 'Moderate' },
    { zone: 'Zone D – Market Area', reports: 22, status: 'Moderate' },
    { zone: 'Zone E – Residential South', reports: 14, status: 'Low' },
  ];

  const maxReports = Math.max(...monthlyTrend.map(m => m.reports));

  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSubtitle}>Performance metrics and community insights</p>
        </div>
        <select className={styles.periodSelect}>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
          <option>This year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, i) => (
          <div key={i} className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <h2 className={styles.kpiValue}>{kpi.value}</h2>
            <span className={`${styles.kpiChange} ${kpi.positive ? styles.positive : styles.negative}`}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        {/* Monthly Trend */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Monthly Report Trend</h3>
          <div className={styles.barChart}>
            {monthlyTrend.map((m, i) => (
              <div key={i} className={styles.barGroup}>
                <div className={styles.bars}>
                  <div
                    className={styles.barReports}
                    style={{ height: `${(m.reports / maxReports) * 100}%` }}
                    title={`${m.reports} reports`}
                  />
                  <div
                    className={styles.barResolved}
                    style={{ height: `${(m.resolved / maxReports) * 100}%` }}
                    title={`${m.resolved} resolved`}
                  />
                </div>
                <span className={styles.barLabel}>{m.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}><span className={styles.legendDotReports} /> Reports</span>
            <span className={styles.legendItem}><span className={styles.legendDotResolved} /> Resolved</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Reports by Category</h3>
          <div className={styles.categoryList}>
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className={styles.categoryItem}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>{cat.category}</span>
                  <span className={styles.categoryCount}>{cat.count}</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Zones */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Reports by Zone</h3>
        <table className={styles.zoneTable}>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Reports</th>
              <th>Activity Level</th>
            </tr>
          </thead>
          <tbody>
            {topZones.map((zone, i) => (
              <tr key={i}>
                <td>{zone.zone}</td>
                <td className={styles.zoneCount}>{zone.reports}</td>
                <td>
                  <span className={`${styles.activityBadge} ${styles[zone.status.toLowerCase().replace(' ', '')]}`}>
                    {zone.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
