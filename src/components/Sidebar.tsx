import { Link } from 'react-router-dom';
import styles from '../styles/components/Sidebar.module.css';

// Import SVG icons
import BooksIcon from '../assets/icons/books.svg?react';
import ClipFileIcon from '../assets/icons/clip-file.svg?react';
import CircleUserIcon from '../assets/icons/circle-user.svg?react';
import UtilityIcon from '../assets/icons/utility-pole-double.svg?react';
import MenuIcon from '../assets/icons/menu-dots.svg?react';
import GovernmentIcon from '../assets/icons/government-flag.svg?react';
import PoliceIcon from '../assets/icons/user-police.svg?react';
import FireIcon from '../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../assets/icons/ambulance.svg?react';
import FloodIcon from '../assets/icons/house-flood.svg?react';

interface SidebarProps {
  role: 'municipality' | 'admin' | 'civil';
}

const Sidebar = ({ role }: SidebarProps) => {
  const municipalityLinks = [
    { path: '/municipality/dashboard', IconComponent: BooksIcon, label: 'Dashboard' },
    { path: '/municipality/reports', IconComponent: ClipFileIcon, label: 'Reports' },
    { path: '/municipality/users', IconComponent: CircleUserIcon, label: 'Users' },
    { path: '/municipality/services', IconComponent: UtilityIcon, label: 'Services' },
    { path: '/municipality/settings', IconComponent: MenuIcon, label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', IconComponent: BooksIcon, label: 'Dashboard' },
    { path: '/admin/municipalities', IconComponent: GovernmentIcon, label: 'Municipalities' },
    { path: '/admin/users', IconComponent: CircleUserIcon, label: 'Users' },
    { path: '/admin/reports', IconComponent: ClipFileIcon, label: 'Reports' },
    { path: '/admin/analytics', IconComponent: BooksIcon, label: 'Analytics' },
    { path: '/admin/settings', IconComponent: MenuIcon, label: 'Settings' },
  ];

  const civilLinks = [
    { path: '/civil/dashboard', IconComponent: BooksIcon, label: 'Dashboard' },
    { path: '/civil/police', IconComponent: PoliceIcon, label: 'Police' },
    { path: '/civil/fire', IconComponent: FireIcon, label: 'Fire Service' },
    { path: '/civil/ambulance', IconComponent: AmbulanceIcon, label: 'Ambulance' },
    { path: '/civil/disaster', IconComponent: FloodIcon, label: 'Disaster Management' },
    { path: '/civil/settings', IconComponent: MenuIcon, label: 'Settings' },
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
        {links.map((link) => {
          const IconComponent = link.IconComponent;
          return (
            <Link key={link.path} to={link.path} className={styles.navLink}>
              <IconComponent className={styles.icon} />
              <span className={styles.label}>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;