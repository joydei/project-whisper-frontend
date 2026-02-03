import { Link } from 'react-router-dom';
import styles from '../styles/components/Navbar.module.css';

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
            <span className={styles.icon}>🏠</span>
            Home
          </Link>
          <Link to="/voice-out" className={styles.navLink}>
            <span className={styles.icon}>📢</span>
            Voice Out
          </Link>
          <Link to="/inbox" className={styles.navLink}>
            <span className={styles.icon}>📬</span>
            Inbox
          </Link>
          <Link to="/notifications" className={styles.navLink}>
            <span className={styles.icon}>🔔</span>
            Notifications
          </Link>
          <Link to="/profile" className={styles.navLink}>
            <span className={styles.icon}>👤</span>
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