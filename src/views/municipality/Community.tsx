import { useState } from 'react';
import styles from '../../styles/municipality/Community.module.css';

interface TrendingTopic {
  id: number;
  topic: string;
  posts: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  change: 'up' | 'down' | 'stable';
}

interface CitizenPost {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  category: string;
}

const trendingTopics: TrendingTopic[] = [
  { id: 1, topic: 'Road Rehabilitation Project', posts: 342, sentiment: 'positive', change: 'up' },
  { id: 2, topic: 'Water Supply Disruptions', posts: 218, sentiment: 'negative', change: 'up' },
  { id: 3, topic: 'Community Clean-Up Success', posts: 156, sentiment: 'positive', change: 'stable' },
  { id: 4, topic: 'Street Light Maintenance', posts: 134, sentiment: 'neutral', change: 'down' },
  { id: 5, topic: 'Market Area Drainage', posts: 98, sentiment: 'negative', change: 'up' },
];

const recentPosts: CitizenPost[] = [
  {
    id: 1,
    author: 'Kwame Mensah',
    avatar: 'KM',
    content: 'Great to see the road works finally starting on Ring Road! Keep it up @AccraMunicipal 💪',
    time: '15 min ago',
    likes: 24,
    comments: 8,
    category: 'Infrastructure',
  },
  {
    id: 2,
    author: 'Ama Asante',
    avatar: 'AA',
    content: 'Third day without water in Zone B. This is unacceptable. Families are suffering. When will this be fixed?',
    time: '1 hour ago',
    likes: 87,
    comments: 34,
    category: 'Utilities',
  },
  {
    id: 3,
    author: 'Kofi Owusu',
    avatar: 'KO',
    content: 'The community clean-up yesterday was a huge success! Thank you to everyone who participated. Our neighborhood looks amazing! 🎉',
    time: '3 hours ago',
    likes: 156,
    comments: 21,
    category: 'Community',
  },
  {
    id: 4,
    author: 'Efua Agyeman',
    avatar: 'EA',
    content: 'Can someone from the municipality address the drainage issue at Kaneshie market? Every time it rains the whole area floods.',
    time: '5 hours ago',
    likes: 45,
    comments: 12,
    category: 'Sanitation',
  },
];

const sentimentColors = {
  positive: '#16a34a',
  neutral: '#ca8a04',
  negative: '#dc2626',
};

const Community = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'posts' | 'engagement'>('trending');

  return (
    <div className={styles.communityPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Community</h1>
          <p className={styles.pageSubtitle}>Monitor public sentiment and citizen engagement</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <h3 className={styles.statValue}>1,247</h3>
          <p className={styles.statLabel}>Active Citizens This Week</p>
        </div>
        <div className={styles.statItem}>
          <h3 className={styles.statValue}>3,854</h3>
          <p className={styles.statLabel}>Total Posts This Month</p>
        </div>
        <div className={styles.statItem}>
          <h3 className={`${styles.statValue} ${styles.positive}`}>68%</h3>
          <p className={styles.statLabel}>Positive Sentiment</p>
        </div>
        <div className={styles.statItem}>
          <h3 className={styles.statValue}>4.1/5</h3>
          <p className={styles.statLabel}>Avg. Public Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {(['trending', 'posts', 'engagement'] as const).map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Trending Topics */}
      {activeTab === 'trending' && (
        <div className={styles.trendingList}>
          {trendingTopics.map((topic, index) => (
            <div key={topic.id} className={styles.trendingItem}>
              <span className={styles.trendingRank}>{index + 1}</span>
              <div className={styles.trendingInfo}>
                <h4 className={styles.trendingTopic}>{topic.topic}</h4>
                <span className={styles.trendingPosts}>{topic.posts} posts</span>
              </div>
              <div className={styles.trendingMeta}>
                <span
                  className={styles.sentimentBadge}
                  style={{ backgroundColor: sentimentColors[topic.sentiment] + '18', color: sentimentColors[topic.sentiment] }}
                >
                  {topic.sentiment}
                </span>
                <span className={styles.trendChange}>
                  {topic.change === 'up' ? '↑' : topic.change === 'down' ? '↓' : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Public Posts */}
      {activeTab === 'posts' && (
        <div className={styles.postsList}>
          {recentPosts.map(post => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>{post.avatar}</div>
                <div>
                  <span className={styles.postAuthor}>{post.author}</span>
                  <span className={styles.postTime}>{post.time}</span>
                </div>
                <span className={styles.postCategory}>{post.category}</span>
              </div>
              <p className={styles.postContent}>{post.content}</p>
              <div className={styles.postFooter}>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Engagement Metrics */}
      {activeTab === 'engagement' && (
        <div className={styles.engagementGrid}>
          <div className={styles.engagementCard}>
            <h4 className={styles.engagementTitle}>Top Engaged Reports</h4>
            <ul className={styles.engagementList}>
              <li>Road Damage on Main St – <strong>342 interactions</strong></li>
              <li>Water Supply Zone B – <strong>218 interactions</strong></li>
              <li>Market Drainage Issues – <strong>156 interactions</strong></li>
            </ul>
          </div>
          <div className={styles.engagementCard}>
            <h4 className={styles.engagementTitle}>Response Performance</h4>
            <ul className={styles.engagementList}>
              <li>Avg. first response: <strong>2.4 hours</strong></li>
              <li>Avg. resolution time: <strong>3.2 days</strong></li>
              <li>Citizen follow-up rate: <strong>23%</strong></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
