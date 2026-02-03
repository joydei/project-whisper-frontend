import styles from '../../styles/user/Notifications.module.css';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: '✅',
      title: 'Report Resolved',
      message: 'Your report #248 regarding road damage has been successfully resolved.',
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'info',
      icon: '📢',
      title: 'New Update',
      message: 'Municipality has posted an update about waste collection schedule changes.',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'warning',
      icon: '⚠️',
      title: 'Report in Progress',
      message: 'Your report #245 is currently being processed by the authorities.',
      time: '5 hours ago'
    },
    {
      id: 4,
      type: 'info',
      icon: '💬',
      title: 'New Comment',
      message: 'Accra Municipality commented on your report about street lights.',
      time: '1 day ago'
    },
    {
      id: 5,
      type: 'success',
      icon: '✓',
      title: 'Welcome to Aircho',
      message: 'Your account has been successfully created. Start voicing your concerns!',
      time: '2 days ago'
    }
  ];

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Notifications</h1>
        <p className={styles.pageSubtitle}>Stay updated with your reports and community updates</p>
      </div>

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button className={styles.markAllBtn}>Mark all as read</button>
          <button className={styles.clearBtn}>Clear all</button>
        </div>

        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={`${styles.notificationCard} ${styles[notification.type]}`}>
              <div className={styles.notificationIcon}>{notification.icon}</div>
              <div className={styles.notificationContent}>
                <h3 className={styles.title}>{notification.title}</h3>
                <p className={styles.message}>{notification.message}</p>
                <span className={styles.time}>{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
