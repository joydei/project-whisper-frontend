import { useState } from 'react';
import styles from '../../../../styles/civil/Dispatch.module.css';

type UnitStatus = 'available' | 'en-route' | 'on-scene' | 'returning';

interface Unit {
  callSign: string;
  type: string;
  status: UnitStatus;
  location: string;
  assignment?: string;
  eta?: string;
}

const sampleUnits: Unit[] = [
  { callSign: 'Alpha-7', type: 'Patrol', status: 'on-scene', location: 'Ring Road Central, Accra', assignment: 'INC-2026-0312 — Armed Robbery', eta: undefined },
  { callSign: 'Beta-3', type: 'Patrol', status: 'en-route', location: 'Osu, Accra', assignment: 'INC-2026-0311 — Domestic Disturbance', eta: '4 min' },
  { callSign: 'Gamma-1', type: 'Rapid Response', status: 'on-scene', location: 'Kumasi Central', assignment: 'INC-2026-0310 — Suspicious Activity', eta: undefined },
  { callSign: 'Delta-5', type: 'Patrol', status: 'available', location: 'Tema HQ', assignment: undefined, eta: undefined },
  { callSign: 'Alpha-2', type: 'Patrol', status: 'returning', location: 'Kaneshie', assignment: undefined, eta: '12 min' },
  { callSign: 'Detective D-4', type: 'Investigative', status: 'on-scene', location: 'Madina, Accra', assignment: 'INC-2026-0305 — Missing Person', eta: undefined },
  { callSign: 'Echo-9', type: 'Traffic', status: 'available', location: 'Accra Central HQ', assignment: undefined, eta: undefined },
  { callSign: 'Foxtrot-1', type: 'K-9 Unit', status: 'available', location: 'Greater Accra Regional Command', assignment: undefined, eta: undefined },
];

const statusColors: Record<UnitStatus, string> = {
  available: 'available',
  'en-route': 'enroute',
  'on-scene': 'onscene',
  returning: 'returning',
};

const Dispatch = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = sampleUnits.filter(u => filterStatus === 'all' || u.status === filterStatus);

  const countByStatus = (s: UnitStatus) => sampleUnits.filter(u => u.status === s).length;

  return (
    <div className={styles.dispatchPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Dispatch</h1>
          <p className={styles.pageSubtitle}>Manage field team deployment and active operations</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className={styles.statusGrid}>
        <div className={`${styles.statusCard} ${styles.available}`}>
          <h3 className={styles.statusValue}>{countByStatus('available')}</h3>
          <p className={styles.statusLabel}>Available</p>
        </div>
        <div className={`${styles.statusCard} ${styles.enroute}`}>
          <h3 className={styles.statusValue}>{countByStatus('en-route')}</h3>
          <p className={styles.statusLabel}>En Route</p>
        </div>
        <div className={`${styles.statusCard} ${styles.onscene}`}>
          <h3 className={styles.statusValue}>{countByStatus('on-scene')}</h3>
          <p className={styles.statusLabel}>On Scene</p>
        </div>
        <div className={`${styles.statusCard} ${styles.returning}`}>
          <h3 className={styles.statusValue}>{countByStatus('returning')}</h3>
          <p className={styles.statusLabel}>Returning</p>
        </div>
      </div>

      {/* Filter & Unit List */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Field Units</h2>
          <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="en-route">En Route</option>
            <option value="on-scene">On Scene</option>
            <option value="returning">Returning</option>
          </select>
        </div>
        <div className={styles.unitsGrid}>
          {filtered.map(unit => (
            <div key={unit.callSign} className={styles.unitCard}>
              <div className={styles.unitHeader}>
                <span className={styles.callSign}>{unit.callSign}</span>
                <span className={`${styles.unitStatusBadge} ${styles[statusColors[unit.status]]}`}>
                  {unit.status}
                </span>
              </div>
              <p className={styles.unitType}>{unit.type}</p>
              <p className={styles.unitLocation}>📍 {unit.location}</p>
              {unit.assignment && (
                <p className={styles.unitAssignment}>🔗 {unit.assignment}</p>
              )}
              {unit.eta && (
                <p className={styles.unitEta}>⏱ ETA: {unit.eta}</p>
              )}
              {unit.status === 'available' && (
                <button className={styles.assignBtn}>Assign to Incident</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
