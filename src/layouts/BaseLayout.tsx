import { Outlet } from 'react-router-dom';
import styles from '../styles/layouts/BaseLayout.module.css';

const BaseLayout = () => {
  return (
    <div className={styles.baseLayout}>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
