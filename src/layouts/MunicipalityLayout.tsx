import { Outlet } from 'react-router-dom';
import styles from './MunicipalityLayout.module.css';

const MunicipalityLayout = () => {
  return (
    <div className={styles.municipalityLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Aircho</h2>
          <span className={styles.role}>Municipality</span>
        </div>
        <nav className={styles.nav}>
          <a href="/municipality/dashboard" className={styles.navLink}>
            <span className={styles.icon}>📊</span>
            Dashboard
          </a>
          <a href="/municipality/reports" className={styles.navLink}>
            <span className={styles.icon}>📋</span>
            Reports
          </a>
          <a href="/municipality/users" className={styles.navLink}>
            <span className={styles.icon}>👥</span>
            Users
          </a>
          <a href="/municipality/services" className={styles.navLink}>
            <span className={styles.icon}>🔧</span>
            Services
          </a>
          <a href="/municipality/settings" className={styles.navLink}>
            <span className={styles.icon}>⚙️</span>
            Settings
          </a>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Municipality Portal</h1>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Admin User</span>
              <div className={styles.avatar}>A</div>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MunicipalityLayout;
