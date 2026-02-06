import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { usePosts } from '../../context/PostsContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/user/Home.module.css';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';

// Import SVG icons
import MarkerIcon from '../../assets/icons/marker.svg?react';
import GhanaDarkIcon from '../../assets/icons/ghana-dark.svg?react';

const Home = () => {
  const { userPosts } = usePosts();
  const headerOpacity = useHeaderFade();
  const [activeTab, setActiveTab] = useState<'municipality' | 'ghana'>('municipality');
  
  // Combine user posts with static posts and sort by time (newest first)
  const staticPosts = activeTab === 'municipality' ? municipalityPosts : ghanaPosts;
  const currentPosts = [...userPosts, ...staticPosts];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.heroContent}>
          <Fade duration={600} triggerOnce>
            <h1 className={styles.heroTitle}>Stay Connected with Your Community</h1>
            <p className={styles.heroSubtitle}>
              Get real-time updates, voice your concerns, and engage with local developments
            </p>
          </Fade>
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
              <MarkerIcon className={styles.tabIcon} />
              Your Municipality
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'ghana' ? styles.active : ''}`}
              onClick={() => setActiveTab('ghana')}
            >
              <GhanaDarkIcon className={styles.tabIcon} />
              Across Ghana
            </button>
          </div>

          <PostFeed posts={currentPosts} />
        </div>
      </section>
    </div>
  );
};

export default Home;
