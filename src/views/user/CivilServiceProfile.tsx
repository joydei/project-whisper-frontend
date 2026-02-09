import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/user/CivilServiceProfile.module.css';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';
import { usePosts } from '../../context/PostsContext';
import { civilServiceData } from '../../data/civilServiceData';

// Import SVG icons
import ShieldIcon from '../../assets/icons/shield-check.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import PhoneIcon from '../../assets/icons/phone-call.svg?react';
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import GlobeIcon from '../../assets/icons/globe.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import ShieldTrustIcon from '../../assets/icons/shield-trust.svg?react';
import CaseStudyIcon from '../../assets/icons/case-study.svg?react';
import BoltIcon from '../../assets/icons/bolt.svg?react';
import TimeFastIcon from '../../assets/icons/time-fast.svg?react';
import FeedbackReviewIcon from '../../assets/icons/feedback-review.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';
import BellRingIcon from '../../assets/icons/bell-ring.svg?react';
import NewspaperIcon from '../../assets/icons/newspaper.svg?react';
import HeadsetIcon from '../../assets/icons/user-headset.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import UserPoliceIcon from '../../assets/icons/user-police.svg?react';
import FireStationIcon from '../../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../../assets/icons/ambulance.svg?react';
import RaindropsIcon from '../../assets/icons/raindrops.svg?react';
import ScrollDocumentIcon from '../../assets/icons/scroll-document-story.svg?react';

// Icon mapper for different civil services
const serviceIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'police': UserPoliceIcon,
  'fire': FireStationIcon,
  'ambulance': AmbulanceIcon,
  'water': RaindropsIcon,
  'electricity': BoltIcon
};

const CivilServiceProfile = () => {
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

  // Get civil service data
  const civilService = slug ? civilServiceData[slug] : null;

  // Get the appropriate icon component
  const ServiceIcon = civilService ? serviceIcons[civilService.icon] || ShieldIcon : ShieldIcon;

  // Get all posts from this civil service
  const allPosts = [...userPosts, ...municipalityPosts, ...ghanaPosts];
  
  // Helper function to generate slug from author name (same logic as PostFeed)
  const generateSlugFromAuthorName = (authorName: string): string => {
    // Generate slug from the full name (preserving location for local branches)
    return authorName
      .toLowerCase()
      .replace(/\s+-\s+/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };
  
  const organizationPosts = allPosts.filter(
    post => post.type === 'civil' && slug && generateSlugFromAuthorName(post.author.name) === slug
  );

  // Calculate statistics
  const totalPosts = organizationPosts.length;

  // Set random follower count on mount
  useEffect(() => {
    setFollowerCount(Math.floor(Math.random() * 80000) + 20000);
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

  const handleEmergencyCall = () => {
    if (civilService?.emergencyNumber) {
      window.location.href = `tel:${civilService.emergencyNumber}`;
    }
  };

  if (!civilService) {
    return (
      <div className={styles.profilePage}>
        <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
          <div className={styles.container}>
            <Fade duration={600} triggerOnce>
              <div className={styles.headerContent}>
                <button onClick={handleBack} className={styles.backButton}>
                  ← Back
                </button>
                <h1 className={styles.pageTitle}>Service Not Found</h1>
              </div>
            </Fade>
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <ShieldIcon className={styles.notFoundIcon} />
              <h2>This service could not be found</h2>
              <p>The civil service you're looking for doesn't exist or has been removed.</p>
              <button onClick={handleBack} className={styles.backBtn}>
                Go Back
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const isEmergencyService = civilService.type === 'Emergency Services';

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
                  <div 
                    className={styles.coverImage}
                    style={{ backgroundColor: civilService.coverColor }}
                  >
                    <div className={styles.coverOverlay}></div>
                    <div className={styles.coverPattern}></div>
                    {isEmergencyService && civilService.emergencyNumber && (
                      <div className={styles.emergencyBadge}>
                        <SirenIcon className={styles.emergencyIcon} />
                        <span>{civilService.emergencyNumber}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.profileInfo}>
                    <div className={styles.logoWrapper}>
                      <div 
                        className={styles.logo}
                        style={{ backgroundColor: civilService.coverColor }}
                      >
                        <ServiceIcon className={styles.logoIcon} />
                      </div>
                    </div>
                    
                    <div className={styles.orgInfo}>
                      <h1 className={styles.orgName}>
                        {civilService.name}
                        <ShieldTrustIcon className={styles.verifiedInline} />
                      </h1>
                      <p className={styles.tagline}>{civilService.tagline}</p>
                      <div className={styles.orgMeta}>
                        <span className={`${styles.orgType} ${isEmergencyService ? styles.emergency : ''}`}>
                          <ShieldIcon className={styles.metaIcon} />
                          {civilService.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.actionButtons}>
                      {isEmergencyService && civilService.emergencyNumber && (
                        <button className={styles.emergencyBtn} onClick={handleEmergencyCall}>
                          <PhoneIcon className={styles.btnIcon} />
                          Call {civilService.emergencyNumber}
                        </button>
                      )}
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
                      {civilService.responseMetrics && (
                        <>
                          <div className={styles.quickStat}>
                            <span className={styles.quickStatValue}>
                              {civilService.responseMetrics.avgResponseTime}
                            </span>
                            <span className={styles.quickStatLabel}>Response</span>
                          </div>
                          <div className={styles.quickStat}>
                            <span className={styles.quickStatValue}>
                              {civilService.responseMetrics.satisfactionRate}
                            </span>
                            <span className={styles.quickStatLabel}>Satisfaction</span>
                          </div>
                        </>
                      )}
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
                    <ShieldIcon className={styles.tabIcon} />
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
                        <ServiceIcon className={styles.emptyIcon} />
                        <p className={styles.emptyText}>No updates yet</p>
                        <p className={styles.emptySubtext}>
                          {civilService.name} hasn't posted any updates recently.
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
                    {/* Emergency Alert for Emergency Services */}
                    {isEmergencyService && civilService.emergencyNumber && (
                      <div className={styles.emergencyAlert}>
                        <div className={styles.alertContent}>
                          <SirenIcon className={styles.alertIcon} />
                          <div>
                            <h4 className={styles.alertTitle}>Emergency Contact</h4>
                            <p className={styles.alertText}>
                              For emergencies, call <strong>{civilService.emergencyNumber}</strong> immediately
                            </p>
                          </div>
                        </div>
                        <button className={styles.callNowBtn} onClick={handleEmergencyCall}>
                          <PhoneIcon className={styles.callIcon} />
                          Call Now
                        </button>
                      </div>
                    )}

                    {/* Description */}
                    <div className={styles.aboutCard}>
                      <h3 className={styles.aboutTitle}>About</h3>
                      <p className={styles.aboutDescription}>{civilService.description}</p>
                    </div>

                    {/* Key Information */}
                    <div className={styles.infoGrid}>
                      <div className={styles.infoCard}>
                        <CalendarIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Established</span>
                          <span className={styles.infoValue}>{civilService.established}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <UsersIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Personnel</span>
                          <span className={styles.infoValue}>{civilService.employees}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <MarkerIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Jurisdiction</span>
                          <span className={styles.infoValue}>{civilService.jurisdiction}</span>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <ClockIcon className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Operating Hours</span>
                          <span className={styles.infoValue}>{civilService.operatingHours}</span>
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
                            <span className={styles.contactValue}>{civilService.contact.phone}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <EnvelopeIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Email</span>
                            <span className={styles.contactValue}>{civilService.contact.email}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <GlobeIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Website</span>
                            <span className={styles.contactValue}>{civilService.contact.website}</span>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <MarkerIcon className={styles.contactIcon} />
                          <div>
                            <span className={styles.contactLabel}>Headquarters</span>
                            <span className={styles.contactValue}>{civilService.contact.headquarters}</span>
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
                        {civilService.name} is committed to providing the following services:
                      </p>
                      <div className={styles.servicesList}>
                        {civilService.services.map((service, index) => (
                          <div key={index} className={styles.serviceItem}>
                            <CheckCircleIcon className={styles.serviceIcon} />
                            <span className={styles.serviceName}>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    {civilService.responseMetrics && (
                      <div 
                        className={styles.performanceCard}
                        style={{ backgroundColor: civilService.coverColor }}
                      >
                        <h3 className={styles.performanceTitle}>Performance Metrics</h3>
                        <div className={styles.performanceGrid}>
                          <div className={styles.performanceStat}>
                            <TimeFastIcon className={styles.performanceIcon} />
                            <div className={styles.performanceValue}>
                              {civilService.responseMetrics.avgResponseTime}
                            </div>
                            <div className={styles.performanceLabel}>Avg. Response Time</div>
                          </div>
                          <div className={styles.performanceStat}>
                            <CaseStudyIcon className={styles.performanceIcon} />
                            <div className={styles.performanceValue}>
                              {civilService.responseMetrics.casesHandled}
                            </div>
                            <div className={styles.performanceLabel}>Cases Handled (Annual)</div>
                          </div>
                          <div className={styles.performanceStat}>
                            <FeedbackReviewIcon className={styles.performanceIcon} />
                            <div className={styles.performanceValue}>
                              {civilService.responseMetrics.satisfactionRate}
                            </div>
                            <div className={styles.performanceLabel}>Satisfaction Rate</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* How to Report */}
                    <div className={styles.reportCard}>
                      <h3 className={styles.reportTitle}>How to Reach Us</h3>
                      <div className={styles.reportSteps}>
                        {isEmergencyService ? (
                          <>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>1</div>
                              <div className={styles.stepContent}>
                                <h4>For Emergencies</h4>
                                <p>Call {civilService.emergencyNumber} immediately for urgent situations</p>
                              </div>
                            </div>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>2</div>
                              <div className={styles.stepContent}>
                                <h4>Non-Emergency Inquiries</h4>
                                <p>Contact our main line at {civilService.contact.phone}</p>
                              </div>
                            </div>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>3</div>
                              <div className={styles.stepContent}>
                                <h4>Online Reporting</h4>
                                <p>Visit {civilService.contact.website} to submit reports online</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>1</div>
                              <div className={styles.stepContent}>
                                <h4>Report Issues</h4>
                                <p>Call {civilService.contact.phone} or visit our website</p>
                              </div>
                            </div>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>2</div>
                              <div className={styles.stepContent}>
                                <h4>Service Requests</h4>
                                <p>Email {civilService.contact.email} for service inquiries</p>
                              </div>
                            </div>
                            <div className={styles.reportStep}>
                              <div className={styles.stepNumber}>3</div>
                              <div className={styles.stepContent}>
                                <h4>Visit Us</h4>
                                <p>Visit our office at {civilService.contact.headquarters}</p>
                              </div>
                            </div>
                          </>
                        )}
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
              <h2>Send Report to {civilService.name}</h2>
              <p>Submit your concern, complaint, or emergency report directly to this service</p>
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
                  {civilService.services.slice(0, 5).map((service: string, index: number) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input type="text" placeholder="Where is the issue/incident located?" required />
              </div>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <select>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="emergency">Emergency</option>
                </select>
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
            <p>Your report has been sent to {civilService.name}. They will review it and take appropriate action.</p>
            <button className={styles.successBtn} onClick={() => setShowReportSuccessModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CivilServiceProfile;
