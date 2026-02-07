import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <p>&copy; 2026 Aircho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;