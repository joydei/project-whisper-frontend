import { Outlet } from 'react-router-dom';
import styles from './BaseLayout.module.css';

const BaseLayout = () => {
  return (
    <div className={styles.baseLayout}>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
