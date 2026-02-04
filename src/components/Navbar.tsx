import { Link } from 'react-router-dom';
import styles from '../styles/components/Navbar.module.css';

// Import SVG icons
import HomeIcon from '../assets/icons/home.svg?react';
import MegaphoneIcon from '../assets/icons/megaphone-sound-waves.svg?react';
import InboxIcon from '../assets/icons/inbox-full.svg?react';
import BellIcon from '../assets/icons/bell.svg?react';
import UserIcon from '../assets/icons/circle-user.svg?react';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>Aircho</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            <HomeIcon className={styles.icon} />
            Home
          </Link>
          <Link to="/voice-out" className={styles.navLink}>
            <MegaphoneIcon className={styles.icon} />
            Voice Out
          </Link>
          <Link to="/inbox" className={styles.navLink}>
            <InboxIcon className={styles.icon} />
            Inbox
          </Link>
          <Link to="/notifications" className={styles.navLink}>
            <BellIcon className={styles.icon} />
            Notifications
          </Link>
          <Link to="/profile" className={styles.navLink}>
            <UserIcon className={styles.icon} />
            Profile
          </Link>
        </nav>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;