import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { useHeaderFade } from '../../hooks/useHeaderFade';
import styles from '../../styles/user/Messages.module.css';
import { conversations as initialConversations, type Conversation, type ChatMessage } from '../../data/messagesData';

// Import SVG icons
import SearchIcon from '../../assets/icons/search.svg?react';
import SendIcon from '../../assets/icons/send.svg?react';
import ArrowLeftIcon from '../../assets/icons/angle-left.svg?react';
import MessagesIcon from '../../assets/icons/messages.svg?react';
import AttachmentIcon from '../../assets/icons/attach.svg?react';
import EmojiIcon from '../../assets/icons/laugh-wink.svg?react';
import ImageIcon from '../../assets/icons/image.svg?react';
import VideoIcon from '../../assets/icons/video.svg?react';
import FileIcon from '../../assets/icons/file.svg?react';
import CheckIcon from '../../assets/icons/check.svg?react';
import CheckDoubleIcon from '../../assets/icons/check-double.svg?react';

const Messages = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const headerOpacity = useHeaderFade();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [unreadBannerIndex, setUnreadBannerIndex] = useState<number>(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If a username param is provided, open that conversation
  useEffect(() => {
    if (username) {
      // Skip if we're already viewing this conversation (prevent recalculation)
      if (activeConvo?.user.username === username) return;
      
      const convo = conversations.find(c => c.user.username === username);
      if (convo) {
        const firstUnreadIdx = convo.messages.findIndex(msg => !msg.read && msg.senderId !== 'me');
        setUnreadBannerIndex(firstUnreadIdx);
        setActiveConvo(convo);
        // Mark messages as read
        setConversations(prev =>
          prev.map(c =>
            c.user.username === username
              ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) }
              : c
          )
        );
      } else {
        // Create a new conversation stub for unknown user
        const newConvo: Conversation = {
          id: Date.now(),
          user: {
            name: username.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            username: username,
            avatar: username.substring(0, 2).toUpperCase(),
            online: false,
          },
          messages: [],
          lastMessage: '',
          lastMessageTime: 'Just now',
          unread: 0,
        };
        setConversations(prev => [newConvo, ...prev]);
        setActiveConvo(newConvo);
      }
    }
  }, [username]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvo?.messages]);

  const handleSelectConvo = (convo: Conversation) => {
    // Calculate unread index BEFORE marking as read
    const firstUnreadIdx = convo.messages.findIndex(msg => !msg.read && msg.senderId !== 'me');
    setUnreadBannerIndex(firstUnreadIdx);
    setActiveConvo(convo);
    navigate(`/messages/${convo.user.username}`, { replace: true });

    // Mark as read
    setConversations(prev =>
      prev.map(c =>
        c.id === convo.id
          ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) }
          : c
      )
    );
  };

  const handleSendMessage = (attachment?: ChatMessage['attachment']) => {
    if ((!newMessage.trim() && !attachment) || !activeConvo) return;

    const msg: ChatMessage = {
      id: Date.now(),
      senderId: 'me',
      text: newMessage.trim(),
      time: 'Just now',
      read: true,
      status: 'sent',
      attachment,
    };

    // Simulate message status progression
    setTimeout(() => {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConvo.id
            ? {
                ...conv,
                messages: conv.messages.map(m =>
                  m.id === msg.id ? { ...m, status: 'delivered' } : m
                ),
              }
            : conv
        )
      );
      if (activeConvo.id === activeConvo.id) {
        setActiveConvo(prev => prev ? {
          ...prev,
          messages: prev.messages.map(m =>
            m.id === msg.id ? { ...m, status: 'delivered' } : m
          ),
        } : null);
      }
    }, 1000);

    setTimeout(() => {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConvo.id
            ? {
                ...conv,
                messages: conv.messages.map(m =>
                  m.id === msg.id ? { ...m, status: 'read' } : m
                ),
              }
            : conv
        )
      );
      if (activeConvo.id === activeConvo.id) {
        setActiveConvo(prev => prev ? {
          ...prev,
          messages: prev.messages.map(m =>
            m.id === msg.id ? { ...m, status: 'read' } : m
          ),
        } : null);
      }
    }, 3000);

    const lastMessage = attachment 
      ? `📎 ${attachment.type === 'image' ? 'Photo' : attachment.type === 'video' ? 'Video' : 'File'}`
      : msg.text;

    const updatedConvo = {
      ...activeConvo,
      messages: [...activeConvo.messages, msg],
      lastMessage,
      lastMessageTime: 'Just now',
    };

    setActiveConvo(updatedConvo);
    setConversations(prev =>
      prev.map(c => (c.id === activeConvo.id ? updatedConvo : c))
    );
    setNewMessage('');
    setShowAttachmentMenu(false);
    setShowEmojiPicker(false);
    setUnreadBannerIndex(-1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (300MB for videos)
    const maxSize = file.type.startsWith('video/') ? 300 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File too large. Maximum size is ${file.type.startsWith('video/') ? '300MB' : '50MB'}.`);
      return;
    }

    setUploadingFile(true);
    
    // Simulate file upload (in real app, upload to server)
    const fileUrl = URL.createObjectURL(file);
    
    const attachment: ChatMessage['attachment'] = {
      type: file.type.startsWith('image/') ? 'image' :
            file.type.startsWith('video/') ? 'video' : 'file',
      url: fileUrl,
      name: file.name,
      size: file.size,
    };

    setTimeout(() => {
      setUploadingFile(false);
      handleSendMessage(attachment);
    }, 1000);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Helper to get message status icon
  const getMessageStatusIcon = (message: ChatMessage) => {
    if (message.senderId !== 'me') return null;

    switch (message.status) {
      case 'sent':
        return <CheckIcon className={styles.messageStatusIcon} />;
      case 'delivered':
        return <CheckDoubleIcon className={styles.messageStatusIcon} />;
      case 'read':
        return <CheckDoubleIcon className={`${styles.messageStatusIcon} ${styles.messageStatusRead}`} />;
      default:
        return null;
    }
  };

  // Helper to get last message status icon for convo list
  const getConvoStatusIcon = (convo: Conversation) => {
    const lastMsg = convo.messages[convo.messages.length - 1];
    if (!lastMsg || lastMsg.senderId !== 'me') return null;

    switch (lastMsg.status) {
      case 'sent':
        return <CheckIcon className={styles.convoStatusIcon} />;
      case 'delivered':
        return <CheckDoubleIcon className={styles.convoStatusIcon} />;
      case 'read':
        return <CheckDoubleIcon className={`${styles.convoStatusIcon} ${styles.convoStatusRead}`} />;
      default:
        return null;
    }
  };

  // Common emojis
  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👏', '❤️', '🎉', '🔥', '💯', '👌', '😊'];

  const triggerFileInput = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  };

  const handleBack = () => {
    setActiveConvo(null);
    setUnreadBannerIndex(-1);
    navigate('/messages', { replace: true });
  };

  const filteredConversations = conversations.filter(c =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className={styles.messagesPage}>
      {/* Header */}
      <div className={styles.header} style={{ opacity: headerOpacity }}>
        <div className={styles.container}>
          <Fade direction="down" triggerOnce>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.pageTitle}>Messages</h1>
              </div>
              <div className={styles.headerStats}>
                <div className={styles.statBadge}>
                  <span className={styles.statNumber}>{conversations.length}</span>
                  <span className={styles.statLabel}>Conversations</span>
                </div>
                {totalUnread > 0 && (
                  <div className={`${styles.statBadge} ${styles.unreadBadge}`}>
                    <span className={styles.statNumber}>{totalUnread}</span>
                    <span className={styles.statLabel}>Unread</span>
                  </div>
                )}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* Chat Layout */}
      <div className={styles.container}>
        <div className={styles.chatLayout}>
          {/* Conversation List */}
          <div className={`${styles.convoList} ${activeConvo ? styles.convoListHidden : ''}`}>
            <div className={styles.convoSearch}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.convoItems}>
              {filteredConversations.length === 0 ? (
                <div className={styles.noConversations}>
                  <MessagesIcon className={styles.emptyIcon} />
                  <p>No conversations found</p>
                </div>
              ) : (
                filteredConversations.map(convo => (
                  <div
                    key={convo.id}
                    className={`${styles.convoItem} ${
                      activeConvo?.id === convo.id ? styles.convoItemActive : ''
                    } ${convo.unread > 0 ? styles.convoItemUnread : ''}`}
                    onClick={() => handleSelectConvo(convo)}
                  >
                    <div className={styles.convoAvatar}>
                      <span>{convo.user.avatar}</span>
                      {convo.user.online && <span className={styles.onlineDot} />}
                    </div>
                    <div className={styles.convoInfo}>
                      <div className={styles.convoTop}>
                        <span className={styles.convoName}>{convo.user.name}</span>
                        <span className={styles.convoTime}>{convo.lastMessageTime}</span>
                      </div>
                      <div className={styles.convoBottom}>
                        <span className={styles.convoPreview}>
                          {getConvoStatusIcon(convo)}
                          {convo.lastMessage || 'Start a conversation...'}
                        </span>
                        {convo.unread > 0 && (
                          <span className={styles.unreadCount}>{convo.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${styles.chatArea} ${activeConvo ? styles.chatAreaVisible : ''}`}>
            {activeConvo ? (
              <>
                {/* Chat Header */}
                <div className={styles.chatHeader}>
                  <button className={styles.backBtn} onClick={handleBack}>
                    <ArrowLeftIcon className={styles.backIcon} />
                  </button>
                  <div
                    className={styles.chatUserInfo}
                    onClick={() => navigate(`/user/${activeConvo.user.username}`)}
                  >
                    <div className={styles.chatAvatar}>
                      <span>{activeConvo.user.avatar}</span>
                      {activeConvo.user.online && <span className={styles.onlineDot} />}
                    </div>
                    <div>
                      <span className={styles.chatUserName}>{activeConvo.user.name}</span>
                      <span className={styles.chatUserStatus}>
                        {activeConvo.user.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className={styles.messagesArea}>
                  {activeConvo.messages.length === 0 ? (
                    <div className={styles.emptyChat}>
                      <MessagesIcon className={styles.emptyChatIcon} />
                      <p className={styles.emptyChatText}>
                        No messages yet. Send a message to start the conversation!
                      </p>
                    </div>
                  ) : (
                    activeConvo.messages.map((msg, index) => (
                      <div key={`msg-${msg.id}`} className={styles.messageWrapper}>
                        {/* Unread Messages Banner */}
                        {index === unreadBannerIndex && unreadBannerIndex !== -1 && (
                          <div className={styles.unreadBanner}>
                            <span className={styles.unreadBannerText}>Unread Messages</span>
                          </div>
                        )}
                        
                        {/* Message */}
                        <div
                          className={`${styles.message} ${
                            msg.senderId === 'me' ? styles.messageSent : styles.messageReceived
                          }`}
                        >
                            <div className={styles.messageBubble}>
                              {msg.attachment ? (
                                <div className={styles.messageAttachment}>
                                  {msg.attachment.type === 'image' ? (
                                    <img 
                                      src={msg.attachment.url} 
                                      alt={msg.attachment.name}
                                      className={styles.attachmentImage}
                                    />
                                  ) : msg.attachment.type === 'video' ? (
                                    <video 
                                      src={msg.attachment.url} 
                                      controls 
                                      className={styles.attachmentVideo}
                                    />
                                  ) : (
                                    <div className={styles.attachmentFile}>
                                      <FileIcon className={styles.attachmentFileIcon} />
                                      <div className={styles.attachmentFileInfo}>
                                        <span className={styles.attachmentFileName}>{msg.attachment.name}</span>
                                        <span className={styles.attachmentFileSize}>{formatFileSize(msg.attachment.size)}</span>
                                      </div>
                                    </div>
                                  )}
                                  {msg.text && <p className={styles.messageText}>{msg.text}</p>}
                                </div>
                              ) : (
                                <p className={styles.messageText}>{msg.text}</p>
                              )}
                              <div className={styles.messageFooter}>
                                <span className={styles.messageTime}>{msg.time}</span>
                                {getMessageStatusIcon(msg)}
                              </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={styles.inputArea}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  
                  {/* Attachment Menu */}
                  {showAttachmentMenu && (
                    <div className={styles.attachmentMenu}>
                      <button 
                        className={styles.attachmentOption}
                        onClick={() => triggerFileInput('image/*')}
                      >
                        <ImageIcon className={styles.attachmentIcon} />
                        Photo
                      </button>
                      <button 
                        className={styles.attachmentOption}
                        onClick={() => triggerFileInput('video/*')}
                      >
                        <VideoIcon className={styles.attachmentIcon} />
                        Video
                      </button>
                      <button 
                        className={styles.attachmentOption}
                        onClick={() => triggerFileInput('*')}
                      >
                        <FileIcon className={styles.attachmentIcon} />
                        File
                      </button>
                    </div>
                  )}

                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className={styles.emojiPicker}>
                      {emojis.map(emoji => (
                        <button
                          key={emoji}
                          className={styles.emojiButton}
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={styles.inputRow}>
                    <button 
                      className={styles.attachBtn}
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      disabled={uploadingFile}
                    >
                      <AttachmentIcon className={styles.attachIcon} />
                    </button>
                    
                    <button 
                      className={styles.emojiBtn}
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      disabled={uploadingFile}
                    >
                      <EmojiIcon className={styles.emojiIcon} />
                    </button>
                    
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className={styles.messageInput}
                      disabled={uploadingFile}
                    />
                    
                    <button
                      className={styles.sendBtn}
                      onClick={() => handleSendMessage()}
                      disabled={(!newMessage.trim() && !uploadingFile) || uploadingFile}
                    >
                      {uploadingFile ? (
                        <div className={styles.uploadingSpinner} />
                      ) : (
                        <SendIcon className={styles.sendIcon} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noChat}>
                <MessagesIcon className={styles.noChatIcon} />
                <h2 className={styles.noChatTitle}>Your Messages</h2>
                <p className={styles.noChatText}>
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
