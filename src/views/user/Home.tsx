import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/user/Home.module.css';

// Import SVG icons
import HeartIcon from '../../assets/icons/heart.svg?react';
import CommentIcon from '../../assets/icons/comment-dots.svg?react';
import ShareIcon from '../../assets/icons/share.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import BuildingIcon from '../../assets/icons/building.svg?react';
import PoliceIcon from '../../assets/icons/user-police.svg?react';
import FireIcon from '../../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../../assets/icons/ambulance.svg?react';
import UtilityIcon from '../../assets/icons/utility-pole-double.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import GhanaDarkIcon from '../../assets/icons/ghana-dark.svg?react';
import CleanIcon from '../../assets/icons/clean.svg?react';
import RaindropsIcon from '../../assets/icons/raindrops.svg?react';
import PendingIcon from '../../assets/icons/pending.svg?react';
import ClockIcon from '../../assets/icons/clock-three.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';

// Import images
import cokeAd from '../../assets/pictures/share-a-coke-2025-lifestyle-ooh-48-sheet-outdoor-glass.jpg';
import defaultImage from '../../assets/pictures/698ee20702caa7d07b71223dfc355e43.avif';
import cokeAvatar from '../../assets/pictures/images.png';

// Mock data for different post types
interface Post {
  id: number;
  type: 'user' | 'municipality' | 'civil' | 'ad';
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
    role?: string;
    icon?: 'police' | 'fire' | 'ambulance' | 'utility' | 'government' | 'water' | 'sanitation';
  };
  content: string;
  image?: string;
  category?: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  location?: string;
  status?: 'resolved' | 'in-progress' | 'pending' | 'urgent';
  adData?: {
    company: string;
    cta: string;
  };
}

const municipalityPosts: Post[] = [
  {
    id: 1,
    type: 'municipality',
    author: {
      name: 'Accra Metropolitan Assembly',
      verified: true,
      role: 'Municipality',
      icon: 'government'
    },
    content: 'Road Repairs Completed on Main Street. The municipality has successfully completed road repairs on Main Street. Traffic flow has been restored to normal. We thank residents for their patience during the construction period. The project involved repaving 2.5km of road surface and installing new drainage systems.',
    image: defaultImage,
    category: 'Infrastructure',
    time: '2 hours ago',
    likes: 245,
    comments: 34,
    shares: 12,
    status: 'resolved'
  },
  {
    id: 2,
    type: 'civil',
    author: {
      name: 'Ghana Police Service - Accra Division',
      verified: true,
      role: 'Emergency Services',
      icon: 'police'
    },
    content: 'Community Safety Alert: We have increased patrols in the Oxford Street area following recent reports. Our officers are working round the clock to ensure your safety. If you see anything suspicious, please call 191 or use our emergency reporting feature. Together, we can keep our community safe.',
    category: 'Safety',
    time: '3 hours ago',
    likes: 567,
    comments: 89,
    shares: 123
  },
  {
    id: 3,
    type: 'user',
    author: {
      name: 'Kwame Mensah',
      avatar: 'KM'
    },
    content: 'The street lights on Oxford Street have been out for 3 days now. It\'s becoming a safety concern, especially at night. Can someone from the municipality look into this? Several residents have also complained about this issue. @AccraMetro',
    location: 'Oxford Street, Accra',
    time: '4 hours ago',
    likes: 89,
    comments: 23,
    shares: 5,
    status: 'pending'
  },
  {
    id: 31,
    type: 'user',
    author: {
      name: 'Ama Asamoah',
      avatar: 'AA'
    },
    content: 'URGENT: Major water pipe burst on Ring Road causing flooding! The road is completely blocked and water is rushing into nearby homes. This needs immediate attention from Ghana Water Company and emergency services!',
    location: 'Ring Road, Accra',
    time: '30 minutes ago',
    likes: 342,
    comments: 78,
    shares: 156,
    status: 'urgent'
  },
  {
    id: 4,
    type: 'civil',
    author: {
      name: 'Ghana Water Company Ltd',
      verified: true,
      role: 'Civil Company',
      icon: 'water'
    },
    content: 'Scheduled Water Supply Interruption: We will be carrying out essential maintenance works on Friday, February 7th from 10:00 AM to 4:00 PM. Areas affected: Osu, Labone, East Legon, and surrounding communities. Water supply will be fully restored by 6:00 PM. We apologize for any inconvenience caused.',
    image: defaultImage,
    category: 'Utilities',
    time: '5 hours ago',
    likes: 234,
    comments: 67,
    shares: 45
  },
  {
    id: 5,
    type: 'municipality',
    author: {
      name: 'Tema Metropolitan Assembly',
      verified: true,
      role: 'Municipality',
      icon: 'sanitation'
    },
    content: 'New Waste Collection Schedule: Starting next week, waste collection will be done every Tuesday and Friday. Please have your bins ready by 6:00 AM on collection days. New collection trucks have been deployed to improve service efficiency. Let\'s keep our city clean!',
    category: 'Sanitation',
    time: '6 hours ago',
    likes: 128,
    comments: 45,
    shares: 23
  },
  {
    id: 6,
    type: 'civil',
    author: {
      name: 'Ghana Fire Service - Accra Station',
      verified: true,
      role: 'Emergency Services',
      icon: 'fire'
    },
    content: 'Fire Safety Awareness Week: This week, we are conducting free fire safety inspections for homes and businesses in the Accra Metro area. Book your inspection by calling 192. Remember: Check your smoke detectors monthly, have a fire escape plan, and never leave cooking unattended.',
    time: '8 hours ago',
    likes: 345,
    comments: 56,
    shares: 78
  },
  {
    id: 7,
    type: 'user',
    author: {
      name: 'Ama Asante',
      avatar: 'AA'
    },
    content: 'Big shoutout to the sanitation workers in our area! They\'ve been doing an amazing job keeping our streets clean despite the challenges. They deserve more recognition and better working conditions. Thank you for your service! 🙏',
    image: defaultImage,
    location: 'Osu, Accra',
    time: '1 day ago',
    likes: 456,
    comments: 78,
    shares: 34
  },
  {
    id: 8,
    type: 'civil',
    author: {
      name: 'Electricity Company of Ghana - Accra',
      verified: true,
      role: 'Civil Company',
      icon: 'utility'
    },
    content: 'Power Restoration Complete: Power has been fully restored to all areas affected by yesterday\'s outage in the Greater Accra region. We sincerely apologize for the inconvenience caused. Our technical team continues to work on infrastructure upgrades to improve service reliability and prevent future occurrences.',
    category: 'Power',
    time: '1 day ago',
    likes: 567,
    comments: 134,
    shares: 67
  }
];

const ghanaPosts: Post[] = [
  {
    id: 9,
    type: 'municipality',
    author: {
      name: 'Ministry of Roads and Highways',
      verified: true,
      role: 'Government',
      icon: 'government'
    },
    content: 'National Road Safety Campaign Launched: The government has launched a nationwide campaign to promote road safety awareness. Over 500 billboards will be installed across all regions. The campaign includes free vehicle safety checks, driver education programs, and improved road signage. Drive safely, arrive safely!',
    image: defaultImage,
    category: 'Safety',
    time: '2 hours ago',
    likes: 1234,
    comments: 267,
    shares: 145
  },
  {
    id: 10,
    type: 'ad',
    author: {
      name: 'Coca-Cola Ghana',
      role: 'Sponsor',
      avatar: cokeAvatar
    },
    content: 'Refresh Your Day with Coca-Cola! Now available in new convenient sizes at all major stores nationwide. Taste the feeling of happiness! Limited edition Ghana Independence flavors coming soon. #ShareACoke #TasteTheFeeling',
    image: cokeAd,
    time: '2 hours ago',
    likes: 2341,
    comments: 45,
    shares: 234,
    adData: {
      company: 'Coca-Cola Ghana',
      cta: 'Learn More'
    }
  },
  {
    id: 11,
    type: 'civil',
    author: {
      name: 'Ghana National Ambulance Service',
      verified: true,
      role: 'Emergency Services',
      icon: 'ambulance'
    },
    content: 'Emergency Response Update: We have deployed 50 new state-of-the-art ambulances across all 16 regions. Our average response time has improved to under 15 minutes in urban areas. For emergencies, dial 112 or use our mobile app. Every second counts - we\'re here for you 24/7.',
    category: 'Health',
    time: '4 hours ago',
    likes: 2456,
    comments: 234,
    shares: 345
  },
  {
    id: 12,
    type: 'user',
    author: {
      name: 'Kofi Adjei',
      avatar: 'KA'
    },
    content: 'Kudos to the Kumasi Metropolitan Assembly for the quick response to our drainage concerns! The area has been cleaned and repaired within 48 hours of reporting. This is what we need more of across Ghana! Efficient, responsive, and professional service. 👏👏👏',
    location: 'Kumasi, Ashanti Region',
    image: defaultImage,
    time: '6 hours ago',
    likes: 456,
    comments: 78,
    shares: 34
  },
  {
    id: 13,
    type: 'municipality',
    author: {
      name: 'Ministry of Education',
      verified: true,
      role: 'Government',
      icon: 'government'
    },
    content: 'Free Education Program Expansion: The free senior high school program has been expanded to include more schools across all regions. Over 500,000 students are now benefiting from this initiative. New digital learning centers have been established in rural areas to bridge the education gap. Ghana\'s future is bright!',
    category: 'Education',
    time: '8 hours ago',
    likes: 3456,
    comments: 456,
    shares: 234
  },
  {
    id: 14,
    type: 'civil',
    author: {
      name: 'Ghana Police Service Headquarters',
      verified: true,
      role: 'Emergency Services',
      icon: 'police'
    },
    content: 'National Crime Prevention Initiative: We\'ve launched a new community policing program in all regions. Neighborhood watch groups are being trained and equipped. Report suspicious activities via our hotline 191 or our mobile app. Together, we can make Ghana safer for everyone. Your vigilance matters.',
    time: '10 hours ago',
    likes: 1789,
    comments: 234,
    shares: 156
  },
  {
    id: 15,
    type: 'user',
    author: {
      name: 'Abena Osei',
      avatar: 'AO'
    },
    content: 'The new water infrastructure project in Tamale is impressive! Clean water is now accessible to over 100,000 residents. This is the kind of development we need across all regions. Thank you to everyone involved in making this happen. Development that matters! 💧',
    location: 'Tamale, Northern Region',
    time: '12 hours ago',
    likes: 678,
    comments: 123,
    shares: 67
  },
  {
    id: 16,
    type: 'civil',
    author: {
      name: 'Ghana National Fire Service',
      verified: true,
      role: 'Emergency Services',
      icon: 'fire'
    },
    content: 'Nationwide Fire Safety Training: We\'re offering free fire safety training sessions in all regional capitals this month. Learn how to use fire extinguishers, create evacuation plans, and prevent home fires. Protect your family, protect your property. Register now via our website. Emergency hotline: 192',
    image: defaultImage,
    category: 'Safety',
    time: '1 day ago',
    likes: 890,
    comments: 145,
    shares: 89
  }
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<'municipality' | 'ghana'>('municipality');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  
  const currentPosts = activeTab === 'municipality' ? municipalityPosts : ghanaPosts;

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'resolved': return CheckCircleIcon;
      case 'pending': return PendingIcon;
      case 'in-progress': return ClockIcon;
      case 'urgent': return SirenIcon;
      default: return null;
    }
  };

  const getAuthorIcon = (iconType?: string) => {
    switch (iconType) {
      case 'police':
        return <PoliceIcon className={styles.authorIcon} />;
      case 'fire':
        return <FireIcon className={styles.authorIcon} />;
      case 'ambulance':
        return <AmbulanceIcon className={styles.authorIcon} />;
      case 'utility':
        return <UtilityIcon className={styles.authorIcon} />;
      case 'government':
        return <GovernmentIcon className={styles.authorIcon} />;
      case 'water':
        return <RaindropsIcon className={styles.authorIcon} />;
      case 'sanitation':
        return <CleanIcon className={styles.authorIcon} />;
      default:
        return <BuildingIcon className={styles.authorIcon} />;
    }
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
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

          <div className={styles.feedContainer}>
            {currentPosts.map((post) => (
              <Fade key={post.id} duration={600} triggerOnce>
                <article className={`${styles.postCard} ${post.type === 'ad' ? styles.adPost : ''}`}>
                  {/* Post Header */}
                  <div className={styles.postHeader}>
                    <div className={styles.authorInfo}>
                      {post.type === 'user' ? (
                        <div className={styles.userAvatar}>{post.author.avatar}</div>
                      ) : post.type === 'ad' && post.author.avatar ? (
                        <div className={styles.adAvatar}>
                          <img src={post.author.avatar} alt={post.author.name} className={styles.adAvatarImage} />
                        </div>
                      ) : (
                        <div className={styles.officialAvatar}>
                          {getAuthorIcon(post.author.icon)}
                        </div>
                      )}
                      <div className={styles.authorDetails}>
                        <div className={styles.authorName}>
                          {post.author.name}
                          {post.author.verified && (
                            <CheckCircleIcon className={styles.verifiedBadge} />
                          )}
                        </div>
                        {post.author.role && (
                          <span className={styles.authorRole}>{post.author.role}</span>
                        )}
                        <span className={styles.postTime}>{post.time}</span>
                      </div>
                    </div>
                    <div className={styles.headerRight}>
                      {post.type === 'ad' && (
                        <span className={styles.sponsoredBadge}>Sponsored</span>
                      )}
                      {post.category && (
                        <span className={styles.postCategory}>{post.category}</span>
                      )}
                      {post.status && (() => {
                        const StatusIcon = getStatusIcon(post.status);
                        return StatusIcon ? (
                          <span className={`${styles.postStatus} ${styles[post.status]}`}>
                            <StatusIcon className={styles.statusIcon} />
                            <span>{post.status.replace('-', ' ')}</span>
                          </span>
                        ) : null;
                      })()}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className={styles.postContent}>
                    <p className={styles.postText}>{post.content}</p>
                    {post.location && (
                      <span className={styles.postLocation}>
                        <MarkerIcon className={styles.locationIcon} />
                        {post.location}
                      </span>
                    )}
                    {post.image && (
                      <div className={styles.postImageWrapper}>
                        <img src={post.image} alt="Post content" className={styles.postImage} />
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className={styles.postFooter}>
                    <div className={styles.postActions}>
                      <button 
                        className={`${styles.actionBtn} ${likedPosts.has(post.id) ? styles.liked : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <HeartIcon className={styles.actionIcon} />
                        <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      {post.type !== 'ad' && (
                        <button className={styles.actionBtn}>
                          <CommentIcon className={styles.actionIcon} />
                          <span>{post.comments}</span>
                        </button>
                      )}
                      <button className={styles.actionBtn}>
                        <ShareIcon className={styles.actionIcon} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    {post.adData && (
                      <button className={styles.adCta}>{post.adData.cta}</button>
                    )}
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
      