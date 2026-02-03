import styles from '../../styles/user/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Manage your account and preferences</p>
      </div>

      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>JD</div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>John Doe</h2>
              <p className={styles.userEmail}>john.doe@example.com</p>
            </div>
            <button className={styles.editBtn}>Edit Profile</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>23</span>
              <span className={styles.statLabel}>Reports Submitted</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>15</span>
              <span className={styles.statLabel}>Resolved</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>8</span>
              <span className={styles.statLabel}>In Progress</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Full Name</span>
                <span className={styles.infoValue}>John Doe</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>john.doe@example.com</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>+233 24 123 4567</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Municipality</span>
                <span className={styles.infoValue}>Accra Metropolitan</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>123 Main Street, Accra</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Member Since</span>
                <span className={styles.infoValue}>January 2026</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Preferences</h3>
            <div className={styles.preferences}>
              <div className={styles.preferenceItem}>
                <div>
                  <h4 className={styles.preferenceTitle}>Email Notifications</h4>
                  <p className={styles.preferenceDesc}>Receive updates via email</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <h4 className={styles.preferenceTitle}>SMS Notifications</h4>
                  <p className={styles.preferenceDesc}>Receive updates via SMS</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.preferenceItem}>
                <div>
                  <h4 className={styles.preferenceTitle}>Weekly Summary</h4>
                  <p className={styles.preferenceDesc}>Get weekly activity summary</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.changePasswordBtn}>Change Password</button>
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
