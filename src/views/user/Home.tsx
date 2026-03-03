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
import TrendingIcon from '../../assets/icons/arrow-trend-up.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import BuildingIcon from '../../assets/icons/building.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import PoliceIcon from '../../assets/icons/user-police.svg?react';
import FireIcon from '../../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../../assets/icons/ambulance.svg?react';
import UtilityIcon from '../../assets/icons/utility-pole-double.svg?react';

interface TrendingItem {
  id: number;
  topic: string;
  count: string;
}

interface SuggestedItem {
  id: number;
  name: string;
  type: string;
  icon: 'building' | 'government' | 'police' | 'fire' | 'ambulance' | 'utility';
}

const municipalityTrending: TrendingItem[] = [
  { id: 1, topic: 'Flooding on Ring Road',      count: '208 posts' },
  { id: 2, topic: 'Road Damage Reports',         count: '142 posts' },
  { id: 3, topic: 'Water Supply Disruptions',    count: '87 posts'  },
  { id: 4, topic: 'Street Light Outages',        count: '64 posts'  },
  { id: 5, topic: 'Market Clean-up Campaign',    count: '31 posts'  },
];

const ghanaTrending: TrendingItem[] = [
  { id: 1, topic: 'Power Outages (ECG)',          count: '3.4k posts' },
  { id: 2, topic: 'National Road Safety Week',    count: '1.2k posts' },
  { id: 3, topic: 'Port Congestion Crisis',       count: '677 posts'  },
  { id: 4, topic: 'NHIS Expansion Program',       count: '892 posts'  },
  { id: 5, topic: 'Student Loan Forgiveness',     count: '451 posts'  },
];

const suggestedEntities: SuggestedItem[] = [
  { id: 1, name: 'Kumasi Metropolitan Assembly', type: 'Municipality',    icon: 'building' },
  { id: 2, name: 'Ghana Health Service',          type: 'Civil Service',   icon: 'ambulance' },
  { id: 3, name: 'Ghana Police Service',          type: 'Civil Service',   icon: 'police' },
  { id: 4, name: 'Ministry of Roads & Highways',  type: 'Ministry',        icon: 'government' },
  { id: 5, name: 'Tema Municipal Assembly',        type: 'Municipality',    icon: 'building' },
];

const getSuggestedIcon = (icon: SuggestedItem['icon'], className: string) => {
  switch (icon) {
    case 'building':    return <BuildingIcon    className={className} />;
    case 'government':  return <GovernmentIcon  className={className} />;
    case 'police':      return <PoliceIcon      className={className} />;
    case 'fire':        return <FireIcon        className={className} />;
    case 'ambulance':   return <AmbulanceIcon   className={className} />;
    case 'utility':     return <UtilityIcon     className={className} />;
    default:            return <BuildingIcon    className={className} />;
  }
};

const Home = () => {
  const { userPosts } = usePosts();
  const headerOpacity = useHeaderFade();
  const [activeTab, setActiveTab] = useState<'municipality' | 'ghana'>('municipality');
  const [followedIds, setFollowedIds] = useState<Set<number>>(new Set());

  const staticPosts = activeTab === 'municipality' ? municipalityPosts : ghanaPosts;
  const currentPosts = [...userPosts, ...staticPosts];
  const trendingItems = activeTab === 'municipality' ? municipalityTrending : ghanaTrending;
  const trendingLabel = activeTab === 'municipality' ? 'Your Municipality' : 'Across Ghana';

  const toggleFollow = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
          {/* Tabs */}
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

          {/* Feed + Sidebar */}
          <div className={styles.feedLayout}>
            {/* Main Feed */}
            <div className={styles.feedMain}>
              <PostFeed posts={currentPosts} />
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>

              {/* Trending Box */}
              <div className={styles.sidebarBox}>
                <div className={styles.sidebarBoxHeader}>
                  <TrendingIcon className={styles.sidebarBoxIcon} />
                  <span className={styles.sidebarBoxTitle}>Trending</span>
                  <span className={styles.sidebarBoxSubtitle}>{trendingLabel}</span>
                </div>
                <div className={styles.trendingList}>
                  {trendingItems.map((item, index) => (
                    <div key={item.id} className={styles.trendingItem}>
                      <div className={styles.trendingMeta}>
                        <span className={styles.trendingRank}>#{index + 1} Trending</span>
                      </div>
                      <div className={styles.trendingTopic}>{item.topic}</div>
                      <div className={styles.trendingCount}>{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested For You Box */}
              <div className={styles.sidebarBox}>
                <div className={styles.sidebarBoxHeader}>
                  <UsersIcon className={styles.sidebarBoxIcon} />
                  <span className={styles.sidebarBoxTitle}>Suggested For You</span>
                </div>
                <div className={styles.suggestedList}>
                  {suggestedEntities.map(entity => (
                    <div key={entity.id} className={styles.suggestedItem}>
                      <div className={styles.suggestedAvatar}>
                        {getSuggestedIcon(entity.icon, styles.suggestedAvatarIcon)}
                      </div>
                      <div className={styles.suggestedInfo}>
                        <div className={styles.suggestedName}>{entity.name}</div>
                        <div className={styles.suggestedType}>{entity.type}</div>
                      </div>
                      <button
                        className={`${styles.followBtn} ${followedIds.has(entity.id) ? styles.following : ''}`}
                        onClick={(e) => toggleFollow(entity.id, e)}
                      >
                        {followedIds.has(entity.id) ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
