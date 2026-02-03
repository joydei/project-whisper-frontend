import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Aircho</h2>
          <span className={styles.role}>Admin</span>
        </div>
        <nav className={styles.nav}>
          <a href="/admin/dashboard" className={styles.navLink}>
            <span className={styles.icon}>📊</span>
            Dashboard
          </a>
          <a href="/admin/municipalities" className={styles.navLink}>
            <span className={styles.icon}>🏛️</span>
            Municipalities
          </a>
          <a href="/admin/users" className={styles.navLink}>
            <span className={styles.icon}>👥</span>
            Users
          </a>
          <a href="/admin/reports" className={styles.navLink}>
            <span className={styles.icon}>📋</span>
            Reports
          </a>
          <a href="/admin/analytics" className={styles.navLink}>
            <span className={styles.icon}>📈</span>
            Analytics
          </a>
          <a href="/admin/settings" className={styles.navLink}>
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
            <h1 className={styles.pageTitle}>Admin Portal</h1>
            <div className={styles.headerRight}>
              <div className={styles.notifications}>
                <span className={styles.notificationIcon}>🔔</span>
                <span className={styles.badge}>3</span>
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Super Admin</span>
                <div className={styles.avatar}>SA</div>
              </div>
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

export default AdminLayout;
