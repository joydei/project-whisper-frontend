import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/layouts/CivilLayout.module.css';

const SERVICE_NAMES: Record<string, string> = {
  police: 'Ghana Police Service',
  'fire-service': 'Ghana National Fire Service',
  'medical-emergency': 'National Ambulance Service',
  'disaster-management': 'National Disaster Management Organization',
  'rescue-operations': 'National Rescue Operations',
};

const CivilLayout = () => {
  const location = useLocation();
  // URL pattern: /civil/{service-slug}/{hq|municipality}/{page}
  const segments = location.pathname.split('/').filter(Boolean);
  const serviceSlug = segments[1] || 'police';
  const accountType = segments[2] || 'hq';
  const serviceName = SERVICE_NAMES[serviceSlug] || 'Civil Service';
  const accountLabel = accountType === 'municipality' ? 'Municipality' : 'HQ';
  const basePath = `/civil/${serviceSlug}/${accountType}`;

  return (
    <div className={styles.civilLayout}>
      <TopBar />
      <Sidebar
        role="civil"
        civilServiceName={`${serviceName} — ${accountLabel}`}
        civilBasePath={basePath}
      />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CivilLayout;
