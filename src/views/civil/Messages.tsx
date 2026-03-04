import { useState } from 'react';
import styles from '../../styles/civil/Messages.module.css';

interface Conversation {
  id: number;
  name: string;
  type: 'citizen' | 'municipality';
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

const conversations: Conversation[] = [
  { id: 1, name: 'Accra Metropolitan Assembly', type: 'municipality', lastMessage: 'We have 3 officers on site at the intersection near Circle.', time: '5 min ago', unread: 2, avatar: '🏛️' },
  { id: 2, name: 'Kumasi Metropolitan Assembly', type: 'municipality', lastMessage: 'The road closure for the parade is confirmed for Saturday.', time: '1 hr ago', unread: 0, avatar: '🏛️' },
  { id: 3, name: 'Kofi Mensah', type: 'citizen', lastMessage: 'Thank you for responding to my report. The situation has calmed.', time: '2 hrs ago', unread: 0, avatar: '👤' },
  { id: 4, name: 'Tema Municipal Assembly', type: 'municipality', lastMessage: 'Request for additional patrol units for the weekend festival.', time: '3 hrs ago', unread: 1, avatar: '🏛️' },
  { id: 5, name: 'Ama Owusu', type: 'citizen', lastMessage: 'I wanted to follow up on case #INC-2026-0290.', time: '5 hrs ago', unread: 0, avatar: '👤' },
  { id: 6, name: 'Yaw Asante', type: 'citizen', lastMessage: 'There is still suspicious activity near the market at night.', time: '1 day ago', unread: 0, avatar: '👤' },
];

const Messages = () => {
  const [activeConvo, setActiveConvo] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = conversations.filter(c => filterType === 'all' || c.type === filterType);
  const active = conversations.find(c => c.id === activeConvo);

  return (
    <div className={styles.messagesPage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Messages</h1>
        <p className={styles.pageSubtitle}>Communicate with citizens and municipalities</p>
      </div>

      <div className={styles.messagesLayout}>
        {/* Sidebar List */}
        <div className={styles.convoList}>
          <div className={styles.convoListHeader}>
            <select className={styles.filterSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Messages</option>
              <option value="municipality">Municipalities</option>
              <option value="citizen">Citizens</option>
            </select>
          </div>
          {filtered.map(c => (
            <div
              key={c.id}
              className={`${styles.convoItem} ${c.id === activeConvo ? styles.active : ''}`}
              onClick={() => setActiveConvo(c.id)}
            >
              <span className={styles.convoAvatar}>{c.avatar}</span>
              <div className={styles.convoInfo}>
                <div className={styles.convoNameRow}>
                  <span className={styles.convoName}>{c.name}</span>
                  <span className={styles.convoTime}>{c.time}</span>
                </div>
                <p className={styles.convoPreview}>{c.lastMessage}</p>
              </div>
              {c.unread > 0 && <span className={styles.unreadBadge}>{c.unread}</span>}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className={styles.chatArea}>
          {active ? (
            <>
              <div className={styles.chatHeader}>
                <span className={styles.chatAvatar}>{active.avatar}</span>
                <div>
                  <h3 className={styles.chatName}>{active.name}</h3>
                  <span className={styles.chatType}>{active.type === 'municipality' ? 'Municipality' : 'Citizen'}</span>
                </div>
              </div>
              <div className={styles.chatMessages}>
                <div className={styles.messagePlaceholder}>
                  <p>💬 Messages with <strong>{active.name}</strong> would appear here.</p>
                  <p className={styles.placeholderSubtext}>This is a sample interface. Real messages would be loaded from the backend.</p>
                </div>
              </div>
              <div className={styles.chatInput}>
                <input type="text" placeholder="Type a message..." className={styles.messageInput} />
                <button className={styles.sendBtn}>Send</button>
              </div>
            </>
          ) : (
            <div className={styles.emptyChat}>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
