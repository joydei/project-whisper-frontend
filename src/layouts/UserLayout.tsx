import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.css';

const UserLayout = () => {
  return (
    <div className={styles.userLayout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>Aircho</h1>
          </div>
          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/about" className={styles.navLink}>About</a>
            <a href="/services" className={styles.navLink}>Services</a>
            <a href="/contact" className={styles.navLink}>Contact</a>
          </nav>
          <div className={styles.authButtons}>
            <button className={styles.loginBtn}>Login</button>
            <button className={styles.signupBtn}>Sign Up</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>Aircho</h3>
              <p>Your trusted platform for community services</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/services">Services</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Contact</h4>
              <p>Email: info@aircho.com</p>
              <p>Phone: +1 234 567 8900</p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 Aircho. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
