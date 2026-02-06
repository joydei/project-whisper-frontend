import { useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useUser } from '../../context/UserContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/Profile.module.css';

// Import SVG icons
import UserIcon from '../../assets/icons/circle-user.svg?react';
import EditIcon from '../../assets/icons/pencil.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import ClockIcon from '../../assets/icons/clock-three.svg?react';
import ClockPendingIcon from '../../assets/icons/pending.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import FollowIcon from '../../assets/icons/follow.svg?react';
import HeartIcon from '../../assets/icons/heart.svg?react';
import CommentIcon from '../../assets/icons/comment-dots.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
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
import XmarkIcon from '../../assets/icons/cross-circle.svg?react';
import SaveIcon from '../../assets/icons/disk.svg?react';

const Profile = () => {
  const { currentUser } = useUser();
  const headerOpacity = useHeaderFade();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');

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
    reportsSubmitted: 23,
    resolved: 15,
    inProgress: 6,
    pending: 2,
    followers: 142,
    likes: 387,
    comments: 94,
    views: 1248,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'report',
      action: 'Submitted a new report',
      title: 'Street Lighting Issues on Oxford Street',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'resolved',
      action: 'Report was resolved',
      title: 'Road Damage on Independence Avenue',
      time: '1 day ago',
      status: 'resolved',
    },
    {
      id: 3,
      type: 'comment',
      action: 'Commented on a report',
      title: 'Sanitation Concerns in Market Area',
      time: '2 days ago',
      status: null,
    },
    {
      id: 4,
      type: 'like',
      action: 'Received 12 likes on your report',
      title: 'Traffic Management Issues',
      time: '3 days ago',
      status: null,
    },
    {
      id: 5,
      type: 'follow',
      action: 'Gained 5 new followers',
      title: null,
      time: '4 days ago',
      status: null,
    },
  ];

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report': return MegaphoneIcon;
      case 'resolved': return CheckCircleIcon;
      case 'comment': return CommentIcon;
      case 'like': return HeartIcon;
      case 'follow': return FollowIcon;
      default: return ClockIcon;
    }
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
                      <EyeIcon className={styles.statIcon} />
                      <span className={styles.statValue}>{stats.views}</span>
                      <span className={styles.statLabel}>Views</span>
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
                    className={`${styles.tab} ${activeTab === 'activity' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('activity')}
                  >
                    <ClockIcon className={styles.tabIcon} />
                    Activity
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

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <Zoom duration={600} triggerOnce>
                  <div className={styles.tabContent}>
                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Recent Activity</h3>
                      <div className={styles.activityList}>
                        {recentActivity.map((activity) => {
                          const IconComponent = getActivityIcon(activity.type);
                          return (
                            <div key={activity.id} className={styles.activityItem}>
                              <div className={styles.activityIconWrapper}>
                                <IconComponent className={styles.activityIcon} />
                              </div>
                              <div className={styles.activityContent}>
                                <p className={styles.activityAction}>{activity.action}</p>
                                {activity.title && (
                                  <p className={styles.activityTitle}>{activity.title}</p>
                                )}
                                <span className={styles.activityTime}>{activity.time}</span>
                              </div>
                              {activity.status && (
                                <span className={`${styles.activityStatus} ${styles[activity.status]}`}>
                                  {activity.status}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
