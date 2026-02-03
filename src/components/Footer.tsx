import { Link } from 'react-router-dom';
import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Aircho</h3>
            <p>Your trusted platform for community services</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/voice-out">Voice Out</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
          </div>
          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <p>Email: info@aircho.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 Aircho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;