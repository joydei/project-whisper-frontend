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
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/voice-out" className={styles.navLink}>Voice Out</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/services" className={styles.navLink}>Services</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;