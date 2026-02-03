import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/layouts/UserLayout.module.css';

const UserLayout = () => {
  return (
    <div className={styles.userLayout}>
      <TopBar />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
