import { useState } from 'react';
import styles from '../../styles/municipality/Announcements.module.css';

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: 'update' | 'advisory' | 'event' | 'maintenance' | 'emergency';
  date: string;
  status: 'published' | 'draft' | 'scheduled';
  reach: number;
  engagement: number;
}

const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'Scheduled Water Supply Interruption – Zone B',
    content: 'Due to maintenance on the main pipeline, there will be a temporary water interruption in Zone B on March 8, 2026 from 6:00 AM to 2:00 PM. We advise residents to store water accordingly.',
    category: 'maintenance',
    date: '2 hours ago',
    status: 'published',
    reach: 12400,
    engagement: 342,
  },
  {
    id: 2,
    title: 'Community Clean-Up Drive – Saturday, March 15',
    content: 'Join us for the monthly community clean-up drive! Meet at the Central Park by 7:00 AM. Refreshments will be provided. Let us keep our neighborhood clean together.',
    category: 'event',
    date: '1 day ago',
    status: 'published',
    reach: 8700,
    engagement: 518,
  },
  {
    id: 3,
    title: 'Road Rehabilitation on Independence Avenue',
    content: 'We are pleased to announce that road rehabilitation works on Independence Avenue will commence next week. Motorists are advised to use alternative routes during the construction period.',
    category: 'update',
    date: '3 days ago',
    status: 'published',
    reach: 21000,
    engagement: 1203,
  },
  {
    id: 4,
    title: 'Flood Advisory – Heavy Rains Expected',
    content: 'The meteorological agency has issued a warning for heavy rains this weekend. Residents in flood-prone areas are advised to take precautionary measures.',
    category: 'advisory',
    date: '5 days ago',
    status: 'published',
    reach: 34200,
    engagement: 2100,
  },
  {
    id: 5,
    title: 'New Waste Collection Schedule',
    content: 'Starting April 1, the waste collection schedule for all zones will be updated. Please check the attached timetable for your area.',
    category: 'update',
    date: '',
    status: 'draft',
    reach: 0,
    engagement: 0,
  },
];

const categoryColors: Record<Announcement['category'], string> = {
  update: '#2563eb',
  advisory: '#d97706',
  event: '#7c3aed',
  maintenance: '#0891b2',
  emergency: '#dc2626',
};

const Announcements = () => {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [showCompose, setShowCompose] = useState(false);

  const filtered = filter === 'all'
    ? sampleAnnouncements
    : sampleAnnouncements.filter(a => a.status === filter);

  return (
    <div className={styles.announcementsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Announcements</h1>
          <p className={styles.pageSubtitle}>Create and manage public updates for your community</p>
        </div>
        <button className={styles.composeBtn} onClick={() => setShowCompose(!showCompose)}>
          + New Announcement
        </button>
      </div>

      {/* Compose Section */}
      {showCompose && (
        <div className={styles.composeCard}>
          <h2 className={styles.composeTitle}>Create Announcement</h2>
          <div className={styles.composeForm}>
            <input
              type="text"
              placeholder="Announcement title..."
              className={styles.composeInput}
            />
            <textarea
              placeholder="Write your announcement to the community..."
              className={styles.composeTextarea}
              rows={5}
            />
            <div className={styles.composeFooter}>
              <select className={styles.composeSelect}>
                <option value="">Select Category</option>
                <option value="update">Update</option>
                <option value="advisory">Advisory</option>
                <option value="event">Event</option>
                <option value="maintenance">Maintenance</option>
                <option value="emergency">Emergency</option>
              </select>
              <div className={styles.composeActions}>
                <button className={styles.draftBtn} onClick={() => setShowCompose(false)}>Save Draft</button>
                <button className={styles.publishBtn}>Publish</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {(['all', 'published', 'draft', 'scheduled'] as const).map(tab => (
          <button
            key={tab}
            className={`${styles.filterTab} ${filter === tab ? styles.activeTab : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className={styles.announcementsList}>
        {filtered.map(announcement => (
          <div key={announcement.id} className={styles.announcementCard}>
            <div className={styles.announcementHeader}>
              <span
                className={styles.categoryBadge}
                style={{ backgroundColor: categoryColors[announcement.category] + '18', color: categoryColors[announcement.category] }}
              >
                {announcement.category}
              </span>
              <span className={`${styles.statusBadge} ${styles[announcement.status]}`}>
                {announcement.status}
              </span>
            </div>
            <h3 className={styles.announcementTitle}>{announcement.title}</h3>
            <p className={styles.announcementContent}>{announcement.content}</p>
            <div className={styles.announcementFooter}>
              <span className={styles.announcementDate}>{announcement.date || 'Not published'}</span>
              {announcement.status === 'published' && (
                <div className={styles.announcementStats}>
                  <span>👁 {announcement.reach.toLocaleString()} reached</span>
                  <span>💬 {announcement.engagement.toLocaleString()} engaged</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
