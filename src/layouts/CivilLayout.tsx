import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/layouts/CivilLayout.module.css';

// In a real app, this would come from auth context
// For now, simulating "Ghana Police Service" as the logged-in service
const CURRENT_SERVICE_NAME = 'Ghana Police Service';

const CivilLayout = () => {
  return (
    <div className={styles.civilLayout}>
      <TopBar />
      <Sidebar role="civil" civilServiceName={CURRENT_SERVICE_NAME} />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CivilLayout;
