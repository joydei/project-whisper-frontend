import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/user/MunicipalityProfile.module.css';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';
import { usePosts } from '../../context/PostsContext';
import { municipalityData } from '../../data/municipalityData';

// Import SVG icons
import BuildingIcon from '../../assets/icons/building.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import PhoneIcon from '../../assets/icons/phone-call.svg?react';
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import GlobeIcon from '../../assets/icons/globe.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import ShieldTrustIcon from '../../assets/icons/shield-trust.svg?react';
import ClockIcon from '../../assets/icons/clock-three.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';
import BellRingIcon from '../../assets/icons/bell-ring.svg?react';
import NewspaperIcon from '../../assets/icons/newspaper.svg?react';
import HeadsetIcon from '../../assets/icons/user-headset.svg?react';
import ScrollDocumentIcon from '../../assets/icons/scroll-document-story.svg?react';

const MunicipalityProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { userPosts } = usePosts();
  const headerOpacity = useHeaderFade();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'updates' | 'about' | 'services'>('updates');
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);

  // Get municipality data
  const municipality = slug ? municipalityData[slug] : null;

  // Get all posts from this municipality
  const allPosts = [...userPosts, ...municipalityPosts, ...ghanaPosts];
  
  // Helper function to generate slug from author name (same logic as PostFeed)
  const generateSlugFromAuthorName = (authorName: string): string => {
    return authorName
      .toLowerCase()
      .replace(/\s+-\s+/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };
  
  const organizationPosts = allPosts.filter(
    post => post.type === 'municipality' && slug && generateSlugFromAuthorName(post.author.name) === slug
  );

  // Calculate statistics
  const totalPosts = organizationPosts.length;
  const resolvedCount = organizationPosts.filter(p => p.status === 'resolved').length;
  const responseRate = totalPosts > 0 ? Math.round((resolvedCount / totalPosts) * 100) : 95;

  // Set random follower count on mount
  useEffect(() => {
    setFollowerCount(Math.floor(Math.random() * 50000) + 10000);
  }, [slug]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotifications = () => {
    setNotificationsOn(!notificationsOn);
  };

  const handleSendReport = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    setShowReportSuccessModal(true);
  };

  if (!municipality) {
    return (
      <div className={styles.profilePage}>
        <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
          <div className={styles.container}>
            <Fade duration={600} triggerOnce>
              <div className={styles.headerContent}>
                <button onClick={handleBack} className={styles.backButton}>
                  ← Back
                </button>
                <h1 className={styles.pageTitle}>Municipality Not Found</h1>
              </div>
            </Fade>
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <BuildingIcon className={styles.notFoundIcon} />
              <h2>This municipality could not be found</h2>
              <p>The municipality you're looking for doesn't exist or has been removed.</p>
              <button onClick={handleBack} className={styles.backBtn}>
                Go Back
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {/* Header */}
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.fullContainer}>
          <Fade duration={600} triggerOnce>
            <div className={styles.headerContent}>
              <button onClick={handleBack} className={styles.backButton}>
                ← Back
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className={styles.fullContainer}>
          <div className={styles.layoutGrid}>
            
            {/* Left Sidebar - Profile */}
            <aside className={styles.profileSidebar}>
              <Fade duration={800} triggerOnce>
                {/* Profile Card */}
                <div className={styles.profileCard}>
                  <div className={styles.coverImage}>
                    <div className={styles.coverOverlay}></div>
                    <div className={styles.coverPattern}></div>
                  </div>
                  
                  <div className={styles.profileInfo}>
                    <div className={styles.logoWrapper}>
                      <div className={styles.logo}>
                        <GovernmentIcon className={styles.logoIcon} />
                      </div>
                    </div>
                    
                    <div className={styles.orgInfo}>
                      <h1 className={styles.orgName}>
                        {municipality.name}
                        <ShieldTrustIcon className={styles.verifiedInline} />
                      </h1>
                      <div className={styles.orgMeta}>
                        <span className={styles.orgType}>
                          <BuildingIcon className={styles.metaIcon} />
                          Government Municipality
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.actionButtons}>
                      <button 
                        className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                        onClick={handleFollow}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                      <button className={styles.reportBtn} onClick={handleSendReport}>
                        <ScrollDocumentIcon className={styles.btnIcon} />
                        Report
                      </button>
                      <button className={`${styles.notifyBtn} ${notificationsOn ? styles.notifyActive : ''}`} onClick={handleNotifications}>
                        {notificationsOn ? <BellRingIcon className={styles.btnIcon} /> : <BellIcon className={styles.btnIcon} />}
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className={styles.quickStats}>
                      <div className={styles.quickStat}>
                        <span className={styles.quickStatValue}>{totalPosts}</span>
                        <span className={styles.quickStatLabel}>Updates</span>
                      </div>
                      <div className={styles.quickStat}>
                        <span className={styles.quickStatValue}>{followerCount.toLocaleString()}</span>
                        <span className={styles.quickStatLabel}>Followers</span>
                      </div>
                      <div className={styles.quickStat}>
                        <span className={styles.quickStatValue}>{responseRate}%</span>
                        <span className={styles.quickStatLabel}>Response</span>
                      </div>
                      <div className={styles.quickStat}>
                        <span className={styles.quickStatValue}>{resolvedCount}</span>
                        <span className={styles.quickStatLabel}>Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className={styles.tabsContainer}>
                  <button 
                    className={`${styles.tab} ${activeTab === 'updates' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('updates')}
                  >
                    <NewspaperIcon className={styles.tabIcon} />
                    <span>Updates</span>
                  </button>
                  <button 
                    className={`${styles.tab} ${activeTab === 'about' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    <BuildingIcon className={styles.tabIcon} />
                    <span>About</span>
                  </button>
                  <button 
                    className={`${styles.tab} ${activeTab === 'services' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('services')}
                  >
                    <HeadsetIcon className={styles.tabIcon} />
                    <span>Services</span>
                  </button>
                </div>
              </Fade>
            </aside>

            {/* Right Content Area */}
            <main className={styles.mainContent}>
              {/* Tab Content */}
              {/* Updates Tab */}
              {activeTab === 'updates' && (
                <Zoom duration={400} triggerOnce>
                  <div className={styles.updatesSection}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>Recent Updates</h2>
                      <span className={styles.postCount}>{totalPosts} {totalPosts === 1 ? 'update' : 'updates'}</span>
                    </div>

                    {organizationPosts.length > 0 ? (
                      <PostFeed posts={organizationPosts} />
                    ) : (
                      <div className={styles.emptyState}>
                        <BuildingIcon className={styles.emptyIcon} />
                        <p className={styles.emptyText}>No updates yet</p>
                        <p className={styles.emptySubtext}>
                          {municipality.name} hasn't posted any updates recently.
                        </p>
                      </div>
                    )}
                  </div>
                </Zoom>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <Zoom duration={400} triggerOnce>
                  <div className={styles.aboutSection}>
                    {/* Description */}
                    <div className={styles.aboutCard}>
                      <h3 className={styles.aboutTitle}>About</h3>
                      <p className={styles.aboutDescription}>{municipality.description}</p>
                    </div>

                    {/* Key Information */}
                    <div className={styles.infoGrid}>
                      <div className={styles.infoCard}>
                        <CalendarIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Established</span>
                          <span className={styles.infoValue}>{municipality.established}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <UsersIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Population</span>
                          <span className={styles.infoValue}>{municipality.population}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <MarkerIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Coverage Area</span>
                          <span className={styles.infoValue}>{municipality.area}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <ClockIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Operating Hours</span>
                          <span className={styles.infoValue}>{municipality.operatingHours}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.contactCard}>
                      <h3 className={styles.contactTitle}>Contact Information</h3>
                      <div className={styles.contactGrid}>
                        <div className={styles.contactItem}>
                          <PhoneIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Phone</span>
                            <span className={styles.contactValue}>{municipality.contact.phone}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <EnvelopeIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Email</span>
                            <span className={styles.contactValue}>{municipality.contact.email}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <GlobeIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Website</span>
                            <span className={styles.contactValue}>{municipality.contact.website}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <MarkerIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Address</span>
                            <span className={styles.contactValue}>{municipality.contact.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <Zoom duration={400} triggerOnce>
                  <div className={styles.servicesSection}>
                    <div className={styles.servicesCard}>
                      <h3 className={styles.servicesTitle}>Services We Provide</h3>
                      <p className={styles.servicesSubtitle}>
                        {municipality.name} is committed to providing the following services to our community:
                      </p>
                      <div className={styles.servicesList}>
                        {municipality.services.map((service: string, index: number) => (
                          <div key={index} className={styles.serviceItem}>
                            <CheckCircleIcon className={styles.serviceIcon} />
                            <span className={styles.serviceName}>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className={styles.performanceCard}>
                      <h3 className={styles.performanceTitle}>Performance Statistics</h3>
                      <div className={styles.performanceGrid}>
                        <div className={styles.performanceStat}>
                          <div className={styles.performanceValue}>{responseRate}%</div>
                          <div className={styles.performanceLabel}>Response Rate</div>
                          <div className={styles.performanceBar}>
                            <div className={styles.performanceProgress} style={{ width: `${responseRate}%` }}></div>
                          </div>
                        </div>
                        <div className={styles.performanceStat}>
                          <div className={styles.performanceValue}>{resolvedCount}</div>
                          <div className={styles.performanceLabel}>Issues Resolved</div>
                          <div className={styles.performanceBar}>
                            <div className={styles.performanceProgress} style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div className={styles.performanceStat}>
                          <div className={styles.performanceValue}>48h</div>
                          <div className={styles.performanceLabel}>Avg. Response Time</div>
                          <div className={styles.performanceBar}>
                            <div className={styles.performanceProgress} style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      {showReportModal && (
        <div className={styles.reportModalOverlay} onClick={handleCloseReportModal}>
          <div className={styles.reportModalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.reportModalClose} onClick={handleCloseReportModal}>
              ×
            </button>
            <div className={styles.reportModalHeader}>
              <ScrollDocumentIcon className={styles.reportModalIcon} />
              <h2>Send Report to {municipality.name}</h2>
              <p>Submit your concern, complaint, or suggestion directly to this municipality</p>
            </div>
            <form className={styles.reportForm} onSubmit={handleSubmitReport}>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <input type="text" placeholder="Brief description of your report" required />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select required>
                  <option value="">Select a category</option>
                  {municipality.services.slice(0, 5).map((service: string, index: number) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input type="text" placeholder="Where is the issue located?" required />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea placeholder="Provide details about your report..." rows={5} required></textarea>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Submit anonymously</span>
                </label>
              </div>
              <div className={styles.reportFormActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseReportModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitReportBtn}>
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Success Modal */}
      {showReportSuccessModal && (
        <div className={styles.reportModalOverlay} onClick={() => setShowReportSuccessModal(false)}>
          <div className={styles.successModalContent} onClick={e => e.stopPropagation()}>
            <CheckCircleIcon className={styles.successIcon} />
            <h2>Report Submitted Successfully</h2>
            <p>Your report has been sent to {municipality.name}. They will review it and take appropriate action.</p>
            <button className={styles.successBtn} onClick={() => setShowReportSuccessModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipalityProfile;
