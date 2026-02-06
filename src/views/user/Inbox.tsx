import { useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/Inbox.module.css';

// Import SVG icons
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import PendingIcon from '../../assets/icons/pending.svg?react';
import ClockIcon from '../../assets/icons/clock-three.svg?react';
import XCircleIcon from '../../assets/icons/cross-circle.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import PoliceIcon from '../../assets/icons/user-police.svg?react';
import FireIcon from '../../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../../assets/icons/ambulance.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import BellIcon from '../../assets/icons/bell.svg?react';
import UtilityIcon from '../../assets/icons/utility-pole-double.svg?react';
import InboxIcon from '../../assets/icons/inbox-full.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import StarIcon from '../../assets/icons/star.svg?react';
import StarFilledIcon from '../../assets/icons/star-filled.svg?react';
import FilterIcon from '../../assets/icons/settings-sliders.svg?react';
import SearchIcon from '../../assets/icons/search.svg?react';
import BoltIcon from '../../assets/icons/bolt.svg?react';
import RaindropsIcon from '../../assets/icons/raindrops.svg?react';
import GearIcon from '../../assets/icons/settings.svg?react';
import ExclamationIcon from '../../assets/icons/exclamation.svg?react';

interface Message {
  id: number;
  from: string;
  category: 'report' | 'announcement' | 'emergency' | 'system' | 'community' | 'maintenance';
  subject: string;
  preview: string;
  fullMessage: string;
  date: string;
  read: boolean;
  starred: boolean;
  status?: 'resolved' | 'in-progress' | 'pending' | 'rejected';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  reportId?: string;
}

const Inbox = () => {
  const headerOpacity = useHeaderFade();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'starred'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'Accra Municipality',
      category: 'report',
      subject: 'Report #248 has been Resolved',
      preview: 'We are pleased to inform you that your report regarding road damage on Independence Avenue has been successfully resolved...',
      fullMessage: 'Dear Citizen, We are pleased to inform you that your report #248 regarding road damage on Independence Avenue has been successfully resolved. Our maintenance team has completed the repairs. Thank you for helping us improve our community.',
      date: '2 hours ago',
      read: false,
      starred: true,
      status: 'resolved',
      priority: 'high',
      reportId: '#248'
    },
    {
      id: 2,
      from: 'Ghana Police Service',
      category: 'report',
      subject: 'Report Status Update - Under Investigation',
      preview: 'Your safety concern report #195 is currently being investigated by our specialized team...',
      fullMessage: 'Your report #195 regarding suspicious activity in Osu area is currently under investigation. Our team is working diligently on this matter and will update you soon.',
      date: '4 hours ago',
      read: false,
      starred: false,
      status: 'in-progress',
      priority: 'high',
      reportId: '#195'
    },
    {
      id: 3,
      from: 'System Notification',
      category: 'system',
      subject: 'New Feature: Real-time Report Tracking',
      preview: 'We have introduced a new feature that allows you to track your reports in real-time...',
      fullMessage: 'Exciting news! You can now track all your submitted reports in real-time with our new tracking dashboard. Visit the Voice Out page to see the status of all your reports.',
      date: '6 hours ago',
      read: true,
      starred: false,
      priority: 'low'
    },
    {
      id: 4,
      from: 'Accra Municipality',
      category: 'maintenance',
      subject: 'Scheduled Water Supply Interruption',
      preview: 'Please be informed that there will be a scheduled water supply interruption in your area on March 15th...',
      fullMessage: 'This is to inform residents of Osu, Labone, and Airport areas that there will be a scheduled water supply interruption on March 15th from 8:00 AM to 2:00 PM for essential maintenance work. Please make necessary arrangements.',
      date: '1 day ago',
      read: true,
      starred: false,
      priority: 'medium'
    },
    {
      id: 5,
      from: 'Fire Service Ghana',
      category: 'community',
      subject: 'Free Fire Safety Training Program',
      preview: 'Join us for a free fire safety awareness and training program in your community this weekend...',
      fullMessage: 'The Ghana National Fire Service invites you to a free fire safety training program on Saturday, March 18th at 10:00 AM at the Community Center. Learn essential fire prevention and emergency response skills.',
      date: '1 day ago',
      read: true,
      starred: true,
      priority: 'low'
    },
    {
      id: 6,
      from: 'Accra Municipality',
      category: 'report',
      subject: 'Report #212 Requires Additional Information',
      preview: 'We need some additional details to process your report about street lighting...',
      fullMessage: 'Your report #212 about non-functional street lights requires additional information. Please provide the exact pole numbers or landmarks to help us locate and fix the issue faster.',
      date: '2 days ago',
      read: false,
      starred: false,
      status: 'pending',
      priority: 'medium',
      reportId: '#212'
    },
    {
      id: 7,
      from: 'Ghana Police Service',
      category: 'emergency',
      subject: 'Emergency Alert: Traffic Diversion',
      preview: 'Due to an emergency situation, traffic is being diverted from Ring Road Central...',
      fullMessage: 'EMERGENCY ALERT: Due to an ongoing emergency situation, all traffic from Ring Road Central is being diverted via alternate routes. Please avoid the area and follow traffic officer instructions. Expected duration: 3 hours.',
      date: '2 days ago',
      read: true,
      starred: false,
      priority: 'urgent'
    },
    {
      id: 8,
      from: 'Electricity Company of Ghana',
      category: 'maintenance',
      subject: 'Planned Power Outage Notification',
      preview: 'ECG will conduct essential maintenance work resulting in a power outage in selected areas...',
      fullMessage: 'ECG will conduct essential maintenance work on March 20th from 9:00 AM to 4:00 PM. The following areas will be affected: East Legon, Madina, Adenta. We apologize for any inconvenience.',
      date: '3 days ago',
      read: true,
      starred: false,
      priority: 'high'
    },
    {
      id: 9,
      from: 'Accra Municipality',
      category: 'announcement',
      subject: 'New Waste Collection Schedule',
      preview: 'We are pleased to announce an improved waste collection schedule for all residential areas...',
      fullMessage: 'Starting April 1st, we will implement a new waste collection schedule. Residential areas will now have pickups on Monday, Wednesday, and Friday. Commercial areas will be serviced Tuesday, Thursday, and Saturday.',
      date: '3 days ago',
      read: true,
      starred: false,
      priority: 'medium'
    },
    {
      id: 10,
      from: 'National Ambulance Service',
      category: 'community',
      subject: 'Community Health Screening',
      preview: 'Free health screening and basic first aid training available this month...',
      fullMessage: 'The National Ambulance Service, in partnership with Accra Municipality, is offering free health screenings and basic first aid training. Visit any community center this month. Schedule available on our website.',
      date: '4 days ago',
      read: true,
      starred: false,
      priority: 'low'
    },
    {
      id: 11,
      from: 'Accra Municipality',
      category: 'report',
      subject: 'Report #187 - Unable to Process',
      preview: 'Unfortunately, we are unable to process your report due to insufficient information...',
      fullMessage: 'We regret to inform you that report #187 cannot be processed as the location provided was too vague and no supporting images were attached. Please submit a new report with precise location details.',
      date: '5 days ago',
      read: true,
      starred: false,
      status: 'rejected',
      priority: 'low',
      reportId: '#187'
    },
    {
      id: 12,
      from: 'System Notification',
      category: 'system',
      subject: 'Your Feedback Matters - Quick Survey',
      preview: 'Help us improve our services by taking a quick 2-minute survey about your experience...',
      fullMessage: 'We value your opinion! Please take 2 minutes to complete our user satisfaction survey. Your feedback helps us improve our services and better serve the community.',
      date: '1 week ago',
      read: true,
      starred: false,
      priority: 'low'
    }
  ]);

  const getSenderIcon = (from: string) => {
    const lowerFrom = from.toLowerCase();
    if (lowerFrom.includes('police')) return PoliceIcon;
    if (lowerFrom.includes('fire')) return FireIcon;
    if (lowerFrom.includes('ambulance') || lowerFrom.includes('health')) return AmbulanceIcon;
    if (lowerFrom.includes('electricity') || lowerFrom.includes('ecg')) return BoltIcon;
    if (lowerFrom.includes('water') || lowerFrom.includes('gwcl')) return RaindropsIcon;
    if (lowerFrom.includes('system')) return GearIcon;
    if (lowerFrom.includes('municipality')) return GovernmentIcon;
    return MegaphoneIcon;
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'resolved': return CheckCircleIcon;
      case 'in-progress': return ClockIcon;
      case 'pending': return PendingIcon;
      case 'rejected': return XCircleIcon;
      default: return null;
    }
  };

  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case 'urgent': return styles.urgent;
      case 'high': return styles.high;
      case 'medium': return styles.medium;
      case 'low': return styles.low;
      default: return '';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? !message.read :
      filter === 'read' ? message.read :
      filter === 'starred' ? message.starred : true;
    
    const matchesCategory = categoryFilter === 'all' ? true : message.category === categoryFilter;
    
    const matchesSearch = searchQuery === '' ? true : 
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const starredCount = messages.filter(m => m.starred).length;

  const toggleStar = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
  };

  const deleteMessage = (id: number) => {
    setMessageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessages(messages.filter(msg => msg.id !== messageToDelete));
      setDeleteConfirmed(true);
      setTimeout(() => {
        setDeleteConfirmed(false);
        setShowDeleteModal(false);
        setMessageToDelete(null);
      }, 2000);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  return (
    <div className={styles.inboxPage}>
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.pageTitle}>Inbox</h1>
              <p className={styles.pageSubtitle}>Messages and updates from authorities</p>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.statBadge}>
                <InboxIcon className={styles.statIcon} />
                <span>{messages.length} Total</span>
              </div>
              <div className={`${styles.statBadge} ${styles.unreadBadge}`}>
                <BellIcon className={styles.statIcon} />
                <span>{unreadCount} Unread</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <Fade delay={100} duration={800} triggerOnce>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search messages..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={styles.filterGroup}>
              <FilterIcon className={styles.filterIconLabel} />
              <div className={styles.filters}>
                <button 
                  className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({messages.length})
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'read' ? styles.active : ''}`}
                  onClick={() => setFilter('read')}
                >
                  Read ({messages.length - unreadCount})
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'starred' ? styles.active : ''}`}
                  onClick={() => setFilter('starred')}
                >
                  <StarFilledIcon className={styles.filterBtnIcon} />
                  Starred ({starredCount})
                </button>
              </div>
            </div>

            <div className={styles.categoryFilters}>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'all' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All Categories
              </button>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'report' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('report')}
              >
                <MegaphoneIcon className={styles.categoryIcon} />
                Reports
              </button>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'announcement' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('announcement')}
              >
                <GovernmentIcon className={styles.categoryIcon} />
                Announcements
              </button>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'emergency' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('emergency')}
              >
                <SirenIcon className={styles.categoryIcon} />
                Emergency
              </button>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'maintenance' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('maintenance')}
              >
                <UtilityIcon className={styles.categoryIcon} />
                Maintenance
              </button>
              <button 
                className={`${styles.categoryBtn} ${categoryFilter === 'community' ? styles.active : ''}`}
                onClick={() => setCategoryFilter('community')}
              >
                <MegaphoneIcon className={styles.categoryIcon} />
                Community
              </button>
            </div>
            
            {unreadCount > 0 && (
              <button className={styles.markAllBtn} onClick={markAllAsRead}>
                <CheckCircleIcon className={styles.markAllIcon} />
                Mark all as read
              </button>
            )}
          </div>
          </Fade>

          <div className={styles.messageList}>
            {filteredMessages.length === 0 ? (
              <Fade duration={600} triggerOnce>
                <div className={styles.emptyState}>
                  <InboxIcon className={styles.emptyIcon} />
                  <h3 className={styles.emptyTitle}>No messages found</h3>
                  <p className={styles.emptyText}>
                    {searchQuery ? 'Try adjusting your search terms' : 'Your inbox is empty'}
                  </p>
                </div>
              </Fade>
            ) : (
              filteredMessages.map((message, index) => {
                const SenderIcon = getSenderIcon(message.from);
                const StatusIcon = getStatusIcon(message.status);
                const CurrentStarIcon = message.starred ? StarFilledIcon : StarIcon;
                
                return (
                  <Zoom key={message.id} delay={index * 50} duration={600} triggerOnce>
                    <div 
                      className={`${styles.messageCard} ${!message.read ? styles.unread : ''} ${getPriorityClass(message.priority)}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className={styles.messageIconWrapper}>
                        <SenderIcon className={styles.messageIcon} />
                      </div>
                      
                      <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                          <div className={styles.senderInfo}>
                            <span className={styles.sender}>{message.from}</span>
                            {message.reportId && (
                              <span className={styles.reportBadge}>{message.reportId}</span>
                            )}
                            {message.priority === 'urgent' && (
                              <span className={styles.priorityBadge}>
                                <SirenIcon className={styles.priorityIcon} />
                                URGENT
                              </span>
                            )}
                          </div>
                          <div className={styles.messageActions}>
                            <button 
                              className={`${styles.actionBtn} ${message.starred ? styles.starred : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(message.id);
                              }}
                              aria-label="Toggle star"
                            >
                              <CurrentStarIcon className={styles.actionIcon} />
                            </button>
                            <span className={styles.date}>{message.date}</span>
                          </div>
                        </div>
                        
                        <div className={styles.subjectLine}>
                          <h3 className={styles.subject}>{message.subject}</h3>
                          {StatusIcon && (
                            <div className={`${styles.statusBadge} ${styles[message.status || '']}`}>
                              <StatusIcon className={styles.statusIcon} />
                              <span>{message.status?.replace('-', ' ')}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className={styles.preview}>{message.preview}</p>
                        
                        <div className={styles.categoryTag}>
                          <SenderIcon className={styles.categoryTagIcon} />
                          <span>{message.from}</span>
                        </div>
                      </div>
                      
                      <button 
                        className={styles.trashBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        aria-label="Delete message"
                      >
                        <TrashIcon className={styles.trashIcon} />
                      </button>
                      
                      {!message.read && <div className={styles.unreadIndicator}></div>}
                    </div>
                  </Zoom>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={cancelDelete}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {!deleteConfirmed ? (
                <>
                  <div className={styles.modalIconWrapper}>
                    <ExclamationIcon className={styles.modalIconWarning} />
                  </div>
                  <h2 className={styles.modalTitle}>Delete Message?</h2>
                  <p className={styles.modalMessage}>
                    Are you sure you want to delete this message? This action cannot be undone.
                  </p>
                  <div className={styles.modalActions}>
                    <button className={styles.modalCancelBtn} onClick={cancelDelete}>
                      Cancel
                    </button>
                    <button className={styles.modalDeleteBtn} onClick={confirmDelete}>
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.modalIconWrapper}>
                    <CheckCircleIcon className={styles.modalIcon} />
                  </div>
                  <h2 className={styles.modalTitle}>Message Deleted</h2>
                  <p className={styles.modalMessage}>
                    The message has been successfully deleted.
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

export default Inbox;
