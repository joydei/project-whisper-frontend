import { useState } from 'react';
import styles from '../../styles/civil/Settings.module.css';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newIncidents: true,
    emergencyAlerts: true,
    municipalityMessages: true,
    citizenMessages: false,
    weeklyReport: true,
  });

  const [autoDispatch, setAutoDispatch] = useState(false);

  const teamMembers = [
    { name: 'ACP James Mensah', role: 'Regional Commander', email: 'james.mensah@police.gov.gh', status: 'Active' },
    { name: 'DSP Grace Adu', role: 'Operations Lead', email: 'grace.adu@police.gov.gh', status: 'Active' },
    { name: 'ASP Kofi Boateng', role: 'Dispatch Coordinator', email: 'kofi.boateng@police.gov.gh', status: 'Active' },
    { name: 'Sgt. Abena Darko', role: 'Community Liaison', email: 'abena.darko@police.gov.gh', status: 'Inactive' },
  ];

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Configure notification preferences and manage your team</p>
      </div>

      <div className={styles.settingsGrid}>
        {/* Notification Preferences */}
        <div className={styles.card}>
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

        {/* Operational Settings */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Operational Settings</h3>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>Auto-dispatch for emergencies</span>
              <span className={styles.settingDescription}>
                Automatically assign nearest available unit to emergency incidents
              </span>
            </div>
            <button
              className={`${styles.toggle} ${autoDispatch ? styles.toggleOn : ''}`}
              onClick={() => setAutoDispatch(!autoDispatch)}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Response Message</label>
            <textarea
              className={styles.textarea}
              defaultValue="Your report has been received and logged. A unit has been assigned to investigate. You will receive updates as the case progresses."
              rows={3}
            />
          </div>
          <button className={styles.saveBtn}>Save Settings</button>
        </div>
      </div>

      {/* Team Management */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Team Members</h3>
          <button className={styles.addBtn}>+ Add Member</button>
        </div>
        <table className={styles.table}>
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
            {teamMembers.map((member, i) => (
              <tr key={i}>
                <td className={styles.memberName}>{member.name}</td>
                <td>{member.role}</td>
                <td className={styles.memberEmail}>{member.email}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[member.status.toLowerCase()]}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
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
