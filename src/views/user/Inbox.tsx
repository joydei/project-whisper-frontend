import styles from '../../styles/user/Inbox.module.css';

const Inbox = () => {
  const messages = [
    {
      id: 1,
      from: 'Accra Municipality',
      subject: 'Your Report #248 has been resolved',
      preview: 'We are pleased to inform you that your report regarding road damage has been successfully resolved...',
      date: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      from: 'Ghana Police Service',
      subject: 'Report Status Update',
      preview: 'Your safety concern report is currently being investigated by our team...',
      date: '5 hours ago',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      from: 'Accra Municipality',
      subject: 'Scheduled Maintenance Notice',
      preview: 'Please be informed that there will be scheduled maintenance in your area...',
      date: '1 day ago',
      read: true,
      type: 'info'
    },
    {
      id: 4,
      from: 'Fire Service',
      subject: 'Fire Safety Awareness Campaign',
      preview: 'Join us for a free fire safety awareness program in your community...',
      date: '2 days ago',
      read: true,
      type: 'info'
    }
  ];

  return (
    <div className={styles.inboxPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Inbox</h1>
        <p className={styles.pageSubtitle}>Messages and updates from authorities</p>
      </div>

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
            <button className={styles.filterBtn}>Unread</button>
            <button className={styles.filterBtn}>Read</button>
          </div>
          <button className={styles.markAllBtn}>Mark all as read</button>
        </div>

        <div className={styles.messageList}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.messageCard} ${!message.read ? styles.unread : ''}`}
            >
              <div className={styles.messageIcon}>
                {message.type === 'success' ? '✅' : '📬'}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                  <span className={styles.sender}>{message.from}</span>
                  <span className={styles.date}>{message.date}</span>
                </div>
                <h3 className={styles.subject}>{message.subject}</h3>
                <p className={styles.preview}>{message.preview}</p>
              </div>
              {!message.read && <div className={styles.unreadBadge}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
