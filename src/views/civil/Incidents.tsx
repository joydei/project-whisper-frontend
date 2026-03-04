import { useState } from 'react';
import styles from '../../styles/civil/Incidents.module.css';

type Priority = 'emergency' | 'high' | 'medium' | 'low';
type Status = 'open' | 'dispatched' | 'in-progress' | 'resolved' | 'closed';

interface Incident {
  id: string;
  title: string;
  location: string;
  municipality: string;
  priority: Priority;
  status: Status;
  reportedBy: string;
  time: string;
  assigned?: string;
}

const sampleIncidents: Incident[] = [
  { id: 'INC-2026-0312', title: 'Armed Robbery in Progress', location: 'Ring Road Central, Accra', municipality: 'Accra Metropolitan', priority: 'emergency', status: 'dispatched', reportedBy: 'Citizen Report', time: '3 min ago', assigned: 'Unit Alpha-7' },
  { id: 'INC-2026-0311', title: 'Domestic Disturbance', location: 'Osu, Accra', municipality: 'Accra Metropolitan', priority: 'emergency', status: 'dispatched', reportedBy: 'Citizen Report', time: '12 min ago', assigned: 'Unit Beta-3' },
  { id: 'INC-2026-0310', title: 'Suspicious Activity Near School', location: 'Kumasi Central', municipality: 'Kumasi Metropolitan', priority: 'high', status: 'in-progress', reportedBy: 'Citizen Report', time: '25 min ago', assigned: 'Unit Gamma-1' },
  { id: 'INC-2026-0309', title: 'Noise Complaint – Loud Music', location: 'East Legon, Accra', municipality: 'Accra Metropolitan', priority: 'low', status: 'open', reportedBy: 'Citizen Report', time: '45 min ago' },
  { id: 'INC-2026-0308', title: 'Vandalism at Public Park', location: 'Tema Community 5', municipality: 'Tema Municipal', priority: 'medium', status: 'open', reportedBy: 'Citizen Report', time: '1 hr ago' },
  { id: 'INC-2026-0307', title: 'Traffic Accident – Minor Injuries', location: 'Kaneshie Interchange', municipality: 'Accra Metropolitan', priority: 'high', status: 'resolved', reportedBy: 'Municipality Referral', time: '2 hrs ago', assigned: 'Unit Alpha-2' },
  { id: 'INC-2026-0306', title: 'Shoplifting Report', location: 'Accra Mall', municipality: 'Accra Metropolitan', priority: 'low', status: 'closed', reportedBy: 'Citizen Report', time: '4 hrs ago' },
  { id: 'INC-2026-0305', title: 'Missing Person Report', location: 'Madina, Accra', municipality: 'Accra Metropolitan', priority: 'high', status: 'in-progress', reportedBy: 'Citizen Report', time: '6 hrs ago', assigned: 'Detective Unit D-4' },
];

const priorityOrder: Priority[] = ['emergency', 'high', 'medium', 'low'];

const Incidents = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterMunicipality, setFilterMunicipality] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = sampleIncidents.filter(inc => {
    const matchesStatus = filterStatus === 'all' || inc.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || inc.priority === filterPriority;
    const matchesMuni = filterMunicipality === 'all' || inc.municipality === filterMunicipality;
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesMuni && matchesSearch;
  });

  const municipalities = [...new Set(sampleIncidents.map(i => i.municipality))];

  return (
    <div className={styles.incidentsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Incidents</h1>
          <p className={styles.pageSubtitle}>All reports assigned to your service, filterable by region</p>
        </div>
      </div>

      {/* Summary */}
      <div className={styles.summaryGrid}>
        {(['emergency', 'high', 'medium', 'low'] as Priority[]).map(p => {
          const count = sampleIncidents.filter(i => i.priority === p && i.status !== 'closed' && i.status !== 'resolved').length;
          return (
            <div key={p} className={`${styles.summaryCard} ${styles[p]}`}>
              <h3 className={styles.summaryValue}>{count}</h3>
              <p className={styles.summaryLabel}>{p.charAt(0).toUpperCase() + p.slice(1)}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search incidents..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="dispatched">Dispatched</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select className={styles.filterSelect} value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="emergency">Emergency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className={styles.filterSelect} value={filterMunicipality} onChange={(e) => setFilterMunicipality(e.target.value)}>
          <option value="all">All Municipalities</option>
          {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Incidents Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Incident</th>
              <th>Location</th>
              <th>Municipality</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inc => (
              <tr key={inc.id} className={styles.tableRow}>
                <td className={styles.incidentId}>{inc.id}</td>
                <td className={styles.incidentTitle}>{inc.title}</td>
                <td>{inc.location}</td>
                <td>{inc.municipality}</td>
                <td>
                  <span className={`${styles.priorityBadge} ${styles[inc.priority]}`}>
                    {inc.priority}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[inc.status.replace('-', '')]}`}>
                    {inc.status}
                  </span>
                </td>
                <td className={styles.assignedCell}>{inc.assigned || '—'}</td>
                <td className={styles.timeCell}>{inc.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
