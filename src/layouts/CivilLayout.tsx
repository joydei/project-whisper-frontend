import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/layouts/CivilLayout.module.css';

const CivilLayout = () => {
  return (
    <div className={styles.civilLayout}>
      <TopBar />
      <Sidebar role="civil" />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CivilLayout;
