import { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { usePosts } from '../../context/PostsContext';
import { useUser } from '../../context/UserContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/Home.module.css';
import type { Post } from '../../data/postsData';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';

// Import SVG icons
import HeartIcon from '../../assets/icons/heart.svg?react';
import HeartFilledIcon from '../../assets/icons/heart-filled.svg?react';
import CommentIcon from '../../assets/icons/comment-dots.svg?react';
import ShareIcon from '../../assets/icons/share.svg?react';
import RetweetIcon from '../../assets/icons/arrows-retweet.svg?react';
import XIcon from '../../assets/icons/cross-circle.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import ShieldTrustIcon from '../../assets/icons/shield-trust.svg?react';
import MenuDotsIcon from '../../assets/icons/menu-dots.svg?react';
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
import PollHIcon from '../../assets/icons/poll-h.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import ClipFileIcon from '../../assets/icons/clip-file.svg?react';
import FlagIcon from '../../assets/icons/flag.svg?react';

const Home = () => {
  const { userPosts } = usePosts();
  const { currentUser } = useUser();
  const headerOpacity = useHeaderFade();
  const [activeTab, setActiveTab] = useState<'municipality' | 'ghana'>('municipality');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [repostedPosts, setRepostedPosts] = useState<Set<number>>(new Set());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentAnonymous, setCommentAnonymous] = useState(false);
  const [newTip, setNewTip] = useState('');
  const [tipAnonymous, setTipAnonymous] = useState(false);
  
  // Comment interaction states
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [repostedComments, setRepostedComments] = useState<Set<number>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());
  const [repostedReplies, setRepostedReplies] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{commentId: number; username: string; author: string} | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  const [dynamicComments, setDynamicComments] = useState<{[key: number]: any[]}>({});
  const [showTipModal, setShowTipModal] = useState(false);
  const [deletedComments, setDeletedComments] = useState<Set<number>>(new Set());
  const [openMenuCommentId, setOpenMenuCommentId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<{id: number; hasReplies: boolean} | null>(null);
  const [openMenuReplyId, setOpenMenuReplyId] = useState<number | null>(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState<{id: number; commentId: number} | null>(null);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [deletedPosts, setDeletedPosts] = useState<Set<number>>(new Set());
  const [openMenuPostId, setOpenMenuPostId] = useState<number | null>(null);
  const [imageViewer, setImageViewer] = useState<{images: string[]; currentIndex: number} | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportItem, setReportItem] = useState<{type: 'post' | 'comment' | 'reply'; id: number; content: string} | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [selectedReportOffense, setSelectedReportOffense] = useState('');
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
  
  // Poll voting state
  const [pollVotes, setPollVotes] = useState<{[postId: number]: number}>({});
  
  // Combine user posts with static posts and sort by time (newest first)
  const staticPosts = activeTab === 'municipality' ? municipalityPosts : ghanaPosts;
  const currentPosts = [...userPosts, ...staticPosts];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuCommentId(null);
      setOpenMenuReplyId(null);
      setOpenMenuPostId(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const handleRepost = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRepostedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handlePollVote = (postId: number, optionIndex: number, e: React.MouseEvent, isPollEnded: boolean) => {
    e.stopPropagation();
    // Allow voting if poll hasn't ended (users can change their vote)
    if (!isPollEnded) {
      setPollVotes(prev => ({
        ...prev,
        [postId]: optionIndex
      }));
    }
  };

  const handleRemoveVote = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPollVotes(prev => {
      const newVotes = { ...prev };
      delete newVotes[postId];
      return newVotes;
    });
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setNewComment('');
    setCommentAnonymous(false);
    setNewTip('');
    setTipAnonymous(false);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && selectedPost) {
      const newCommentObj = {
        id: Date.now(),
        author: commentAnonymous ? 'Anonymous' : currentUser.name,
        username: commentAnonymous ? undefined : currentUser.username,
        avatar: commentAnonymous ? undefined : currentUser.avatar,
        content: newComment,
        time: 'Just now',
        anonymous: commentAnonymous,
        likes: 0,
        replies: []
      };
      
      setDynamicComments(prev => ({
        ...prev,
        [selectedPost.id]: [...(prev[selectedPost.id] || []), newCommentObj]
      }));
      
      setNewComment('');
      setCommentAnonymous(false);
    }
  };

  const handleDeleteComment = (comment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuCommentId(null);
    const hasReplies = comment.replies && comment.replies.length > 0;
    setCommentToDelete({ id: comment.id, hasReplies });
    setShowDeleteModal(true);
  };

  const confirmDeleteComment = () => {
    if (commentToDelete) {
      if (commentToDelete.hasReplies) {
        // If has replies, mark as deleted (show "This comment is not available")
        setDeletedComments(prev => {
          const newSet = new Set(prev);
          newSet.add(commentToDelete.id);
          return newSet;
        });
      } else {
        // If no replies, remove completely from dynamicComments
        if (selectedPost) {
          setDynamicComments(prev => ({
            ...prev,
            [selectedPost.id]: (prev[selectedPost.id] || []).filter(c => c.id !== commentToDelete.id)
          }));
        }
      }
      setShowDeleteModal(false);
      setCommentToDelete(null);
      setShowDeleteSuccessModal(true);
    }
  };

  const handleDeleteReply = (reply: any, comment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuReplyId(null);
    setReplyToDelete({ id: reply.id, commentId: comment.id });
    setShowDeleteModal(true);
  };

  const confirmDeleteReply = () => {
    if (replyToDelete && selectedPost) {
      setDynamicComments(prev => {
        const originalComments = selectedPost.commentsData || [];
        const prevDynamic = prev[selectedPost.id] || [];
        
        // Create a map of dynamic comments
        const dynamicMap = new Map(prevDynamic.map(c => [c.id, c]));
        
        // Merge to get current state
        const allComments = originalComments.map(oc => 
          dynamicMap.has(oc.id) ? dynamicMap.get(oc.id)! : oc
        ).concat(
          prevDynamic.filter(dc => !originalComments.some(oc => oc.id === dc.id))
        );
        
        const targetComment = allComments.find(c => c.id === replyToDelete.commentId);
        
        if (targetComment) {
          const updatedReplies = (targetComment.replies || []).filter((r: any) => r.id !== replyToDelete.id);
          
          // Check if comment was deleted and has no remaining replies
          if (deletedComments.has(replyToDelete.commentId) && updatedReplies.length === 0) {
            // Remove the comment completely
            setDeletedComments(prev => {
              const newSet = new Set(prev);
              newSet.delete(replyToDelete.commentId);
              return newSet;
            });
            
            return {
              ...prev,
              [selectedPost.id]: prevDynamic.filter(c => c.id !== replyToDelete.commentId)
            };
          }
          
          const updatedComment = {
            ...targetComment,
            replies: updatedReplies
          };
          
          let updatedDynamic = [...prevDynamic];
          const dynamicIndex = updatedDynamic.findIndex(c => c.id === replyToDelete.commentId);
          
          if (dynamicIndex !== -1) {
            updatedDynamic[dynamicIndex] = updatedComment;
          } else {
            updatedDynamic.push(updatedComment);
          }
          
          return {
            ...prev,
            [selectedPost.id]: updatedDynamic
          };
        }
        
        return prev;
      });
      
      setShowDeleteModal(false);
      setReplyToDelete(null);
      setShowDeleteSuccessModal(true);
    }
  };

  const handleSubmitTip = () => {
    if (newTip.trim()) {
      // In a real app, this would send to backend privately
      console.log('Tip submitted:', { content: newTip, anonymous: tipAnonymous });
      setNewTip('');
      setTipAnonymous(false);
      setShowTipModal(true);
    }
  };

  const handleLikeComment = (commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleRepostComment = (commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRepostedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleShareComment = (commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Share comment:', commentId);
    // In a real app, this would open share dialog
  };

  const handleReplyComment = (comment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setReplyingTo({
      commentId: comment.id,
      username: comment.username || 'anonymous',
      author: comment.author
    });
    setReplyText('');
  };

  const handleLikeReply = (replyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(replyId)) {
        newSet.delete(replyId);
      } else {
        newSet.add(replyId);
      }
      return newSet;
    });
  };

  const handleRepostReply = (replyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRepostedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(replyId)) {
        newSet.delete(replyId);
      } else {
        newSet.add(replyId);
      }
      return newSet;
    });
  };

  const handleShareReply = (replyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Share reply:', replyId);
  };

  const handleReplyToReply = (reply: any, parentComment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setReplyingTo({
      commentId: parentComment.id,
      username: reply.username || 'anonymous',
      author: reply.author
    });
    setReplyText(`@${reply.username || 'anonymous'} `);
  };

  // Function to render text with bold @mentions
  const renderTextWithMentions = (text: string) => {
    const parts = text.split(/(@\w+)/);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} style={{ fontWeight: 700, color: '#000' }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleSubmitReply = () => {
    if (replyText.trim() && replyingTo && selectedPost) {
      // Ensure @mention is included
      let content = replyText.trim();
      if (!content.startsWith(`@${replyingTo.username}`) && !replyingTo.username.includes('anonymous')) {
        content = `@${replyingTo.username} ${content}`;
      }
      
      const newReply = {
        id: Date.now(),
        author: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        content: content,
        time: 'Just now',
        anonymous: false,
        likes: 0
      };
      
      setDynamicComments(prev => {
        const originalComments = selectedPost.commentsData || [];
        const prevDynamic = prev[selectedPost.id] || [];
        
        // Create a map of dynamic comments
        const dynamicMap = new Map(prevDynamic.map(c => [c.id, c]));
        
        // Merge to get current state
        const allComments = originalComments.map(oc => 
          dynamicMap.has(oc.id) ? dynamicMap.get(oc.id)! : oc
        ).concat(
          prevDynamic.filter(dc => !originalComments.some(oc => oc.id === dc.id))
        );
        
        const targetComment = allComments.find(c => c.id === replyingTo.commentId);
        
        if (targetComment) {
          const updatedComment = {
            ...targetComment,
            replies: [...(targetComment.replies || []), newReply]
          };
          
          let updatedDynamic = [...prevDynamic];
          const dynamicIndex = updatedDynamic.findIndex(c => c.id === replyingTo.commentId);
          
          if (dynamicIndex !== -1) {
            updatedDynamic[dynamicIndex] = updatedComment;
          } else {
            updatedDynamic.push(updatedComment);
          }
          
          return {
            ...prev,
            [selectedPost.id]: updatedDynamic
          };
        }
        
        return prev;
      });
      
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const toggleExpanded = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleDeletePost = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuPostId(null);
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDeletePost = () => {
    if (postToDelete) {
      const post = currentPosts.find(p => p.id === postToDelete);
      const hasComments = post && post.commentsData && post.commentsData.length > 0;
      
      if (hasComments) {
        // Mark as deleted if has comments
        setDeletedPosts(prev => {
          const newSet = new Set(prev);
          newSet.add(postToDelete);
          return newSet;
        });
      } else {
        // Remove completely if no comments
        // This would need to be handled in the PostsContext to actually remove the post
        setDeletedPosts(prev => {
          const newSet = new Set(prev);
          newSet.add(postToDelete);
          return newSet;
        });
      }
      
      setShowDeleteModal(false);
      setPostToDelete(null);
      setShowDeleteSuccessModal(true);
    }
  };

  const handleReportPost = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuPostId(null);
    setReportItem({
      type: 'post',
      id: post.id,
      content: post.content
    });
    setShowReportModal(true);
  };

  const handleReportComment = (comment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuCommentId(null);
    setReportItem({
      type: 'comment',
      id: comment.id,
      content: comment.content
    });
    setShowReportModal(true);
  };

  const handleReportReply = (reply: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuReplyId(null);
    setReportItem({
      type: 'reply',
      id: reply.id,
      content: reply.content
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = () => {
    // Validate that either an offense is selected, or "Other" is selected with description
    const isValid = selectedReportOffense && (selectedReportOffense !== 'other' || reportReason.trim());
    
    if (isValid && reportItem) {
      console.log('Report submitted:', {
        type: reportItem.type,
        id: reportItem.id,
        offense: selectedReportOffense,
        reason: reportReason
      });
      setShowReportModal(false);
      setReportItem(null);
      setReportReason('');
      setSelectedReportOffense('');
      setShowReportSuccessModal(true);
    }
  };

  const shouldTruncate = (content: string) => {
    return content.length > 300;
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

          <div className={styles.feedContainer}>
            {currentPosts.map((post) => (
              <Fade key={post.id} duration={600} triggerOnce>
                <article 
                  className={`${styles.postCard} ${post.type === 'ad' ? styles.adPost : ''}`}
                  onClick={() => handlePostClick(post)}
                >
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
                            <ShieldTrustIcon className={styles.verifiedBadge} />
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
                      {/* Delete button for user's own posts */}
                      {post.type === 'user' && !post.anonymous && post.author.name === currentUser.name && !deletedPosts.has(post.id) && (
                        <div className={styles.commentMenuWrapper}>
                          <button
                            className={styles.deletePostBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuPostId(openMenuPostId === post.id ? null : post.id);
                            }}
                            title="More options"
                          >
                            <MenuDotsIcon className={styles.menuDotsIcon} />
                          </button>
                          {openMenuPostId === post.id && (
                            <div className={styles.commentDropdown} onClick={(e) => e.stopPropagation()}>
                              <button
                                className={styles.dropdownItem}
                                onClick={(e) => handleDeletePost(post.id, e)}
                              >
                                <TrashIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                                Delete Post
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {/* Report button for other users' posts */}
                      {post.type === 'user' && (post.anonymous || post.author.name !== currentUser.name) && !deletedPosts.has(post.id) && (
                        <div className={styles.commentMenuWrapper}>
                          <button
                            className={styles.deletePostBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuPostId(openMenuPostId === post.id ? null : post.id);
                            }}
                            title="More options"
                          >
                            <MenuDotsIcon className={styles.menuDotsIcon} />
                          </button>
                          {openMenuPostId === post.id && (
                            <div className={styles.commentDropdown} onClick={(e) => e.stopPropagation()}>
                              <button
                                className={styles.dropdownItem}
                                onClick={(e) => handleReportPost(post, e)}
                              >
                                <FlagIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                                Report Post
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className={styles.postContent}>
                    {(post.isDeleted || deletedPosts.has(post.id)) ? (
                      <p className={styles.deletedPostText}>
                        This post is not available
                      </p>
                    ) : (
                      <>
                        <p className={`${styles.postText} ${shouldTruncate(post.content) && !expandedPosts.has(post.id) ? styles.postTextTruncated : ''}`}>
                          {post.content}
                        </p>
                        {shouldTruncate(post.content) && (
                          <button 
                            className={styles.readMoreBtn}
                            onClick={(e) => toggleExpanded(post.id, e)}
                          >
                            {expandedPosts.has(post.id) ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </>
                    )}
                    <div className={styles.postMetaRow}>
                      {!post.isDeleted && !deletedPosts.has(post.id) && post.location && (
                        <span className={styles.postLocation}>
                          <MarkerIcon className={styles.locationIcon} />
                          {post.location}
                        </span>
                      )}
                      {post.poll && (
                        <span className={styles.pollTag}>
                          <PollHIcon className={styles.pollTagIcon} />
                          Poll
                        </span>
                      )}
                    </div>
                    {!post.isDeleted && !deletedPosts.has(post.id) && (post.image || (post.images && post.images.length > 0)) && (
                      <div className={`${styles.postImageWrapper} ${post.images && post.images.length > 1 ? styles[`imageGrid${post.images.length}`] : ''}`}>
                        {post.images && post.images.length > 0 ? (
                          post.images.map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`Post content ${idx + 1}`} 
                              className={styles.postImage}
                              onClick={() => setImageViewer({ images: post.images || [], currentIndex: idx })}
                            />
                          ))
                        ) : post.image ? (
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className={styles.postImage}
                            onClick={() => setImageViewer({ images: [post.image!], currentIndex: 0 })}
                          />
                        ) : null}
                      </div>
                    )}
                    
                    {!post.isDeleted && !deletedPosts.has(post.id) && post.video && (
                      <div className={styles.videoWrapper}>
                        <video 
                          src={post.video} 
                          className={styles.videoPlayer}
                          controls
                          preload="metadata"
                        />
                      </div>
                    )}
                    
                    {!post.isDeleted && !deletedPosts.has(post.id) && post.documents && post.documents.length > 0 && (
                      <div className={styles.documentsWrapper}>
                        {post.documents.map((doc, idx) => (
                          <a 
                            key={idx} 
                            href={doc.url} 
                            download={doc.name}
                            className={styles.documentItem}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ClipFileIcon className={styles.documentItemIcon} />
                            <span className={styles.documentItemName}>{doc.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                    
                    {!post.isDeleted && !deletedPosts.has(post.id) && post.poll && (
                      <div className={styles.pollContainer}>
                        <h4 className={styles.pollQuestion}>{post.poll.question}</h4>
                        <div className={styles.pollOptions}>
                          {post.poll.options.map((option, index) => {
                            const userVotedOption = pollVotes[post.id] !== undefined ? pollVotes[post.id] : post.poll?.userVoted;
                            const hasVoted = userVotedOption !== undefined;
                            const isUserChoice = userVotedOption === index;
                            const isPollEnded = post.poll?.endsAt ? new Date(post.poll.endsAt) < new Date() : false;
                            const showResults = hasVoted || isPollEnded;
                            
                            // Calculate updated vote counts if user voted
                            let displayVotes = option.votes;
                            let displayPercentage = option.percentage;
                            
                            if (pollVotes[post.id] !== undefined && post.poll?.userVoted === undefined) {
                              // User just voted (not in original data)
                              const newTotal = post.poll!.totalVotes + 1;
                              if (isUserChoice) {
                                displayVotes = option.votes + 1;
                              }
                              displayPercentage = Math.round((displayVotes / newTotal) * 100);
                            }
                            
                            return (
                              <button
                                key={index}
                                className={`${styles.pollOption} ${isUserChoice ? styles.voted : ''} ${showResults ? styles.showResults : ''}`}
                                onClick={(e) => handlePollVote(post.id, index, e, isPollEnded)}
                                disabled={isPollEnded}
                              >
                                <div className={styles.pollOptionContent}>
                                  <span className={styles.pollOptionText}>
                                    {option.text}
                                    {isUserChoice && <CheckCircleIcon className={styles.pollCheckIcon} />}
                                  </span>
                                  {showResults && (
                                    <span className={styles.pollOptionPercentage}>{displayPercentage}%</span>
                                  )}
                                </div>
                                {showResults && (
                                  <div 
                                    className={styles.pollOptionBar} 
                                    style={{ width: `${displayPercentage}%` }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className={styles.pollFooter}>
                          {post.poll.endsAt && new Date(post.poll.endsAt) < new Date() ? (
                            <span>Poll ended • {post.poll.totalVotes} {post.poll.totalVotes === 1 ? 'vote' : 'votes'}</span>
                          ) : (
                            <>
                              <span>
                                {pollVotes[post.id] !== undefined && post.poll?.userVoted === undefined
                                  ? post.poll.totalVotes + 1
                                  : post.poll.totalVotes
                                } {(pollVotes[post.id] !== undefined && post.poll?.userVoted === undefined ? post.poll.totalVotes + 1 : post.poll.totalVotes) === 1 ? 'vote' : 'votes'}
                              </span>
                              {post.poll.endsAt && (
                                <span>• Ends {new Date(post.poll.endsAt).toLocaleDateString()}</span>
                              )}
                              {post.poll.duration === 'unlimited' && (
                                <span>• No time limit</span>
                              )}
                              {pollVotes[post.id] !== undefined && (
                                <button
                                  className={styles.removeVoteBtn}
                                  onClick={(e) => handleRemoveVote(post.id, e)}
                                >
                                  Remove vote
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className={styles.postFooter}>
                    <div className={styles.postActions}>
                      <button 
                        className={`${styles.actionBtn} ${likedPosts.has(post.id) ? styles.liked : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                      >
                        {likedPosts.has(post.id) ? (
                          <HeartIcon className={styles.actionIcon} />
                        ) : (
                          <HeartFilledIcon className={styles.actionIcon} />
                        )}
                        <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      {post.type !== 'ad' && (
                        <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); handlePostClick(post); }}>
                          <CommentIcon className={styles.actionIcon} />
                          <span>{(post.commentsData?.length || 0) + (dynamicComments[post.id]?.length || 0)}</span>
                        </button>
                      )}
                      <button 
                        className={`${styles.actionBtn} ${repostedPosts.has(post.id) ? styles.reposted : ''}`}
                        onClick={(e) => handleRepost(post.id, e)}
                      >
                        <RetweetIcon className={styles.actionIcon} />
                        <span>{post.reposts + (repostedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className={styles.actionBtn} onClick={(e) => e.stopPropagation()}>
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

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>
              <XIcon className={styles.closeIcon} />
            </button>
            
            {/* Post Content */}
            <div className={`${styles.modalPost} ${!selectedPost.image ? styles.noImage : ''}`}>
              <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                  {selectedPost.type === 'user' ? (
                    <div className={styles.userAvatar}>{selectedPost.author.avatar}</div>
                  ) : selectedPost.type === 'ad' && selectedPost.author.avatar ? (
                    <div className={styles.adAvatar}>
                      <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className={styles.adAvatarImage} />
                    </div>
                  ) : (
                    <div className={styles.officialAvatar}>
                      {getAuthorIcon(selectedPost.author.icon)}
                    </div>
                  )}
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>
                      {selectedPost.author.name}
                      {selectedPost.author.verified && (
                        <ShieldTrustIcon className={styles.verifiedBadge} />
                      )}
                    </div>
                    {selectedPost.author.role && (
                      <span className={styles.authorRole}>{selectedPost.author.role}</span>
                    )}
                    <span className={styles.postTime}>{selectedPost.time}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.postContent}>
                <p className={styles.postText}>
                  {selectedPost.content}
                  {selectedPost.poll && <span className={styles.pollTag}><PollHIcon className={styles.pollTagIcon} /> Poll</span>}
                </p>
                {selectedPost.location && (
                  <span className={styles.postLocation}>
                    <MarkerIcon className={styles.locationIcon} />
                    {selectedPost.location}
                  </span>
                )}
                {(selectedPost.image || (selectedPost.images && selectedPost.images.length > 0)) && (
                  <div className={`${styles.postImageWrapper} ${selectedPost.images && selectedPost.images.length > 1 ? styles[`imageGrid${selectedPost.images.length}`] : ''}`}>
                    {selectedPost.images && selectedPost.images.length > 0 ? (
                      selectedPost.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`Post content ${idx + 1}`} 
                          className={styles.postImage}
                          onClick={() => setImageViewer({ images: selectedPost.images || [], currentIndex: idx })}
                        />
                      ))
                    ) : selectedPost.image ? (
                      <img 
                        src={selectedPost.image} 
                        alt="Post content" 
                        className={styles.postImage}
                        onClick={() => setImageViewer({ images: [selectedPost.image!], currentIndex: 0 })}
                      />
                    ) : null}
                  </div>
                )}
                
                {selectedPost.video && (
                  <div className={styles.videoWrapper}>
                    <video 
                      src={selectedPost.video} 
                      className={styles.videoPlayer}
                      controls
                      preload="metadata"
                    />
                  </div>
                )}
                
                {selectedPost.documents && selectedPost.documents.length > 0 && (
                  <div className={styles.documentsWrapper}>
                    {selectedPost.documents.map((doc, idx) => (
                      <a 
                        key={idx} 
                        href={doc.url} 
                        download={doc.name}
                        className={styles.documentItem}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ClipFileIcon className={styles.documentItemIcon} />
                        <span className={styles.documentItemName}>{doc.name}</span>
                      </a>
                    ))}
                  </div>
                )}
                
                {selectedPost.poll && (
                  <div className={styles.pollContainer}>
                    <h4 className={styles.pollQuestion}>{selectedPost.poll.question}</h4>
                    <div className={styles.pollOptions}>
                      {selectedPost.poll.options.map((option, index) => {
                        const userVotedOption = pollVotes[selectedPost.id] !== undefined ? pollVotes[selectedPost.id] : selectedPost.poll?.userVoted;
                        const hasVoted = userVotedOption !== undefined;
                        const isUserChoice = userVotedOption === index;
                        const isPollEnded = selectedPost.poll?.endsAt ? new Date(selectedPost.poll.endsAt) < new Date() : false;
                        const showResults = hasVoted || isPollEnded;
                        
                        // Calculate updated vote counts if user voted
                        let displayVotes = option.votes;
                        let displayPercentage = option.percentage;
                        
                        if (pollVotes[selectedPost.id] !== undefined && selectedPost.poll?.userVoted === undefined) {
                          // User just voted (not in original data)
                          const newTotal = selectedPost.poll!.totalVotes + 1;
                          if (isUserChoice) {
                            displayVotes = option.votes + 1;
                          }
                          displayPercentage = Math.round((displayVotes / newTotal) * 100);
                        }
                        
                        return (
                          <button
                            key={index}
                            className={`${styles.pollOption} ${isUserChoice ? styles.voted : ''} ${showResults ? styles.showResults : ''}`}
                            onClick={(e) => handlePollVote(selectedPost.id, index, e, isPollEnded)}
                            disabled={isPollEnded}
                          >
                            <div className={styles.pollOptionContent}>
                              <span className={styles.pollOptionText}>
                                {option.text}
                                {isUserChoice && <CheckCircleIcon className={styles.pollCheckIcon} />}
                              </span>
                              {showResults && (
                                <span className={styles.pollOptionPercentage}>{displayPercentage}%</span>
                              )}
                            </div>
                            {showResults && (
                              <div 
                                className={styles.pollOptionBar} 
                                style={{ width: `${displayPercentage}%` }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className={styles.pollFooter}>
                      {selectedPost.poll.endsAt && new Date(selectedPost.poll.endsAt) < new Date() ? (
                        <span>Poll ended • {selectedPost.poll.totalVotes} {selectedPost.poll.totalVotes === 1 ? 'vote' : 'votes'}</span>
                      ) : (
                        <>
                          <span>
                            {pollVotes[selectedPost.id] !== undefined && selectedPost.poll?.userVoted === undefined
                              ? selectedPost.poll.totalVotes + 1
                              : selectedPost.poll.totalVotes
                            } {(pollVotes[selectedPost.id] !== undefined && selectedPost.poll?.userVoted === undefined ? selectedPost.poll.totalVotes + 1 : selectedPost.poll.totalVotes) === 1 ? 'vote' : 'votes'}
                          </span>
                          {selectedPost.poll.endsAt && (
                            <span>• Ends {new Date(selectedPost.poll.endsAt).toLocaleDateString()}</span>
                          )}
                          {selectedPost.poll.duration === 'unlimited' && (
                            <span>• No time limit</span>
                          )}
                          {pollVotes[selectedPost.id] !== undefined && (
                            <button
                              className={styles.removeVoteBtn}
                              onClick={(e) => handleRemoveVote(selectedPost.id, e)}
                            >
                              Remove vote
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Post Actions in Modal */}
              <div className={styles.postFooter}>
                <div className={styles.postActions}>
                  <button 
                    className={`${styles.actionBtn} ${likedPosts.has(selectedPost.id) ? styles.liked : ''}`}
                    onClick={() => handleLike(selectedPost.id)}
                  >
                    {likedPosts.has(selectedPost.id) ? (
                      <HeartIcon className={styles.actionIcon} />
                    ) : (
                      <HeartFilledIcon className={styles.actionIcon} />
                    )}
                    <span>{selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)}</span>
                  </button>
                  {selectedPost.type !== 'ad' && (
                    <button className={styles.actionBtn}>
                      <CommentIcon className={styles.actionIcon} />
                      <span>{(selectedPost.commentsData?.length || 0) + (dynamicComments[selectedPost.id]?.length || 0)}</span>
                    </button>
                  )}
                  <button 
                    className={`${styles.actionBtn} ${repostedPosts.has(selectedPost.id) ? styles.reposted : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleRepost(selectedPost.id, e); }}
                  >
                    <RetweetIcon className={styles.actionIcon} />
                    <span>{selectedPost.reposts + (repostedPosts.has(selectedPost.id) ? 1 : 0)}</span>
                  </button>
                  <button className={styles.actionBtn}>
                    <ShareIcon className={styles.actionIcon} />
                    <span>{selectedPost.shares}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Comments and Tips */}
            <div className={styles.modalRightColumn}>
              {/* Comments Section */}
              {selectedPost.type !== 'ad' && (
                <div className={styles.commentsSection}>
                <h3 className={styles.sectionTitle}>Comments ({(selectedPost.commentsData?.length || 0) + (dynamicComments[selectedPost.id]?.length || 0)})</h3>
                
                <div className={styles.commentsList}>
                  {(() => {
                    const allComments = [
                      ...(selectedPost.commentsData || []),
                      ...(dynamicComments[selectedPost.id] || [])
                    ];
                    
                    return allComments.length > 0 ? (
                    allComments.map((comment) => (
                      <div key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentAvatar}>
                          {comment.anonymous ? '?' : (comment.avatar || comment.author.charAt(0))}
                        </div>
                        <div className={styles.commentContent}>
                          <div className={styles.commentAuthor}>
                            {deletedComments.has(comment.id) ? (
                              <span style={{color: '#888', fontStyle: 'italic'}}>Deleted User</span>
                            ) : (
                              <>
                                {comment.anonymous ? 'Anonymous' : comment.author}
                                {!comment.anonymous && comment.username && (
                                  <span style={{color: '#888', fontWeight: 400}}> @{comment.username}</span>
                                )}
                              </>
                            )}
                            <span className={styles.commentTime}>{comment.time}</span>
                            {!deletedComments.has(comment.id) && comment.author === currentUser.name && (
                              <div className={styles.commentMenuWrapper}>
                                <button
                                  className={styles.commentMenuBtn}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuCommentId(openMenuCommentId === comment.id ? null : comment.id);
                                  }}
                                  title="Options"
                                >
                                  <MenuDotsIcon className={styles.menuDotsIcon} />
                                </button>
                                {openMenuCommentId === comment.id && (
                                  <div className={styles.commentDropdown}>
                                    <button
                                      className={styles.dropdownItem}
                                      onClick={(e) => handleDeleteComment(comment, e)}
                                    >
                                      <TrashIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', fill: 'currentColor' }} />
                                      Delete Comment
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {!deletedComments.has(comment.id) && comment.author !== currentUser.name && (
                              <div className={styles.commentMenuWrapper}>
                                <button
                                  className={styles.commentMenuBtn}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuCommentId(openMenuCommentId === comment.id ? null : comment.id);
                                  }}
                                  title="Options"
                                >
                                  <MenuDotsIcon className={styles.menuDotsIcon} />
                                </button>
                                {openMenuCommentId === comment.id && (
                                  <div className={styles.commentDropdown}>
                                    <button
                                      className={styles.dropdownItem}
                                      onClick={(e) => handleReportComment(comment, e)}
                                    >
                                      <FlagIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', fill: 'currentColor' }} />
                                      Report Comment
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <p className={styles.commentText}>
                            {deletedComments.has(comment.id) ? (
                              <span style={{color: '#888', fontStyle: 'italic'}}>This comment is not available</span>
                            ) : (
                              comment.content
                            )}
                          </p>
                          
                          {/* Comment Actions */}
                          {!deletedComments.has(comment.id) && (
                          <div className={styles.commentActions}>
                            <button 
                              className={`${styles.commentActionBtn} ${likedComments.has(comment.id) ? styles.liked : ''}`}
                              onClick={(e) => handleLikeComment(comment.id, e)}
                            >
                              {likedComments.has(comment.id) ? (
                                <HeartIcon className={styles.commentActionIcon} />
                              ) : (
                                <HeartFilledIcon className={styles.commentActionIcon} />
                              )}
                              <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                            </button>
                            <button 
                              className={`${styles.commentActionBtn} ${repostedComments.has(comment.id) ? styles.reposted : ''}`}
                              onClick={(e) => handleRepostComment(comment.id, e)}
                            >
                              <RetweetIcon className={styles.commentActionIcon} />
                              <span>{repostedComments.has(comment.id) ? 1 : 0}</span>
                            </button>
                            <button 
                              className={styles.commentActionBtn}
                              onClick={(e) => handleShareComment(comment.id, e)}
                            >
                              <ShareIcon className={styles.commentActionIcon} />
                            </button>
                            <button 
                              className={styles.commentActionBtn}
                              onClick={(e) => handleReplyComment(comment, e)}
                            >
                              <CommentIcon className={styles.commentActionIcon} />
                              <span>Reply</span>
                            </button>
                          </div>
                          )}

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className={styles.repliesList}>
                              {comment.replies.map((reply: any) => (
                                <div key={reply.id} className={styles.replyItem}>
                                  <div className={styles.commentAvatar}>
                                    {reply.anonymous ? '?' : (reply.avatar || reply.author.charAt(0))}
                                  </div>
                                  <div className={styles.replyContent}>
                                    <div className={styles.commentAuthor}>
                                      {reply.anonymous ? 'Anonymous' : reply.author}
                                      {!reply.anonymous && reply.username && (
                                        <span style={{color: '#888', fontWeight: 400}}> @{reply.username}</span>
                                      )}
                                      <span className={styles.commentTime}>{reply.time}</span>
                                      {reply.author === currentUser.name && (
                                        <div className={styles.commentMenuWrapper}>
                                          <button
                                            className={styles.commentMenuBtn}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenMenuReplyId(openMenuReplyId === reply.id ? null : reply.id);
                                            }}
                                            title="Options"
                                          >
                                            <MenuDotsIcon className={styles.menuDotsIcon} />
                                          </button>
                                          {openMenuReplyId === reply.id && (
                                            <div className={styles.commentDropdown}>
                                              <button
                                                className={styles.dropdownItem}
                                                onClick={(e) => handleDeleteReply(reply, comment, e)}
                                              >
                                                <TrashIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', fill: 'currentColor' }} />
                                                Delete Reply
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      {reply.author !== currentUser.name && (
                                        <div className={styles.commentMenuWrapper}>
                                          <button
                                            className={styles.commentMenuBtn}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenMenuReplyId(openMenuReplyId === reply.id ? null : reply.id);
                                            }}
                                            title="Options"
                                          >
                                            <MenuDotsIcon className={styles.menuDotsIcon} />
                                          </button>
                                          {openMenuReplyId === reply.id && (
                                            <div className={styles.commentDropdown}>
                                              <button
                                                className={styles.dropdownItem}
                                                onClick={(e) => handleReportReply(reply, e)}
                                              >
                                                <FlagIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', fill: 'currentColor' }} />
                                                Report Reply
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <p className={styles.commentText}>{renderTextWithMentions(reply.content)}</p>
                                    
                                    {/* Reply Actions */}
                                    <div className={styles.commentActions}>
                                      <button 
                                        className={`${styles.commentActionBtn} ${likedReplies.has(reply.id) ? styles.liked : ''}`}
                                        onClick={(e) => handleLikeReply(reply.id, e)}
                                      >
                                        {likedReplies.has(reply.id) ? (
                                          <HeartIcon className={styles.commentActionIcon} />
                                        ) : (
                                          <HeartFilledIcon className={styles.commentActionIcon} />
                                        )}
                                        <span>{(reply.likes || 0) + (likedReplies.has(reply.id) ? 1 : 0)}</span>
                                      </button>
                                      <button 
                                        className={`${styles.commentActionBtn} ${repostedReplies.has(reply.id) ? styles.reposted : ''}`}
                                        onClick={(e) => handleRepostReply(reply.id, e)}
                                      >
                                        <RetweetIcon className={styles.commentActionIcon} />
                                        <span>{repostedReplies.has(reply.id) ? 1 : 0}</span>
                                      </button>
                                      <button 
                                        className={styles.commentActionBtn}
                                        onClick={(e) => handleShareReply(reply.id, e)}
                                      >
                                        <ShareIcon className={styles.commentActionIcon} />
                                      </button>
                                      <button 
                                        className={styles.commentActionBtn}
                                        onClick={(e) => handleReplyToReply(reply, comment, e)}
                                      >
                                        <CommentIcon className={styles.commentActionIcon} />
                                        <span>Reply</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Input */}
                          {replyingTo && replyingTo.commentId === comment.id && (
                            <div className={styles.replyInput}>
                              <input
                                type="text"
                                placeholder={`Reply to @${replyingTo.username}...`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className={styles.replyTextInput}
                              />
                              <div className={styles.replyInputActions}>
                                <button className={styles.submitReplyBtn} onClick={handleSubmitReply}>
                                  Reply
                                </button>
                                <button className={styles.cancelReplyBtn} onClick={() => setReplyingTo(null)}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
                  );
                  })()}
                </div>

                {/* Add Comment */}
                <div className={styles.addComment}>
                  <textarea
                    className={styles.commentInput}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className={styles.commentActions}>
                    <label className={styles.anonymousCheckbox}>
                      <input
                        type="checkbox"
                        checked={commentAnonymous}
                        onChange={(e) => setCommentAnonymous(e.target.checked)}
                      />
                      <span>Comment anonymously</span>
                    </label>
                    <button className={styles.submitBtn} onClick={handleSubmitComment}>
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tips Section */}
            {selectedPost.tipEnabled && (
              <div className={styles.tipsSection}>
                <h3 className={styles.sectionTitle}>Submit a Tip</h3>
                <p className={styles.tipDescription}>
                  Have information about this? Share it privately with {selectedPost.author.name}
                </p>
                
                <div className={styles.addTip}>
                  <textarea
                    className={styles.tipInput}
                    placeholder="Enter your tip or information..."
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    rows={4}
                  />
                  <div className={styles.tipActions}>
                    <label className={styles.anonymousCheckbox}>
                      <input
                        type="checkbox"
                        checked={tipAnonymous}
                        onChange={(e) => setTipAnonymous(e.target.checked)}
                      />
                      <span>Submit anonymously</span>
                    </label>
                    <button className={styles.submitBtn} onClick={handleSubmitTip}>
                      Submit Tip
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
      {/* Tip Success Modal */}
      {showTipModal && (
        <div className={styles.modalOverlay} onClick={() => setShowTipModal(false)}>
          <div className={styles.tipModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipModalIconWrapper}>
              <CheckCircleIcon className={styles.tipModalIcon} />
            </div>
            <h2 className={styles.tipModalTitle}>Tip Submitted</h2>
            <p className={styles.tipModalMessage}>Your tip has been submitted successfully!</p>
            <button 
              className={styles.tipModalBtn}
              onClick={() => setShowTipModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.tipModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipModalIconWrapper}>
              <XIcon className={styles.tipModalIcon} style={{color: '#dc2626'}} />
            </div>
            <h2 className={styles.tipModalTitle}>
              {postToDelete ? 'Delete Post' : replyToDelete ? 'Delete Reply' : 'Delete Comment'}
            </h2>
            <p className={styles.tipModalMessage}>
              Are you sure you want to delete this {postToDelete ? 'post' : replyToDelete ? 'reply' : 'comment'}?
            </p>
            <div className={styles.deleteModalActions}>
              <button 
                className={styles.deleteCancelBtn}
                onClick={() => {
                  setShowDeleteModal(false);
                  setCommentToDelete(null);
                  setReplyToDelete(null);
                  setPostToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                className={styles.deleteConfirmBtn}
                onClick={postToDelete ? confirmDeletePost : replyToDelete ? confirmDeleteReply : confirmDeleteComment}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Success Modal */}
      {showDeleteSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteSuccessModal(false)}>
          <div className={styles.tipModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipModalIconWrapper}>
              <CheckCircleIcon className={styles.tipModalIcon} style={{color: '#059669'}} />
            </div>
            <h2 className={styles.tipModalTitle}>Message Deleted Successfully</h2>
            <button 
              className={styles.tipModalBtn}
              onClick={() => setShowDeleteSuccessModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {imageViewer && (
        <div className={styles.imageViewerOverlay} onClick={() => setImageViewer(null)}>
          <div className={styles.imageViewerContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.imageViewerClose}
              onClick={() => setImageViewer(null)}
            >
              <XIcon className={styles.closeIcon} />
            </button>
            
            <img 
              src={imageViewer.images[imageViewer.currentIndex]} 
              alt={`Image ${imageViewer.currentIndex + 1}`}
              className={styles.imageViewerImage}
            />
            
            {imageViewer.images.length > 1 && (
              <>
                <button
                  className={`${styles.imageViewerNav} ${styles.imageViewerPrev}`}
                  onClick={() => setImageViewer(prev => prev ? {
                    ...prev,
                    currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
                  } : null)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
                
                <button
                  className={`${styles.imageViewerNav} ${styles.imageViewerNext}`}
                  onClick={() => setImageViewer(prev => prev ? {
                    ...prev,
                    currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
                  } : null)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                  </svg>
                </button>
                
                <div className={styles.imageCounter}>
                  {imageViewer.currentIndex + 1} / {imageViewer.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && reportItem && (
        <div className={styles.modalOverlay} onClick={() => setShowReportModal(false)}>
          <div className={styles.tipModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipModalIconWrapper}>
              <FlagIcon className={styles.tipModalIcon} style={{color: '#dc2626'}} />
            </div>
            <h2 className={styles.tipModalTitle}>Report {reportItem.type}</h2>
            <p className={styles.tipModalMessage}>
              Please select a reason for reporting this {reportItem.type}
            </p>
            <select
              className={styles.reportDropdown}
              value={selectedReportOffense}
              onChange={(e) => {
                setSelectedReportOffense(e.target.value);
                if (e.target.value !== 'other') {
                  setReportReason('');
                }
              }}
            >
              <option value="">Select an offense...</option>
              <option value="spam">Spam or misleading content</option>
              <option value="harassment">Harassment or bullying</option>
              <option value="hate-speech">Hate speech or discrimination</option>
              <option value="violence">Violence or threats</option>
              <option value="misinformation">False or misleading information</option>
              <option value="inappropriate">Inappropriate or offensive content</option>
              <option value="privacy">Privacy violation</option>
              <option value="impersonation">Impersonation</option>
              <option value="other">Other (please specify)</option>
            </select>
            {selectedReportOffense === 'other' && (
              <textarea
                className={styles.reportTextarea}
                placeholder="Please provide a detailed description..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={4}
              />
            )}
            <div className={styles.deleteModalActions}>
              <button 
                className={styles.deleteCancelBtn}
                onClick={() => {
                  setShowReportModal(false);
                  setReportItem(null);
                  setReportReason('');
                  setSelectedReportOffense('');
                }}
              >
                Cancel
              </button>
              <button 
                className={styles.deleteConfirmBtn}
                onClick={handleSubmitReport}
                disabled={!selectedReportOffense || (selectedReportOffense === 'other' && !reportReason.trim())}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Success Modal */}
      {showReportSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowReportSuccessModal(false)}>
          <div className={styles.tipModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipModalIconWrapper}>
              <CheckCircleIcon className={styles.tipModalIcon} style={{color: '#059669'}} />
            </div>
            <h2 className={styles.tipModalTitle}>Report Submitted</h2>
            <p className={styles.tipModalMessage}>
              Thank you for your report. We'll review it and take appropriate action if necessary.
            </p>
            <button 
              className={styles.tipModalBtn}
              onClick={() => setShowReportSuccessModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
