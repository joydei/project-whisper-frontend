import { NavLink, Link } from 'react-router-dom';
import styles from '../styles/components/Navbar.module.css';

// Import SVG icons
import HomeIcon from '../assets/icons/home.svg?react';
import MegaphoneIcon from '../assets/icons/megaphone-sound-waves.svg?react';
import InboxIcon from '../assets/icons/inbox-full.svg?react';
import BellIcon from '../assets/icons/bell.svg?react';
import UserIcon from '../assets/icons/circle-user.svg?react';
import SearchIcon from '../assets/icons/search.svg?react';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>Aircho</h1>
          </Link>
        </div>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search for updates, reports, or topics..." 
            className={styles.searchInput}
          />
        </div>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} end>
            <HomeIcon className={styles.icon} />
            Home
          </NavLink>
          <NavLink to="/voice-out" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <MegaphoneIcon className={styles.icon} />
            Voice Out
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <InboxIcon className={styles.icon} />
            Inbox
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <BellIcon className={styles.icon} />
            Notifications
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <UserIcon className={styles.icon} />
            Profile
          </NavLink>
        </nav>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;