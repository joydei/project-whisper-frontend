import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../context/PostsContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/user/UserProfile.module.css';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';

// Import SVG icons
import UserIcon from '../../assets/icons/users.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import MessageIcon from '../../assets/icons/messages.svg?react';
import UserPlusIcon from '../../assets/icons/user-add.svg?react';
import UserCheckIcon from '../../assets/icons/user-check.svg?react';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { userPosts } = usePosts();
  const headerOpacity = useHeaderFade();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount] = useState(() => Math.floor(Math.random() * 200) + 50);

  // Combine all posts to find user data
  const allPosts = [...userPosts, ...municipalityPosts, ...ghanaPosts];
  
  // Find the user from posts (excluding anonymous posts)
  const userPost = allPosts.find(
    post => post.type === 'user' && 
    !post.anonymous && 
    post.author.username === username
  );

  // If no user found, show not found state
  const userData = userPost ? {
    name: userPost.author.name,
    username: userPost.author.username || username,
    avatar: userPost.author.avatar,
    bio: 'Community member sharing insights and engaging with local issues.',
    location: userPost.location || 'Accra, Ghana',
    memberSince: 'January 2024',
    verified: userPost.author.verified || false,
  } : null;

  // Filter posts by this user (non-anonymous only)
  const userPostsList = allPosts.filter(
    post => post.type === 'user' && 
    !post.anonymous && 
    !post.isDeleted &&
    post.author.username === username
  );

  // Calculate stats
  const totalPosts = userPostsList.length;
  const totalLikes = userPostsList.reduce((sum, post) => sum + post.likes, 0);

  // Set random follower count on mount
  useEffect(() => {
    setFollowerCount(Math.floor(Math.random() * 500) + 50);
  }, [username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const handleMessage = () => {
    navigate(`/messages/${username}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Check if viewing own profile
  const isOwnProfile = currentUser.username === username;

  // Redirect to own profile page if viewing own username
  useEffect(() => {
    if (isOwnProfile && userData) {
      navigate('/profile');
    }
  }, [isOwnProfile, userData, navigate]);

  if (!userData) {
    return (
      <div className={styles.userProfilePage}>
        <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
          <div className={styles.container}>
            <Fade duration={600} triggerOnce>
              <div className={styles.headerContent}>
                <button onClick={handleBack} className={styles.backButton}>
                  ← Back
                </button>
                <h1 className={styles.pageTitle}>User Not Found</h1>
              </div>
            </Fade>
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <UserIcon className={styles.notFoundIcon} />
              <h2>This user could not be found</h2>
              <p>The user @{username} doesn't exist or hasn't made any posts yet.</p>
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
    <div className={styles.userProfilePage}>
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.container}>
          <Fade duration={600} triggerOnce>
            <div className={styles.headerContent}>
              <button onClick={handleBack} className={styles.backButton}>
                ← Back
              </button>
            </div>
          </Fade>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            {/* Profile Header */}
            <Fade duration={800} triggerOnce>
              <div className={styles.profileHeader}>
                <div className={styles.coverImage}></div>
                <div className={styles.profileInfo}>
                  <div className={styles.avatarWrapper}>
                    {userData.avatar ? (
                      <div className={styles.avatar}>{userData.avatar}</div>
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <span className={styles.avatarInitials}>
                          {getInitials(userData.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.userInfo}>
                    <div className={styles.nameSection}>
                      <h1 className={styles.userName}>{userData.name}</h1>
                      <p className={styles.userUsername}>@{userData.username}</p>
                    </div>
                    
                    {!isOwnProfile && (
                      <div className={styles.actionButtons}>
                        <button 
                          className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                          onClick={handleFollow}
                        >
                          {isFollowing ? (
                            <>
                              <UserCheckIcon className={styles.btnIcon} />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className={styles.btnIcon} />
                              Follow
                            </>
                          )}
                        </button>
                        <button className={styles.messageBtn} onClick={handleMessage}>
                          <MessageIcon className={styles.btnIcon} />
                          Message
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio and Details */}
                <div className={styles.profileDetails}>
                  {userData.bio && (
                    <p className={styles.bio}>{userData.bio}</p>
                  )}
                  
                  <div className={styles.detailsRow}>
                    {userData.location && (
                      <span className={styles.detail}>
                        <MarkerIcon className={styles.detailIcon} />
                        {userData.location}
                      </span>
                    )}
                    <span className={styles.detail}>
                      <CalendarIcon className={styles.detailIcon} />
                      Joined {userData.memberSince}
                    </span>
                  </div>

                  <div className={styles.statsRow}>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{totalPosts}</span>
                      <span className={styles.statLabel}>Posts</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{followerCount}</span>
                      <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{followingCount}</span>
                      <span className={styles.statLabel}>Following</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{totalLikes}</span>
                      <span className={styles.statLabel}>Likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>

            {/* Posts Section */}
            <div className={styles.postsSection}>
              <Fade delay={100} duration={800} triggerOnce>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Posts</h2>
                  <span className={styles.postCount}>{totalPosts} {totalPosts === 1 ? 'post' : 'posts'}</span>
                </div>
              </Fade>

              {userPostsList.length > 0 ? (
                <PostFeed posts={userPostsList} />
              ) : (
                <Fade delay={200} duration={800} triggerOnce>
                  <div className={styles.emptyState}>
                    <UserIcon className={styles.emptyIcon} />
                    <p className={styles.emptyText}>No posts yet</p>
                    <p className={styles.emptySubtext}>
                      {isOwnProfile 
                        ? "You haven't shared anything yet. Start posting to engage with your community!"
                        : `${userData.name.split(' ')[0]} hasn't shared anything yet.`
                      }
                    </p>
                  </div>
                </Fade>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
