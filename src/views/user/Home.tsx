import { useState } from 'react';
import styles from '../../styles/user/Home.module.css';

// Mock data for news feed
const municipalityNews = [
  {
    id: 1,
    title: 'Road Repairs Completed on Main Street',
    description: 'The municipality has successfully completed road repairs on Main Street. Traffic flow has been restored.',
    category: 'Infrastructure',
    date: '2 hours ago',
    image: '🚧',
    likes: 45,
    comments: 12
  },
  {
    id: 2,
    title: 'New Waste Collection Schedule',
    description: 'Starting next week, waste collection will be done every Tuesday and Friday. Please have your bins ready.',
    category: 'Sanitation',
    date: '5 hours ago',
    image: '🗑️',
    likes: 32,
    comments: 8
  },
  {
    id: 3,
    title: 'Community Health Fair This Weekend',
    description: 'Free health screenings and consultations will be available at the town square this Saturday from 9AM to 4PM.',
    category: 'Health',
    date: '1 day ago',
    image: '🏥',
    likes: 78,
    comments: 24
  },
  {
    id: 4,
    title: 'Street Light Installation in Progress',
    description: 'New LED street lights are being installed in the Park Avenue area to improve safety.',
    category: 'Utilities',
    date: '2 days ago',
    image: '💡',
    likes: 56,
    comments: 15
  }
];

const ghanaNews = [
  {
    id: 5,
    title: 'National Road Safety Campaign Launched',
    description: 'The government has launched a nationwide campaign to promote road safety awareness.',
    category: 'Safety',
    date: '3 hours ago',
    image: '🚦',
    likes: 234,
    comments: 67
  },
  {
    id: 6,
    title: 'Free Education Program Expanded',
    description: 'The free education program has been expanded to include more schools across all regions.',
    category: 'Education',
    date: '6 hours ago',
    image: '📚',
    likes: 445,
    comments: 89
  },
  {
    id: 7,
    title: 'Water Supply Infrastructure Upgrade',
    description: 'Major water supply infrastructure upgrades are underway in multiple regions.',
    category: 'Infrastructure',
    date: '1 day ago',
    image: '🚰',
    likes: 178,
    comments: 43
  },
  {
    id: 8,
    title: 'Youth Employment Initiative Success',
    description: 'Over 10,000 youth have been employed through the national employment initiative.',
    category: 'Employment',
    date: '2 days ago',
    image: '💼',
    likes: 567,
    comments: 123
  }
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<'municipality' | 'ghana'>('municipality');
  
  const currentNews = activeTab === 'municipality' ? municipalityNews : ghanaNews;

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Stay Connected with Your Community</h1>
          <p className={styles.heroSubtitle}>
            Get real-time updates and voice your concerns to make a difference
          </p>
        </div>
      </section>

      {/* News Feed Section */}
      <section className={styles.newsFeed}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'municipality' ? styles.active : ''}`}
              onClick={() => setActiveTab('municipality')}
            >
              📍 Your Municipality
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'ghana' ? styles.active : ''}`}
              onClick={() => setActiveTab('ghana')}
            >
              🇬🇭 Across Ghana
            </button>
          </div>

          <div className={styles.newsGrid}>
            {currentNews.map((news) => (
              <article key={news.id} className={styles.newsCard}>
                <div className={styles.newsIcon}>{news.image}</div>
                <div className={styles.newsContent}>
                  <span className={styles.category}>{news.category}</span>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsDescription}>{news.description}</p>
                  <div className={styles.newsFooter}>
                    <span className={styles.date}>{news.date}</span>
                    <div className={styles.engagement}>
                      <span className={styles.stat}>❤️ {news.likes}</span>
                      <span className={styles.stat}>💬 {news.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
      