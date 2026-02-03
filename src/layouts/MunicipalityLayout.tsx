import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/layouts/MunicipalityLayout.module.css';

const MunicipalityLayout = () => {
  return (
    <div className={styles.municipalityLayout}>
      <TopBar />
      <Sidebar role="municipality" />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MunicipalityLayout;
