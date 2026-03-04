import { useState } from 'react';
import styles from '../../styles/municipality/Messages.module.css';

interface Citizen {
  name: string;
  avatar: string;
  reportId?: string;
}

interface MuniMessage {
  id: number;
  citizen: Citizen;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  category: 'report-followup' | 'inquiry' | 'feedback' | 'complaint';
  priority: 'normal' | 'high' | 'urgent';
}

const sampleMessages: MuniMessage[] = [
  {
    id: 1,
    citizen: { name: 'Kwame Mensah', avatar: 'KM', reportId: '#248' },
    subject: 'Follow-up on Road Damage Report #248',
    preview: 'Good afternoon, I wanted to check if there has been any progress on the road damage I reported last week...',
    date: '10 minutes ago',
    unread: true,
    category: 'report-followup',
    priority: 'high',
  },
  {
    id: 2,
    citizen: { name: 'Ama Asante', avatar: 'AA', reportId: '#245' },
    subject: 'Water Leakage Still Ongoing',
    preview: 'The water leakage I reported at Central Park is still not fixed. It has been 3 days now and...',
    date: '1 hour ago',
    unread: true,
    category: 'complaint',
    priority: 'urgent',
  },
  {
    id: 3,
    citizen: { name: 'Kofi Owusu', avatar: 'KO' },
    subject: 'Thank You for the Quick Response',
    preview: 'I just wanted to say thank you for resolving the street light issue so quickly. Great service!',
    date: '3 hours ago',
    unread: false,
    category: 'feedback',
    priority: 'normal',
  },
  {
    id: 4,
    citizen: { name: 'Efua Agyeman', avatar: 'EA' },
    subject: 'Inquiry About Waste Collection',
    preview: 'When will the new waste collection schedule take effect in Zone C? We have not received any...',
    date: '5 hours ago',
    unread: false,
    category: 'inquiry',
    priority: 'normal',
  },
  {
    id: 5,
    citizen: { name: 'Yaw Boateng', avatar: 'YB', reportId: '#240' },
    subject: 'Report #240 – Additional Information',
    preview: 'I have attached additional photos of the drainage issue. The situation has worsened since the last rain...',
    date: '1 day ago',
    unread: false,
    category: 'report-followup',
    priority: 'high',
  },
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<MuniMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredMessages = sampleMessages.filter(msg => {
    const matchesSearch = msg.citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || msg.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.messagesPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Messages</h1>
          <p className={styles.pageSubtitle}>Communicate with citizens about their reports and inquiries</p>
        </div>
      </div>

      <div className={styles.messagesLayout}>
        {/* Message List */}
        <div className={styles.messageList}>
          <div className={styles.listHeader}>
            <input
              type="text"
              placeholder="Search messages..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className={styles.filterSelect}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="report-followup">Report Follow-ups</option>
              <option value="inquiry">Inquiries</option>
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaints</option>
            </select>
          </div>

          <div className={styles.listItems}>
            {filteredMessages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.messageItem} ${msg.unread ? styles.unread : ''} ${selectedMessage?.id === msg.id ? styles.active : ''}`}
                onClick={() => setSelectedMessage(msg)}
              >
                <div className={styles.avatar}>{msg.citizen.avatar}</div>
                <div className={styles.messageInfo}>
                  <div className={styles.messageTop}>
                    <span className={styles.citizenName}>{msg.citizen.name}</span>
                    <span className={styles.messageDate}>{msg.date}</span>
                  </div>
                  <p className={styles.messageSubject}>{msg.subject}</p>
                  <p className={styles.messagePreview}>{msg.preview}</p>
                  <div className={styles.messageTags}>
                    {msg.citizen.reportId && (
                      <span className={styles.reportTag}>{msg.citizen.reportId}</span>
                    )}
                    {msg.priority !== 'normal' && (
                      <span className={`${styles.priorityTag} ${styles[msg.priority]}`}>
                        {msg.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className={styles.messageDetail}>
          {selectedMessage ? (
            <>
              <div className={styles.detailHeader}>
                <div className={styles.detailAvatar}>{selectedMessage.citizen.avatar}</div>
                <div>
                  <h2 className={styles.detailName}>{selectedMessage.citizen.name}</h2>
                  <p className={styles.detailSubject}>{selectedMessage.subject}</p>
                </div>
              </div>
              <div className={styles.detailBody}>
                <p>{selectedMessage.preview}</p>
              </div>
              <div className={styles.replySection}>
                <textarea
                  placeholder="Type your response..."
                  className={styles.replyInput}
                  rows={4}
                />
                <div className={styles.replyActions}>
                  <button className={styles.replyBtn}>Send Response</button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
