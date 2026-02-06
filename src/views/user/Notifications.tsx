import { useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/Notifications.module.css';

// Import SVG icons
import HeartFilledIcon from '../../assets/icons/heart-filled.svg?react';
import CommentIcon from '../../assets/icons/comment-dots.svg?react';
import UserIcon from '../../assets/icons/circle-user.svg?react';
import UserPlusIcon from '../../assets/icons/user-add.svg?react';
import CheckCircleIcon from '../../assets/icons/user-check.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';
import StarFilledIcon from '../../assets/icons/star-filled.svg?react';
import ShareIcon from '../../assets/icons/share.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import ExclamationIcon from '../../assets/icons/exclamation.svg?react';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'reply' | 'follow' | 'mention' | 'share' | 'milestone' | 'profile' | 'report';
  actor?: string;
  action: string;
  target?: string;
  time: string;
  read: boolean;
  link?: string;
}

const Notifications = () => {
  const headerOpacity = useHeaderFade();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearConfirmed, setClearConfirmed] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      actor: 'Kwame Mensah',
      action: 'liked your comment',
      target: '"Great initiative by the municipality!"',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'reply',
      actor: 'Ama Asante',
      action: 'replied to your comment',
      target: 'on Report #248',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'follow',
      actor: 'Kofi Owusu',
      action: 'started following you',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'like',
      actor: 'Abena Osei',
      action: 'liked your report',
      target: 'Road Damage on Independence Avenue',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'comment',
      actor: 'Yaw Boateng',
      action: 'commented on your report',
      target: 'Street Lighting Issues',
      time: '3 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'mention',
      actor: 'Efua Agyeman',
      action: 'mentioned you in a comment',
      target: 'on Report #195',
      time: '5 hours ago',
      read: true
    },
    {
      id: 7,
      type: 'share',
      actor: 'Kwabena Appiah',
      action: 'shared your report',
      target: 'Sanitation Concerns',
      time: '8 hours ago',
      read: true
    },
    {
      id: 8,
      type: 'milestone',
      action: 'Your report reached 50 views',
      target: 'Water Supply Issues',
      time: '1 day ago',
      read: true
    },
    {
      id: 9,
      type: 'like',
      actor: 'Akosua Mensah',
      action: 'and 5 others liked your comment',
      target: '"This has been an ongoing issue"',
      time: '1 day ago',
      read: true
    },
    {
      id: 10,
      type: 'profile',
      action: 'Your profile information was updated successfully',
      time: '2 days ago',
      read: true
    },
    {
      id: 11,
      type: 'report',
      action: 'Your report was featured in community highlights',
      target: 'Public Safety Initiative',
      time: '2 days ago',
      read: true
    },
    {
      id: 12,
      type: 'follow',
      actor: 'Nana Yeboah',
      action: 'started following you',
      time: '3 days ago',
      read: true
    },
    {
      id: 13,
      type: 'reply',
      actor: 'Adwoa Sarpong',
      action: 'replied to your comment',
      target: 'on Report #187',
      time: '3 days ago',
      read: true
    },
    {
      id: 14,
      type: 'milestone',
      action: 'You reached 100 followers!',
      time: '4 days ago',
      read: true
    },
    {
      id: 15,
      type: 'comment',
      actor: 'Fiifi Yankson',
      action: 'commented on your report',
      target: 'Traffic Management',
      time: '5 days ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return HeartFilledIcon;
      case 'comment': return CommentIcon;
      case 'reply': return CommentIcon;
      case 'follow': return UserPlusIcon;
      case 'mention': return BellIcon;
      case 'share': return ShareIcon;
      case 'milestone': return StarFilledIcon;
      case 'profile': return UserIcon;
      case 'report': return MegaphoneIcon;
      default: return BellIcon;
    }
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' ? true : !notif.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const clearAllNotifications = () => {
    setShowClearModal(true);
  };

  const confirmClear = () => {
    setNotifications([]);
    setClearConfirmed(true);
    setTimeout(() => {
      setClearConfirmed(false);
      setShowClearModal(false);
    }, 2000);
  };

  const cancelClear = () => {
    setShowClearModal(false);
  };

  return (
    <div className={styles.notificationsPage}>
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.pageTitle}>Notifications</h1>
              <p className={styles.pageSubtitle}>Your personal notifications and interactions</p>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.statBadge}>
                <BellIcon className={styles.statIcon} />
                <span>{notifications.length} Total</span>
              </div>
              {unreadCount > 0 && (
                <div className={`${styles.statBadge} ${styles.unreadBadge}`}>
                  <BellIcon className={styles.statIcon} />
                  <span>{unreadCount} Unread</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <Fade delay={100} duration={800} triggerOnce>
            <div className={styles.toolbar}>
              <div className={styles.filters}>
                <button 
                  className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({notifications.length})
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </button>
              </div>
              
              <div className={styles.actions}>
                {unreadCount > 0 && (
                  <button className={styles.markAllBtn} onClick={markAllAsRead}>
                    <CheckCircleIcon className={styles.actionIcon} />
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button className={styles.clearBtn} onClick={clearAllNotifications}>
                    <TrashIcon className={styles.clearIcon} />
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </Fade>

          <div className={styles.notificationList}>
            {filteredNotifications.length === 0 ? (
              <Fade duration={600} triggerOnce>
                <div className={styles.emptyState}>
                  <BellIcon className={styles.emptyIcon} />
                  <h3 className={styles.emptyTitle}>No notifications yet</h3>
                  <p className={styles.emptyText}>
                    {filter === 'unread' ? 'All caught up! No unread notifications.' : 'Your activity will appear here'}
                  </p>
                </div>
              </Fade>
            ) : (
              filteredNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <Zoom key={notification.id} delay={index * 50} duration={600} triggerOnce>
                    <div 
                      className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className={styles.notificationIconWrapper}>
                        <IconComponent className={styles.notificationIcon} />
                      </div>
                      
                      <div className={styles.notificationContent}>
                        <p className={styles.notificationText}>
                          {notification.actor && (
                            <span className={styles.actor}>{notification.actor} </span>
                          )}
                          <span className={styles.action}>{notification.action}</span>
                          {notification.target && (
                            <span className={styles.target}> {notification.target}</span>
                          )}
                        </p>
                        <span className={styles.time}>{notification.time}</span>
                      </div>
                      
                      {!notification.read && <div className={styles.unreadIndicator}></div>}
                    </div>
                  </Zoom>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className={styles.modalOverlay} onClick={cancelClear}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {!clearConfirmed ? (
                <>
                  <div className={styles.modalIconWrapper}>
                    <ExclamationIcon className={styles.modalIconWarning} />
                  </div>
                  <h2 className={styles.modalTitle}>Clear All Notifications?</h2>
                  <p className={styles.modalMessage}>
                    Are you sure you want to clear all notifications? This action cannot be undone.
                  </p>
                  <div className={styles.modalActions}>
                    <button className={styles.modalCancelBtn} onClick={cancelClear}>
                      Cancel
                    </button>
                    <button className={styles.modalDeleteBtn} onClick={confirmClear}>
                      Clear All
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.modalIconWrapper}>
                    <CheckCircleIcon className={styles.modalIcon} />
                  </div>
                  <h2 className={styles.modalTitle}>Notifications Cleared</h2>
                  <p className={styles.modalMessage}>
                    All notifications have been successfully cleared.
                  </p>
                </>
              )}
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Notifications;
