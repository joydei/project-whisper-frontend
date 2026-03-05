import { Link } from 'react-router-dom';
import styles from '../styles/components/Sidebar.module.css';

// Import SVG icons
import BooksIcon from '../assets/icons/books.svg?react';
import ClipFileIcon from '../assets/icons/clip-file.svg?react';
import CircleUserIcon from '../assets/icons/circle-user.svg?react';
import MenuIcon from '../assets/icons/menu-dots.svg?react';
import GovernmentIcon from '../assets/icons/government-flag.svg?react';
import MegaphoneIcon from '../assets/icons/megaphone-sound-waves.svg?react';
import MessagesIcon from '../assets/icons/messages.svg?react';
import CaseStudyIcon from '../assets/icons/case-study.svg?react';
import UsersIcon from '../assets/icons/users.svg?react';
import BuildingIcon from '../assets/icons/building.svg?react';
import SettingsIcon from '../assets/icons/settings.svg?react';
import SirenIcon from '../assets/icons/siren-on.svg?react';
import MarkerIcon from '../assets/icons/marker.svg?react';
import ShieldIcon from '../assets/icons/shield-check.svg?react';
import HelicopterIcon from '../assets/icons/helicopter-side.svg?react';

interface SidebarProps {
  role: 'municipality' | 'admin' | 'civil';
  civilServiceName?: string;
  civilBasePath?: string;
}

const Sidebar = ({ role, civilServiceName, civilBasePath }: SidebarProps) => {
  const municipalityLinks = [
    { path: '/municipality/dashboard', IconComponent: BooksIcon, label: 'Dashboard' },
    { path: '/municipality/reports', IconComponent: ClipFileIcon, label: 'Reports' },
    { path: '/municipality/announcements', IconComponent: MegaphoneIcon, label: 'Announcements' },
    { path: '/municipality/messages', IconComponent: MessagesIcon, label: 'Messages' },
    { path: '/municipality/analytics', IconComponent: CaseStudyIcon, label: 'Analytics' },
    { path: '/municipality/community', IconComponent: UsersIcon, label: 'Community' },
    { path: '/municipality/civil-services', IconComponent: ShieldIcon, label: 'Civil Services' },
    { path: '/municipality/profile', IconComponent: BuildingIcon, label: 'Profile' },
    { path: '/municipality/settings', IconComponent: SettingsIcon, label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', IconComponent: BooksIcon, label: 'Dashboard' },
    { path: '/admin/municipalities', IconComponent: GovernmentIcon, label: 'Municipalities' },
    { path: '/admin/users', IconComponent: CircleUserIcon, label: 'Users' },
    { path: '/admin/reports', IconComponent: ClipFileIcon, label: 'Reports' },
    { path: '/admin/analytics', IconComponent: BooksIcon, label: 'Analytics' },
    { path: '/admin/settings', IconComponent: MenuIcon, label: 'Settings' },
  ];

  // Civil service sidebar — generic for any service (police, fire, ambulance, etc.)
  // Each service logs in to their own account and sees their domain-specific reports
  const base = civilBasePath || '/civil';
  const civilLinks = [
    { path: `${base}/dashboard`, IconComponent: BooksIcon, label: 'Dashboard' },
    { path: `${base}/incidents`, IconComponent: SirenIcon, label: 'Incidents' },
    { path: `${base}/dispatch`, IconComponent: HelicopterIcon, label: 'Dispatch' },
    { path: `${base}/municipalities`, IconComponent: MarkerIcon, label: 'Municipalities' },
    { path: `${base}/messages`, IconComponent: MessagesIcon, label: 'Messages' },
    { path: `${base}/analytics`, IconComponent: CaseStudyIcon, label: 'Analytics' },
    { path: `${base}/profile`, IconComponent: ShieldIcon, label: 'Profile' },
    { path: `${base}/settings`, IconComponent: SettingsIcon, label: 'Settings' },
  ];

  const links = role === 'municipality' ? municipalityLinks : role === 'admin' ? adminLinks : civilLinks;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Aircho</h2>
        <span className={styles.role}>
          {role === 'municipality' ? 'Municipality' : role === 'admin' ? 'Admin' : civilServiceName || 'Civil Services'}
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