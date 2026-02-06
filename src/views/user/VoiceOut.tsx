import { useState, useRef, type FormEvent } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { usePosts } from '../../context/PostsContext';
import { useUser } from '../../context/UserContext';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/VoiceOut.module.css';

// Import SVG icons
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import ClipFileIcon from '../../assets/icons/clip-file.svg?react';
import DescriptionIcon from '../../assets/icons/description-alt.svg?react';
import BooksIcon from '../../assets/icons/books.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import LightbulbIcon from '../../assets/icons/lightbulb-on.svg?react';
import PriorityIcon from '../../assets/icons/priority-arrows.svg?react';
import PendingIcon from '../../assets/icons/pending.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';
import CallIcon from '../../assets/icons/phone-call.svg?react';
import ScrollDocumentIcon from '../../assets/icons/scroll-document-story.svg?react';
import XIcon from '../../assets/icons/cross-circle.svg?react';
import GhanaDarkIcon from '../../assets/icons/ghana-dark.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import PollHIcon from '../../assets/icons/poll-h.svg?react';
import WinkIcon from '../../assets/icons/laugh-wink.svg?react';
import LeaderSpeechIcon from '../../assets/icons/leader-speech.svg?react';
import ScreenPlayIcon from '../../assets/icons/screen-play.svg?react';

interface FormData {
  category: string;
  location: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  anonymous: boolean;
  attachments: File[];
}

const VoiceOut = () => {
  const { addPost, addReport } = usePosts();
  const { currentUser } = useUser();
  const headerOpacity = useHeaderFade();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [reportType, setReportType] = useState<'municipality' | 'civil'>('municipality');
  const [formData, setFormData] = useState<FormData>({
    category: '',
    location: '',
    subject: '',
    description: '',
    priority: 'medium',
    anonymous: false,
    attachments: []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(() => {
    return localStorage.getItem('hideHowItWorks') !== 'true';
  });
  const [showTips, setShowTips] = useState(() => {
    return localStorage.getItem('hideTips') !== 'true';
  });
  const [animatedStats, setAnimatedStats] = useState({ total: 0, resolved: 0, inProgress: 0 });
  
  // Post creation states
  const [showPostModal, setShowPostModal] = useState(false);
  const [postScope, setPostScope] = useState<'municipality' | 'ghana' | ''>('municipality');
  const [postContent, setPostContent] = useState('');
  const [locationVisibility, setLocationVisibility] = useState<'show' | 'hide'>('show');
  const [postImages, setPostImages] = useState<File[]>([]);
  const [postVideo, setPostVideo] = useState<File | null>(null);
  const [postDocuments, setPostDocuments] = useState<File[]>([]);
  const [publicityType, setPublicityType] = useState<'public' | 'anonymous'>('public');
  const [showPostSuccessModal, setShowPostSuccessModal] = useState(false);
  const [postErrors, setPostErrors] = useState<{[key: string]: string}>({});
  const [replyRestriction, setReplyRestriction] = useState<'everyone' | 'followers' | 'municipality'>('everyone');
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollDuration, setPollDuration] = useState<'1day' | '3days' | '1week' | 'unlimited'>('1day');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showPublicityDropdown, setShowPublicityDropdown] = useState(false);

  // Common emojis for quick access - using system emojis
  const commonEmojis = [
    '😊', '😂', '❤️', '👍', '🙏', '😍', '🎉', '🔥',
    '😢', '😅', '🤔', '👏', '💪', '🙌', '✨', '💯',
    '😎', '🥰', '😇', '🤗', '🙂', '😉', '😃', '😄',
    '🤩', '😁', '💙', '💚', '💛', '🧡', '💜', '🖤'
  ];

  // Counting animation for stats
  useState(() => {
    const targetStats = { total: 12, resolved: 8, inProgress: 4 };
    const duration = 1000; // 1 second
    const steps = 30;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        total: Math.round(targetStats.total * progress),
        resolved: Math.round(targetStats.resolved * progress),
        inProgress: Math.round(targetStats.inProgress * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  });

  const handleDismissTips = () => {
    setShowTips(false);
    localStorage.setItem('hideTips', 'true');
  };

  const handleDismissHowItWorks = () => {
    setShowHowItWorks(false);
    localStorage.setItem('hideHowItWorks', 'true');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, attachments: `${file.name} exceeds 5MB limit` }));
        return false;
      }
      return true;
    });
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportData = {
        reportType,
        ...formData,
        author: formData.anonymous ? null : {
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
          verified: currentUser.verified
        }
      };
      
      console.log('Submitting report:', reportData);
      
      // Add report to context so it appears in Profile
      addReport(reportData);
      
      setShowSuccessModal(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          category: '',
          location: '',
          subject: '',
          description: '',
          priority: 'medium',
          anonymous: false,
          attachments: []
        });
      }, 500);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors({ category: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      setFormData({
        category: '',
        location: '',
        subject: '',
        description: '',
        priority: 'medium',
        anonymous: false,
        attachments: []
      });
      setErrors({});
    }
  };

  const handleReportTypeChange = (type: 'municipality' | 'civil') => {
    setReportType(type);
    setFormData(prev => ({ ...prev, category: '', priority: 'medium' }));
    setErrors({});
  };

  const handleCreatePost = () => {
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    if (postContent.trim()) {
      if (window.confirm('Are you sure you want to cancel? Your post content will be lost.')) {
        resetPostForm();
      }
    } else {
      resetPostForm();
    }
  };

  const resetPostForm = () => {
    setShowPostModal(false);
    setPostScope('municipality');
    setPostContent('');
    setLocationVisibility('show');
    setPostImages([]);
    setPostVideo(null);
    setPostDocuments([]);
    setPublicityType('public');
    setPostErrors({});
    setReplyRestriction('everyone');
    setShowPoll(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollDuration('1day');
    setShowEmojiPicker(false);
    setShowLocationDropdown(false);
    setShowPublicityDropdown(false);
  };

  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setPostErrors(prev => ({ ...prev, images: `${file.name} exceeds 5MB limit` }));
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setPostErrors(prev => ({ ...prev, images: `${file.name} is not an image file` }));
        return false;
      }
      return true;
    });
    
    setPostImages(prev => [...prev, ...validFiles].slice(0, 4)); // Max 4 images
    setPostErrors(prev => ({ ...prev, images: '' }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('video/')) {
      setPostErrors(prev => ({ ...prev, video: 'Please select a valid video file' }));
      return;
    }

    // Check file size (max 500MB)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setPostErrors(prev => ({ ...prev, video: 'Video file size cannot exceed 500MB' }));
      return;
    }

    // Check video duration
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      const maxDuration = 30 * 60; // 30 minutes in seconds

      if (duration > maxDuration) {
        setPostErrors(prev => ({ ...prev, video: 'Video duration cannot exceed 30 minutes' }));
        return;
      }

      setPostVideo(file);
      setPostImages([]); // Clear images when video is added
      setPostErrors(prev => ({ ...prev, video: '' }));
    };

    video.onerror = function() {
      setPostErrors(prev => ({ ...prev, video: 'Error loading video file' }));
    };

    video.src = URL.createObjectURL(file);
  };

  const removePostVideo = () => {
    setPostVideo(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB per document
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setPostErrors(prev => ({ ...prev, documents: `${file.name} exceeds 10MB limit` }));
        return false;
      }
      return true;
    });
    
    setPostDocuments(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 documents
    setPostErrors(prev => ({ ...prev, documents: '' }));
  };

  const removePostDocument = (index: number) => {
    setPostDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const removePostImage = (index: number) => {
    setPostImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEmojiClick = (emoji: string) => {
    setPostContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const getCharCountClass = () => {
    const length = postContent.length;
    if (length > 1000) return styles.error;
    if (length > 900) return styles.warning;
    return '';
  };

  const handleSubmitPost = async () => {
    if (!postScope) {
      setPostErrors({ scope: 'Please select where to share your post' });
      return;
    }

    if (!postContent.trim() && !showPoll && postImages.length === 0 && !postVideo && postDocuments.length === 0) {
      setPostErrors({ content: 'Please write something, add media, or create a poll' });
      return;
    }

    if (showPoll) {
      if (!pollQuestion.trim()) {
        setPostErrors({ poll: 'Please enter a poll question' });
        return;
      }
      const filledOptions = pollOptions.filter(opt => opt.trim());
      if (filledOptions.length < 2) {
        setPostErrors({ poll: 'Please provide at least 2 poll options' });
        return;
      }
    }

    if (postContent.length > 1000) {
      setPostErrors({ content: 'Post cannot exceed 1000 characters' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create the post object
      const newPost: any = {
        type: 'user' as const,
        author: {
          name: publicityType === 'anonymous' ? 'Anonymous' : currentUser.name,
          username: publicityType === 'anonymous' ? undefined : currentUser.username,
          avatar: publicityType === 'anonymous' ? undefined : currentUser.avatar,
          verified: currentUser.verified
        },
        content: postContent,
        location: locationVisibility === 'hide' ? undefined : 'Your Location',
        images: postImages.length > 0 ? postImages.map(img => URL.createObjectURL(img)) : undefined,
        video: postVideo ? URL.createObjectURL(postVideo) : undefined,
        documents: postDocuments.length > 0 ? postDocuments.map(doc => ({ name: doc.name, url: URL.createObjectURL(doc) })) : undefined,
        replyRestriction,
        scope: postScope,
        anonymous: publicityType === 'anonymous',
        hideLocation: locationVisibility === 'hide'
      };

      if (showPoll) {
        newPost.poll = {
          question: pollQuestion,
          options: pollOptions.filter(opt => opt.trim()).map(opt => ({
            text: opt,
            votes: 0,
            percentage: 0
          })),
          totalVotes: 0,
          duration: pollDuration,
          endsAt: pollDuration === 'unlimited' ? undefined : new Date(
            Date.now() + 
            (pollDuration === '1day' ? 86400000 : 
             pollDuration === '3days' ? 259200000 : 
             pollDuration === '1week' ? 604800000 : 0)
          ).toISOString()
        };
      }

      // Add post to context
      addPost(newPost);
      
      console.log('Submitting post:', {
        scope: postScope,
        content: postContent,
        hideLocation: locationVisibility === 'hide',
        images: postImages,
        anonymous: publicityType === 'anonymous',
        replyRestriction,
        poll: showPoll ? { question: pollQuestion, options: pollOptions, duration: pollDuration } : null
      });
      
      resetPostForm();
      setShowPostSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting post:', error);
      setPostErrors({ submit: 'Failed to submit post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.voiceOutPage}>
      <section className={styles.header} style={{ opacity: headerOpacity, transition: 'opacity 0.3s ease' }}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Voice Out</h1>
          <p className={styles.pageSubtitle}>Share your concerns and make your voice heard</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <Fade delay={200} duration={1200} triggerOnce>
            <div className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <PendingIcon className={styles.statsIcon} />
                <h3 className={styles.statsTitle}>Your Activity</h3>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{animatedStats.total}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{animatedStats.resolved}</span>
                  <span className={styles.statLabel}>Resolved</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{animatedStats.inProgress}</span>
                  <span className={styles.statLabel}>In Progress</span>
                </div>
              </div>
            </div>
            </Fade>

            <Fade delay={300} duration={1000} triggerOnce>
            <div className={styles.createPostSection}>
              <button className={styles.createPostBtn} onClick={handleCreatePost}>
                <ScrollDocumentIcon className={styles.createPostIcon} />
                <div className={styles.createPostText}>
                  <h3>Create a Post</h3>
                  <p>Share updates, stories, or information with your community</p>
                </div>
              </button>
            </div>
            </Fade>

            <Slide direction="left" duration={1000} triggerOnce>
            <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit Your Report</h2>
            
            {/* Report Type Selection */}
            <div className={styles.reportTypeSelection}>
              <button 
                type="button"
                className={`${styles.typeBtn} ${reportType === 'municipality' ? styles.active : ''}`}
                onClick={() => handleReportTypeChange('municipality')}
              >
                <GovernmentIcon className={styles.typeBtnIcon} />
                <div>
                  <h4>Municipality</h4>
                  <p>Infrastructure, sanitation, utilities</p>
                </div>
              </button>
              <button 
                type="button"
                className={`${styles.typeBtn} ${reportType === 'civil' ? styles.active : ''}`}
                onClick={() => handleReportTypeChange('civil')}
              >
                <SirenIcon className={styles.typeBtnIcon} />
                <div>
                  <h4>Civil Services</h4>
                  <p>Police, fire service, ambulance</p>
                </div>
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {reportType === 'municipality' ? (
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    <GovernmentIcon className={styles.labelIcon} />
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="category" 
                    name="category"
                    className={`${styles.select} ${errors.category ? styles.error : ''}`}
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="infrastructure">Infrastructure (Roads, Buildings)</option>
                    <option value="sanitation">Sanitation & Cleanliness</option>
                    <option value="safety">Public Safety</option>
                    <option value="utilities">Utilities (Water, Electricity)</option>
                    <option value="environment">Environment & Parks</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    <SirenIcon className={styles.labelIcon} />
                    Service Type <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="category" 
                    name="category"
                    className={`${styles.select} ${errors.category ? styles.error : ''}`}
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="police">Police Assistance</option>
                    <option value="fire">Fire Service</option>
                    <option value="ambulance">Ambulance/Medical Emergency</option>
                    <option value="disaster">Disaster Management</option>
                    <option value="rescue">Rescue Operations</option>
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>
                  <MarkerIcon className={styles.labelIcon} />
                  Location <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`${styles.input} ${errors.location ? styles.error : ''}`}
                  placeholder="Enter location or address"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {errors.location && <span className={styles.errorText}>{errors.location}</span>}
                <p className={styles.hint}>Be as specific as possible (street name, landmark, area)</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  <BooksIcon className={styles.labelIcon} />
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={handleInputChange}
                  maxLength={100}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                <p className={styles.hint}>{formData.subject.length}/100 characters</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  <DescriptionIcon className={styles.labelIcon} />
                  Description <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                  rows={6}
                  placeholder="Provide detailed information about your concern... (minimum 20 characters)"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={1000}
                ></textarea>
                {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                <p className={styles.hint}>{formData.description.length}/1000 characters</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>
                  <PriorityIcon className={styles.labelIcon} />
                  Priority Level
                </label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="low"
                      checked={formData.priority === 'low'}
                      onChange={handleInputChange}
                    />
                    <span>Low</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="medium"
                      checked={formData.priority === 'medium'}
                      onChange={handleInputChange}
                    />
                    <span>Medium</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="high"
                      checked={formData.priority === 'high'}
                      onChange={handleInputChange}
                    />
                    <span>High</span>
                  </label>
                  {reportType === 'civil' && (
                    <label className={styles.radioLabel}>
                      <input 
                        type="radio" 
                        name="priority" 
                        value="emergency"
                        checked={formData.priority === 'emergency'}
                        onChange={handleInputChange}
                      />
                      <span className={styles.emergency}>Emergency</span>
                    </label>
                  )}
                </div>
                {reportType === 'civil' && formData.priority === 'emergency' && (
                  <div className={styles.emergencyAlert}>
                    <SirenIcon className={styles.emergencyIcon} />
                    <div className={styles.emergencyContent}>
                      <p>For life-threatening emergencies, please call emergency services directly.</p>
                      <a href="tel:191" className={styles.emergencyCallBtn}>
                        <CallIcon /><span> Call 191</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                  />
                  <span>Submit anonymously</span>
                </label>
                <p className={styles.hint}>Your identity will be hidden from public view</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="attachment" className={styles.label}>
                  <ClipFileIcon className={styles.labelIcon} />
                  Attachments (Optional)
                </label>
                <input
                  type="file"
                  id="attachment"
                  className={styles.fileInput}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <p className={styles.hint}>You can upload images or documents (Max 5MB per file)</p>
                {errors.attachments && <span className={styles.errorText}>{errors.attachments}</span>}
                
                {formData.attachments.length > 0 && (
                  <div className={styles.attachmentList}>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className={styles.attachmentItem}>
                        <ClipFileIcon className={styles.attachmentIcon} />
                        <span className={styles.attachmentName}>{file.name}</span>
                        <span className={styles.attachmentSize}>
                          ({(file.size / 1024).toFixed(1)}KB)
                        </span>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeAttachment(index)}
                          aria-label="Remove attachment"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
          </Slide>
          </div>

          <Slide direction="right" duration={1000} triggerOnce>
          <div className={styles.sidebar}>
            {showHowItWorks && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.infoTitle}>
                    <MegaphoneIcon className={styles.infoIcon} />
                    How It Works
                  </h3>
                  <button 
                    className={styles.dismissBtn}
                    onClick={handleDismissHowItWorks}
                  >
                    Ok, got it
                  </button>
                </div>
                <ul className={styles.infoList}>
                  <li>Choose between Municipality or Civil Services</li>
                  <li>Select the appropriate category</li>
                  <li>Provide detailed information and location</li>
                  <li>Attach any relevant photos or documents</li>
                  <li>Submit and track your report status</li>
                  <li>Receive updates via notifications</li>
                </ul>
              </div>
            )}

            {showTips && (
              <div className={styles.tipCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.tipTitle}>
                    <LightbulbIcon className={styles.tipIcon} />
                    Tips
                  </h3>
                  <button 
                    className={styles.dismissBtn}
                    onClick={handleDismissTips}
                  >
                    Don't show again
                  </button>
                </div>
                <ul className={styles.infoList}>
                  <li>Be specific about the location</li>
                  <li>Include clear photos if possible</li>
                  <li>Describe the issue in detail</li>
                  <li>Set appropriate priority level</li>
                  <li>Check for duplicate reports</li>
                </ul>
              </div>
            )}
          </div>
          </Slide>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIconWrapper}>
                <CheckCircleIcon className={styles.modalIcon} />
              </div>
              <h2 className={styles.modalTitle}>Report Submitted Successfully!</h2>
              <p className={styles.modalMessage}>
                Thank you for your submission. We've received your report and will review it shortly. 
                You'll receive a notification once it has been processed.
              </p>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </Fade>
        </div>
      )}

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className={styles.modalOverlay} onClick={handleClosePostModal}>
          <Fade duration={400} triggerOnce>
            <div className={styles.postModalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalCloseBtn} onClick={handleClosePostModal}>
                <XIcon className={styles.closeIcon} />
              </button>

              <div className={styles.postStep}>
                <div className={styles.postStepHeader}>
                  <h2 className={styles.postModalTitle}>Create a Post</h2>
                  <p className={styles.postModalSubtitle}>Who can see this post?</p>
                </div>
                
                {/* Scope Selection */}
                <div className={styles.postFormGroup}>
                  {postErrors.scope && (
                    <span className={styles.errorText}>{postErrors.scope}</span>
                  )}
                  
                  <div className={styles.postScopeSelection}>
                    <button
                      type="button"
                      className={`${styles.scopeBtn} ${postScope === 'municipality' ? styles.active : ''}`}
                      onClick={() => {
                        setPostScope('municipality');
                        setPostErrors({});
                      }}
                    >
                      <GovernmentIcon className={styles.scopeBtnIcon} />
                      <div>
                        <h4>Your Municipality</h4>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`${styles.scopeBtn} ${postScope === 'ghana' ? styles.active : ''}`}
                      onClick={() => {
                        setPostScope('ghana');
                        setPostErrors({});
                      }}
                    >
                      <GhanaDarkIcon className={styles.scopeBtnIcon} />
                      <div>
                        <h4>Across Ghana</h4>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.postFormGroup}>
                  <textarea
                    className={styles.postTextarea}
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => {
                      setPostContent(e.target.value);
                      setPostErrors({});
                    }}
                    maxLength={1000}
                    disabled={!postScope}
                  />
                  {postErrors.content && (
                    <span className={styles.errorText}>{postErrors.content}</span>
                  )}
                  <div className={styles.charCounter}>
                    <div className={`${styles.charCount} ${getCharCountClass()}`}>
                      {postContent.length}/1000
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {postImages.length > 0 && (
                  <div className={styles.postImagePreview}>
                    {postImages.map((file, index) => (
                      <div key={index} className={styles.postImageItem}>
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Preview ${index + 1}`}
                          className={styles.postImageThumb}
                        />
                        <button
                          type="button"
                          className={styles.removeImageBtn}
                          onClick={() => removePostImage(index)}
                          title="Remove image"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Preview */}
                {postVideo && (
                  <div className={styles.postVideoPreview}>
                    <div className={styles.postVideoItem}>
                      <video 
                        src={URL.createObjectURL(postVideo)} 
                        className={styles.postVideoThumb}
                        controls
                      />
                      <button
                        type="button"
                        className={styles.removeVideoBtn}
                        onClick={removePostVideo}
                        title="Remove video"
                      >
                        <XIcon />
                      </button>
                    </div>
                    <p className={styles.videoInfo}>
                      {postVideo.name} ({(postVideo.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                )}

                {postErrors.video && (
                  <div className={styles.errorText} style={{ marginTop: '0.5rem' }}>
                    {postErrors.video}
                  </div>
                )}

                {/* Document Preview */}
                {postDocuments.length > 0 && (
                  <div className={styles.postDocumentPreview}>
                    {postDocuments.map((file, index) => (
                      <div key={index} className={styles.postDocumentItem}>
                        <div className={styles.documentInfo}>
                          <ClipFileIcon className={styles.documentIcon} />
                          <div className={styles.documentDetails}>
                            <span className={styles.documentName}>{file.name}</span>
                            <span className={styles.documentSize}>{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.removeDocumentBtn}
                          onClick={() => removePostDocument(index)}
                          title="Remove document"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {postErrors.documents && (
                  <div className={styles.errorText} style={{ marginTop: '0.5rem' }}>
                    {postErrors.documents}
                  </div>
                )}

                {/* Poll Section */}
                {showPoll && (
                  <div className={styles.pollSection}>
                    <div className={styles.pollHeader}>
                      <h4 className={styles.pollTitle}>Create a Poll</h4>
                      <button
                        type="button"
                        className={styles.removePollBtn}
                        onClick={() => setShowPoll(false)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      className={styles.pollInput}
                      placeholder="Ask a question..."
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                    />
                    
                    <div className={styles.pollOptions}>
                      {pollOptions.map((option, index) => (
                        <div key={index} className={styles.pollOptionRow}>
                          <input
                            type="text"
                            className={styles.pollOptionInput}
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => updatePollOption(index, e.target.value)}
                          />
                          {pollOptions.length > 2 && (
                            <button
                              type="button"
                              className={styles.removeOptionBtn}
                              onClick={() => removePollOption(index)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {pollOptions.length < 4 && (
                      <button
                        type="button"
                        className={styles.addOptionBtn}
                        onClick={addPollOption}
                      >
                        + Add Option
                      </button>
                    )}
                    
                    <div className={styles.pollDuration}>
                      <label className={styles.pollLabel}>Poll Duration:</label>
                      <select
                        className={styles.pollSelect}
                        value={pollDuration}
                        onChange={(e) => setPollDuration(e.target.value as any)}
                      >
                        <option value="1day">1 Day</option>
                        <option value="3days">3 Days</option>
                        <option value="1week">1 Week</option>
                        <option value="unlimited">No Time Limit</option>
                      </select>
                    </div>
                    
                    {postErrors.poll && (
                      <span className={styles.errorText}>{postErrors.poll}</span>
                    )}
                  </div>
                )}

                {postErrors.submit && (
                  <div className={styles.errorText} style={{ marginTop: '1rem' }}>
                    {postErrors.submit}
                  </div>
                )}
              </div>

              {/* Black Bottom Controls */}
              <div className={styles.postControls}>
                <div className={styles.postControlsLeft}>
                  {/* Image Upload */}
                  <input
                    id="postFileInput"
                    type="file"
                    className={styles.postFileInput}
                    multiple
                    accept="image/*"
                    onChange={handlePostImageChange}
                    disabled={!postScope || postImages.length >= 4 || !!postVideo}
                    ref={fileInputRef}
                  />
                  <label 
                    htmlFor="postFileInput" 
                    className={`${styles.controlBtn} ${(!postScope || postImages.length >= 4 || !!postVideo) ? styles.disabled : ''}`}
                    title="Add images (up to 4)"
                  >
                    <CameraIcon className={styles.controlIcon} />
                  </label>
                  
                  {/* Video Upload */}
                  <input
                    id="postVideoInput"
                    type="file"
                    className={styles.postFileInput}
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={!postScope || !!postVideo || postImages.length > 0}
                    ref={videoInputRef}
                  />
                  <label 
                    htmlFor="postVideoInput" 
                    className={`${styles.controlBtn} ${(!postScope || !!postVideo || postImages.length > 0) ? styles.disabled : ''}`}
                    title="Add video (max 30 minutes)"
                  >
                    <ScreenPlayIcon className={styles.controlIcon} />
                  </label>
                  
                  {/* Document Upload */}
                  <input
                    id="postDocumentInput"
                    type="file"
                    className={styles.postFileInput}
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleDocumentUpload}
                    disabled={!postScope || postDocuments.length >= 5}
                    ref={documentInputRef}
                  />
                  <label 
                    htmlFor="postDocumentInput" 
                    className={`${styles.controlBtn} ${(!postScope || postDocuments.length >= 5) ? styles.disabled : ''}`}
                    title="Add documents (up to 5)"
                  >
                    <ClipFileIcon className={styles.controlIcon} />
                  </label>
                  
                  {/* Poll Button */}
                  <button
                    type="button"
                    className={`${styles.controlBtn} ${!postScope || showPoll ? styles.disabled : ''}`}
                    onClick={() => setShowPoll(true)}
                    disabled={!postScope || showPoll}
                    title="Create poll"
                  >
                    <PollHIcon className={styles.controlIcon} />
                  </button>
                  
                  {/* Emoji Picker */}
                  <div className={styles.emojiPickerWrapper}>
                    <button
                      type="button"
                      className={`${styles.controlBtn} ${!postScope ? styles.disabled : ''}`}
                      onClick={() => {
                        setShowEmojiPicker(!showEmojiPicker);
                        setShowLocationDropdown(false);
                        setShowPublicityDropdown(false);
                      }}
                      disabled={!postScope}
                      title="Add emoji"
                    >
                      <WinkIcon className={styles.controlIcon} />
                    </button>
                    
                    {showEmojiPicker && (
                      <div className={styles.emojiPickerPopup}>
                        {commonEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className={styles.emojiItem}
                            onClick={() => handleEmojiClick(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.controlDivider}></div>
                  
                  {/* Location Visibility Dropdown */}
                  <div className={styles.controlDropdownWrapper}>
                    <button
                      type="button"
                      className={`${styles.controlToggle} ${locationVisibility === 'hide' ? styles.active : ''}`}
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowEmojiPicker(false);
                        setShowPublicityDropdown(false);
                      }}
                      disabled={!postScope}
                      title="Location visibility"
                    >
                      <MarkerIcon className={styles.controlIcon} />
                      {locationVisibility === 'hide' && <span className={styles.toggleSlash}>/</span>}
                    </button>
                    
                    {showLocationDropdown && (
                      <div className={styles.controlDropdownPopup}>
                        <button
                          type="button"
                          className={`${styles.dropdownOption} ${locationVisibility === 'show' ? styles.selected : ''}`}
                          onClick={() => {
                            setLocationVisibility('show');
                            setShowLocationDropdown(false);
                          }}
                        >
                          Show Location
                        </button>
                        <button
                          type="button"
                          className={`${styles.dropdownOption} ${locationVisibility === 'hide' ? styles.selected : ''}`}
                          onClick={() => {
                            setLocationVisibility('hide');
                            setShowLocationDropdown(false);
                          }}
                        >
                          Hide Location
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Publicity Type Dropdown */}
                  <div className={styles.controlDropdownWrapper}>
                    <button
                      type="button"
                      className={`${styles.controlToggle} ${publicityType === 'anonymous' ? styles.active : ''}`}
                      onClick={() => {
                        setShowPublicityDropdown(!showPublicityDropdown);
                        setShowEmojiPicker(false);
                        setShowLocationDropdown(false);
                      }}
                      disabled={!postScope}
                      title="Publicity type"
                    >
                      <LeaderSpeechIcon className={styles.controlIcon} />
                      {publicityType === 'anonymous' && <span className={styles.toggleSlash}>/</span>}
                    </button>
                    
                    {showPublicityDropdown && (
                      <div className={styles.controlDropdownPopup}>
                        <button
                          type="button"
                          className={`${styles.dropdownOption} ${publicityType === 'public' ? styles.selected : ''}`}
                          onClick={() => {
                            setPublicityType('public');
                            setShowPublicityDropdown(false);
                          }}
                        >
                          Public
                        </button>
                        <button
                          type="button"
                          className={`${styles.dropdownOption} ${publicityType === 'anonymous' ? styles.selected : ''}`}
                          onClick={() => {
                            setPublicityType('anonymous');
                            setShowPublicityDropdown(false);
                          }}
                        >
                          Anonymous
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.postControlsRight}>
                  {/* Reply Restriction */}
                  <div className={styles.replyRestrictionWrapper}>
                    <label className={styles.replyLabel}>Who can reply:</label>
                    <select
                      className={styles.replySelect}
                      value={replyRestriction}
                      onChange={(e) => setReplyRestriction(e.target.value as any)}
                      disabled={!postScope}
                    >
                      <option value="everyone">Everyone</option>
                      <option value="followers">Followers only</option>
                      <option value="municipality">Municipality only</option>
                    </select>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    className={styles.postSubmitBtn} 
                    onClick={handleSubmitPost}
                    disabled={isSubmitting || (!postContent.trim() && !showPoll && postImages.length === 0 && !postVideo && postDocuments.length === 0)}
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      )}

      {/* Post Success Modal */}
      {showPostSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPostSuccessModal(false)}>
          <Fade duration={400} triggerOnce>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIconWrapper}>
                <CheckCircleIcon className={styles.modalIcon} />
              </div>
              <h2 className={styles.modalTitle}>Post Shared Successfully!</h2>
              <p className={styles.modalMessage}>
                Your post has been shared with {postScope === 'municipality' ? 'your municipality' : 'everyone across Ghana'}. 
                Others can now see and interact with your post.
              </p>
              <button className={styles.modalButton} onClick={() => setShowPostSuccessModal(false)}>
                Done
              </button>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default VoiceOut;