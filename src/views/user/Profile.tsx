import { useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../context/PostsContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/user/Profile.module.css';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';

// Import SVG icons
import UserIcon from '../../assets/icons/circle-user.svg?react';
import EditIcon from '../../assets/icons/pencil.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import ClockIcon from '../../assets/icons/clock-three.svg?react';
import ClockPendingIcon from '../../assets/icons/pending.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import HeartIcon from '../../assets/icons/heart.svg?react';
import CommentIcon from '../../assets/icons/comment-dots.svg?react';
import LocationIcon from '../../assets/icons/marker.svg?react';
import PhoneIcon from '../../assets/icons/phone-call.svg?react';
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import LogOutIcon from '../../assets/icons/user-logout.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';
import SettingsIcon from '../../assets/icons/settings.svg?react';
import ShieldIcon from '../../assets/icons/shield-check.svg?react';
import GlobeIcon from '../../assets/icons/globe.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import XmarkIcon from '../../assets/icons/cross-circle.svg?react';
import SaveIcon from '../../assets/icons/disk.svg?react';

const Profile = () => {
  const { currentUser } = useUser();
  const { userPosts, userReports } = usePosts();
  const headerOpacity = useHeaderFade();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'settings'>('overview');
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'reports'>('posts');

  // Combine all posts and filter user's own posts
  const allPosts = [...userPosts, ...municipalityPosts, ...ghanaPosts];
  const myPosts = allPosts.filter(post => 
    !post.anonymous && post.author.name === currentUser.name
  );
  
  // Combine posts and reports for "Your Posts" section
  const myContent = [...myPosts, ...userReports].sort((a, b) => {
    // Sort by time, with "Just now" items first
    if (a.time === 'Just now' && b.time !== 'Just now') return -1;
    if (a.time !== 'Just now' && b.time === 'Just now') return 1;
    return b.id - a.id; // Then by ID (newer first)
  });

  // Calculate total likes from user's posts and reports
  const totalLikes = myContent.reduce((sum, post) => sum + post.likes, 0);
  
  // Calculate total comments from user's posts and reports
  const totalComments = myContent.reduce((sum, post) => sum + (post.commentsData?.length || 0), 0);
  
  // Calculate report statistics
  const totalReports = userReports.length;
  const resolvedReports = userReports.filter(report => report.status === 'resolved').length;
  const inProgressReports = userReports.filter(report => report.status === 'in-progress').length;
  const pendingReports = userReports.filter(report => report.status === 'pending' || report.status === 'urgent').length;

  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    phone: currentUser.phone,
    municipality: 'Accra Metropolitan',
    address: currentUser.location,
    bio: currentUser.bio,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklySummary: true,
    reportUpdates: true,
    communityAnnouncements: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showActivity: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
  });

  const stats = {
    reportsSubmitted: totalReports,
    resolved: resolvedReports,
    inProgress: inProgressReports,
    pending: pendingReports,
    followers: 142,
    likes: totalLikes,
    comments: totalComments,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy({
      ...privacy,
      [key]: value,
    });
  };

  const handleAppearanceChange = (key: string, value: any) => {
    setAppearance({
      ...appearance,
      [key]: value,
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setIsEditing(false);
  };

  return (
    <div className={styles.profilePage}>
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.container}>
          <Fade duration={600} triggerOnce>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.pageTitle}>Profile</h1>
                <p className={styles.pageSubtitle}>Manage your account and preferences</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Left Column - Profile Card */}
            <div className={styles.leftColumn}>
              <Fade delay={100} duration={800} triggerOnce>
                <div className={styles.profileCard}>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatar}>
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className={styles.avatarImage} />
                        ) : (
                          <span className={styles.avatarInitials}>{getInitials(formData.fullName)}</span>
                        )}
                      </div>
                      <label htmlFor="profilePictureInput" className={styles.avatarUpload}>
                        <CameraIcon className={styles.cameraIcon} />
                      </label>
                      <input
                        id="profilePictureInput"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <h2 className={styles.userName}>{formData.fullName}</h2>
                    <p className={styles.userEmail}>@{formData.username}</p>
                    <p className={styles.memberSince}>
                      <CalendarIcon className={styles.inlineIcon} />
                      Member since {currentUser.joinDate}
                    </p>
                  </div>

                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <MegaphoneIcon className={styles.statIcon} />
                      <span className={styles.statValue}>{stats.reportsSubmitted}</span>
                      <span className={styles.statLabel}>Reports</span>
                    </div>
                    <div className={styles.statCard}>
                      <UsersIcon className={styles.statIcon} />
                      <span className={styles.statValue}>{stats.followers}</span>
                      <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.statCard}>
                      <HeartIcon className={styles.statIcon} />
                      <span className={styles.statValue}>{stats.likes}</span>
                      <span className={styles.statLabel}>Likes</span>
                    </div>
                    <div className={styles.statCard}>
                      <CommentIcon className={styles.statIcon} />
                      <span className={styles.statValue}>{stats.comments}</span>
                      <span className={styles.statLabel}>Comments</span>
                    </div>
                  </div>

                  <div className={styles.quickStats}>
                    <div className={styles.quickStat}>
                      <CheckCircleIcon className={styles.quickStatIcon} style={{ fill: '#059669' }} />
                      <span className={styles.quickStatValue}>{stats.resolved}</span>
                      <span className={styles.quickStatLabel}>Resolved</span>
                    </div>
                    <div className={styles.quickStat}>
                      <ClockIcon className={styles.quickStatIcon} style={{ fill: '#FF9800' }} />
                      <span className={styles.quickStatValue}>{stats.inProgress}</span>
                      <span className={styles.quickStatLabel}>In Progress</span>
                    </div>
                    <div className={styles.quickStat}>
                      <ClockPendingIcon className={styles.quickStatIcon} style={{ fill: '#367DFF' }} />
                      <span className={styles.quickStatValue}>{stats.pending}</span>
                      <span className={styles.quickStatLabel}>Pending</span>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Right Column - Tabs Content */}
            <div className={styles.rightColumn}>
              <Fade delay={200} duration={800} triggerOnce>
                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <UserIcon className={styles.tabIcon} />
                    Overview
                  </button>
                  <button
                    className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('posts')}
                  >
                    <MegaphoneIcon className={styles.tabIcon} />
                    Posts & Reports
                  </button>
                  <button
                    className={`${styles.tab} ${activeTab === 'settings' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <SettingsIcon className={styles.tabIcon} />
                    Settings
                  </button>
                </div>
              </Fade>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <Zoom duration={600} triggerOnce>
                  <div className={styles.tabContent}>
                    <div className={styles.section}>
                      <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Personal Information</h3>
                        {!isEditing ? (
                          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                            <EditIcon className={styles.btnIcon} />
                            Edit
                          </button>
                        ) : (
                          <div className={styles.editActions}>
                            <button className={styles.cancelBtn} onClick={handleCancel}>
                              <XmarkIcon className={styles.btnIcon} />
                              Cancel
                            </button>
                            <button className={styles.saveBtn} onClick={handleSave}>
                              <SaveIcon className={styles.btnIcon} />
                              Save
                            </button>
                          </div>
                        )}
                      </div>

                      {!isEditing ? (
                        <div className={styles.infoGrid}>
                          <div className={styles.infoItem}>
                            <UserIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Full Name</span>
                              <span className={styles.infoValue}>{formData.fullName}</span>
                            </div>
                          </div>
                          <div className={styles.infoItem}>                            <UserIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Username</span>
                              <span className={styles.infoValue}>@{formData.username}</span>
                            </div>
                          </div>
                          <div className={styles.infoItem}>                            <EnvelopeIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Email</span>
                              <span className={styles.infoValue}>{formData.email}</span>
                            </div>
                          </div>
                          <div className={styles.infoItem}>
                            <PhoneIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Phone</span>
                              <span className={styles.infoValue}>{formData.phone}</span>
                            </div>
                          </div>
                          <div className={styles.infoItem}>
                            <GlobeIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Municipality</span>
                              <span className={styles.infoValue}>{formData.municipality}</span>
                            </div>
                          </div>
                          <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                            <LocationIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Address</span>
                              <span className={styles.infoValue}>{formData.address}</span>
                            </div>
                          </div>
                          <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                            <UserIcon className={styles.infoIcon} />
                            <div className={styles.infoContent}>
                              <span className={styles.infoLabel}>Bio</span>
                              <span className={styles.infoValue}>{formData.bio}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <form className={styles.editForm}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Username</label>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Municipality</label>
                            <input
                              type="text"
                              name="municipality"
                              value={formData.municipality}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Address</label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Bio</label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleInputChange}
                              className={styles.formTextarea}
                              rows={3}
                            />
                          </div>
                        </form>
                      )}
                    </div>

                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Account Actions</h3>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionBtn} onClick={() => setShowPasswordModal(true)}>
                          <KeyIcon className={styles.actionIcon} />
                          <div>
                            <div className={styles.actionTitle}>Change Password</div>
                            <div className={styles.actionDesc}>Update your password</div>
                          </div>
                        </button>
                        <button className={styles.actionBtnDanger} onClick={() => setShowLogoutModal(true)}>
                          <LogOutIcon className={styles.actionIcon} />
                          <div>
                            <div className={styles.actionTitle}>Log Out</div>
                            <div className={styles.actionDesc}>Logout from your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </Zoom>
              )}

              {/* Posts & Reports Tab */}
              {activeTab === 'posts' && (
                <Zoom duration={600} triggerOnce>
                  <div className={styles.tabContent}>
                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>
                        <MegaphoneIcon className={styles.sectionIcon} />
                        Posts & Reports
                      </h3>
                      
                      {/* Sub-tabs */}
                      <div className={styles.subTabs}>
                        <button
                          className={`${styles.subTab} ${activeSubTab === 'posts' ? styles.activeSubTab : ''}`}
                          onClick={() => setActiveSubTab('posts')}
                        >
                          <MegaphoneIcon className={styles.subTabIcon} />
                          Posts ({myPosts.length})
                        </button>
                        <button
                          className={`${styles.subTab} ${activeSubTab === 'reports' ? styles.activeSubTab : ''}`}
                          onClick={() => setActiveSubTab('reports')}
                        >
                          <SirenIcon className={styles.subTabIcon} />
                          Reports ({userReports.length})
                        </button>
                      </div>

                      {/* Posts Content */}
                      {activeSubTab === 'posts' && (
                        <div className={styles.subTabContent}>
                          {myPosts.length > 0 ? (
                            <PostFeed posts={myPosts} />
                          ) : (
                            <div className={styles.emptyState}>
                              <MegaphoneIcon className={styles.emptyStateIcon} />
                              <p>You haven't created any posts yet.</p>
                              <p className={styles.emptyStateSubtext}>
                                Share your thoughts with the community on the Home page.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reports Content */}
                      {activeSubTab === 'reports' && (
                        <div className={styles.subTabContent}>
                          {userReports.length > 0 ? (
                            <div className={styles.reportsContainer}>
                              {userReports.map((report) => (
                                <div key={report.id} className={styles.reportCard}>
                                  <div className={styles.reportHeader}>
                                    <div className={styles.reportMeta}>
                                      <span className={styles.reportId}>Report #{report.id}</span>
                                      <span className={styles.reportTarget}>
                                        To: {report.scope === 'municipality' ? 'Municipality' : 'Civil Service'}
                                      </span>
                                    </div>
                                    <div className={`${styles.reportStatus} ${styles[report.status || 'pending']}`}>
                                      {report.status === 'resolved' && <CheckCircleIcon className={styles.statusIcon} />}
                                      {report.status === 'in-progress' && <ClockIcon className={styles.statusIcon} />}
                                      {(report.status === 'pending' || report.status === 'urgent') && <ClockPendingIcon className={styles.statusIcon} />}
                                      <span>{report.status === 'urgent' ? 'URGENT' : (report.status?.replace('-', ' ') || 'pending')}</span>
                                    </div>
                                  </div>
                                  
                                  <div className={styles.reportBody}>
                                    <div className={styles.reportDetails}>
                                      <div className={styles.reportCategory}>
                                        <span className={styles.categoryBadge}>{report.category}</span>
                                        {report.location && (
                                          <span className={styles.locationBadge}>
                                            <LocationIcon className={styles.locationIcon} />
                                            {report.location}
                                          </span>
                                        )}
                                      </div>
                                      
                                      <div className={styles.reportContent}>
                                        <p>{report.content}</p>
                                      </div>
                                    </div>
                                    
                                    <div className={styles.reportFooter}>
                                      <span className={styles.reportDate}>Submitted {report.time}</span>
                                      <div className={styles.reportActions}>
                                        <span className={styles.reportInteraction}>
                                          <HeartIcon className={styles.interactionIcon} />
                                          {report.likes}
                                        </span>
                                        <span className={styles.reportInteraction}>
                                          <CommentIcon className={styles.interactionIcon} />
                                          {report.comments}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className={styles.emptyState}>
                              <SirenIcon className={styles.emptyStateIcon} />
                              <p>You haven't submitted any reports yet.</p>
                              <p className={styles.emptyStateSubtext}>
                                Submit reports to authorities from the Voice Out page.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Zoom>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <Zoom duration={600} triggerOnce>
                  <div className={styles.tabContent}>
                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>
                        <BellIcon className={styles.sectionIcon} />
                        Notification Preferences
                      </h3>
                      <div className={styles.settingsList}>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Email Notifications</h4>
                            <p className={styles.settingDesc}>Receive updates via email</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={notifications.emailNotifications}
                              onChange={() => handleNotificationToggle('emailNotifications')}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>SMS Notifications</h4>
                            <p className={styles.settingDesc}>Receive updates via SMS</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={notifications.smsNotifications}
                              onChange={() => handleNotificationToggle('smsNotifications')}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Weekly Summary</h4>
                            <p className={styles.settingDesc}>Get weekly activity summary</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={notifications.weeklySummary}
                              onChange={() => handleNotificationToggle('weeklySummary')}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Report Updates</h4>
                            <p className={styles.settingDesc}>Get notified about your report status changes</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={notifications.reportUpdates}
                              onChange={() => handleNotificationToggle('reportUpdates')}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Community Announcements</h4>
                            <p className={styles.settingDesc}>Receive municipality announcements</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={notifications.communityAnnouncements}
                              onChange={() => handleNotificationToggle('communityAnnouncements')}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>
                        <ShieldIcon className={styles.sectionIcon} />
                        Privacy Settings
                      </h3>
                      <div className={styles.settingsList}>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Profile Visibility</h4>
                            <p className={styles.settingDesc}>Control who can see your profile</p>
                          </div>
                          <select
                            className={styles.select}
                            value={privacy.profileVisibility}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          >
                            <option value="public">Public</option>
                            <option value="followers">Followers Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Show Email</h4>
                            <p className={styles.settingDesc}>Display email on your public profile</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={privacy.showEmail}
                              onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Show Phone</h4>
                            <p className={styles.settingDesc}>Display phone number on your profile</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={privacy.showPhone}
                              onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Show Activity</h4>
                            <p className={styles.settingDesc}>Let others see your recent activity</p>
                          </div>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={privacy.showActivity}
                              onChange={() => handlePrivacyChange('showActivity', !privacy.showActivity)}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Appearance</h3>
                      <div className={styles.settingsList}>
                        <div className={styles.settingItem}>
                          <div>
                            <h4 className={styles.settingTitle}>Theme</h4>
                            <p className={styles.settingDesc}>Choose your preferred theme</p>
                          </div>
                          <select
                            className={styles.select}
                            value={appearance.theme}
                            onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                          >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.modalTitle}>Change Password</h2>
              <form className={styles.passwordForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input type="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <input type="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <input type="password" className={styles.formInput} />
                </div>
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.modalCancelBtn}
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.modalConfirmBtn}>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIconWrapper}>
                <LogOutIcon className={styles.modalIcon} />
              </div>
              <h2 className={styles.modalTitle}>Log Out</h2>
              <p className={styles.modalMessage}>
                Are you sure you want to log out of your account?
              </p>
              <div className={styles.modalActions}>
                <button
                  className={styles.modalCancelBtn}
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button className={styles.modalConfirmBtn}>
                  Log Out
                </button>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Profile;
