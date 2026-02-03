import { Link } from 'react-router-dom';
import styles from '../styles/components/Sidebar.module.css';

interface SidebarProps {
  role: 'municipality' | 'admin' | 'civil';
}

const Sidebar = ({ role }: SidebarProps) => {
  const municipalityLinks = [
    { path: '/municipality/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/municipality/reports', icon: '📋', label: 'Reports' },
    { path: '/municipality/users', icon: '👥', label: 'Users' },
    { path: '/municipality/services', icon: '🔧', label: 'Services' },
    { path: '/municipality/settings', icon: '⚙️', label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/municipalities', icon: '🏛️', label: 'Municipalities' },
    { path: '/admin/users', icon: '👥', label: 'Users' },
    { path: '/admin/reports', icon: '📋', label: 'Reports' },
    { path: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];

  const civilLinks = [
    { path: '/civil/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/civil/police', icon: '🚓', label: 'Police' },
    { path: '/civil/fire', icon: '🚒', label: 'Fire Service' },
    { path: '/civil/ambulance', icon: '🚑', label: 'Ambulance' },
    { path: '/civil/disaster', icon: '⚠️', label: 'Disaster Management' },
    { path: '/civil/settings', icon: '⚙️', label: 'Settings' },
  ];

  const links = role === 'municipality' ? municipalityLinks : role === 'admin' ? adminLinks : civilLinks;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Aircho</h2>
        <span className={styles.role}>
          {role === 'municipality' ? 'Municipality' : role === 'admin' ? 'Admin' : 'Civil Services'}
        </span>
      </div>
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.path} to={link.path} className={styles.navLink}>
            <span className={styles.icon}>{link.icon}</span>
            <span className={styles.label}>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;