import { Link } from "react-router-dom";
import styles from "../styles/components/Topbar.module.css";
import logo from "../assets/imaginary-station.png";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <span>Powered by</span>
        <img src={logo} alt="Imaginary Station" className={styles.logo} />
      </div>
      <ul className={styles.right}>
        <li>
          <Link to="/help" className={styles.topBarLink}>
            Help
          </Link>
        </li>
        <li>
          <Link to="/join-us" className={styles.topBarLink}>
            Join Us
          </Link>
        </li>
        <li>Select Language</li>
      </ul>
    </div>
  );
};

export default TopBar;