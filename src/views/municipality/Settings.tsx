import { useState } from 'react';
import styles from '../../styles/municipality/Settings.module.css';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newReports: true,
    urgentReports: true,
    citizenMessages: true,
    weeklyDigest: false,
    communityMentions: true,
  });

  const [autoAssign, setAutoAssign] = useState(true);
  const [responseTemplate, setResponseTemplate] = useState(
    'Thank you for your report. We have received it and our team is reviewing the matter. You will receive an update once action has been taken.'
  );

  const staffMembers = [
    { name: 'Daniel Adjei', role: 'Chief Executive', email: 'daniel@accra-metro.gov.gh', status: 'Active' },
    { name: 'Grace Osei', role: 'Report Manager', email: 'grace@accra-metro.gov.gh', status: 'Active' },
    { name: 'Samuel Tetteh', role: 'Field Officer', email: 'samuel@accra-metro.gov.gh', status: 'Active' },
    { name: 'Mercy Addo', role: 'Community Liaison', email: 'mercy@accra-metro.gov.gh', status: 'Inactive' },
  ];

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Configure your municipality account preferences</p>
      </div>

      <div className={styles.settingsGrid}>
        {/* Notification Preferences */}
        <div className={styles.settingsCard}>
          <h3 className={styles.cardTitle}>Notification Preferences</h3>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                </span>
              </div>
              <button
                className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
                onClick={() => handleToggle(key as keyof typeof notifications)}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
          ))}
        </div>

        {/* Report Settings */}
        <div className={styles.settingsCard}>
          <h3 className={styles.cardTitle}>Report Settings</h3>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>Auto-assign reports to departments</span>
              <span className={styles.settingDescription}>
                Automatically route incoming reports based on category
              </span>
            </div>
            <button
              className={`${styles.toggle} ${autoAssign ? styles.toggleOn : ''}`}
              onClick={() => setAutoAssign(!autoAssign)}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Response Template</label>
            <textarea
              className={styles.textarea}
              value={responseTemplate}
              onChange={(e) => setResponseTemplate(e.target.value)}
              rows={4}
            />
          </div>
          <button className={styles.saveBtn}>Save Template</button>
        </div>
      </div>

      {/* Staff Management */}
      <div className={styles.settingsCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Staff Members</h3>
          <button className={styles.addStaffBtn}>+ Add Staff</button>
        </div>
        <table className={styles.staffTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff, i) => (
              <tr key={i}>
                <td className={styles.staffName}>{staff.name}</td>
                <td>{staff.role}</td>
                <td className={styles.staffEmail}>{staff.email}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[staff.status.toLowerCase()]}`}>
                    {staff.status}
                  </span>
                </td>
                <td>
                  <button className={styles.editStaffBtn}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
