import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <TopBar />
      <Sidebar role="admin" />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
