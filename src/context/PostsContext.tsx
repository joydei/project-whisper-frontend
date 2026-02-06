import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Post } from '../data/postsData';

interface PostsContextType {
  userPosts: Post[];
  userReports: Post[];
  addPost: (post: Omit<Post, 'id' | 'time' | 'likes' | 'comments' | 'shares' | 'reposts'>) => void;
  addReport: (reportData: any) => void;
  deletePost: (postId: number) => void;
  updatePost: (postId: number, updates: Partial<Post>) => void;
  likePost: (postId: number) => void;
  addComment: (postId: number, comment: any) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userReports, setUserReports] = useState<Post[]>([]);

  const addPost = (postData: Omit<Post, 'id' | 'time' | 'likes' | 'comments' | 'shares' | 'reposts'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now(),
      time: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      commentsData: []
    };
    
    setUserPosts(prev => [newPost, ...prev]);
  };

  const addReport = (reportData: any) => {
    const newReport: Post = {
      id: Date.now(),
      type: 'user' as const,
      author: {
        name: reportData.anonymous ? 'Anonymous' : reportData.author?.name || 'Current User',
        username: reportData.anonymous ? undefined : reportData.author?.username,
        avatar: reportData.anonymous ? undefined : reportData.author?.avatar,
        verified: reportData.author?.verified || false
      },
      content: reportData.description,
      category: reportData.category,
      location: reportData.location,
      time: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      status: reportData.priority === 'emergency' ? 'urgent' : 'pending',
      commentsData: [],
      scope: reportData.reportType || 'municipality'
    };
    
    setUserReports(prev => [newReport, ...prev]);
  };

  const deletePost = (postId: number) => {
    setUserPosts(prev => prev.map(post => {
      if (post.id === postId) {
        // If post has comments, mark as deleted but keep it
        if (post.commentsData && post.commentsData.length > 0) {
          return { ...post, isDeleted: true };
        }
        // If no comments, we can filter it out
        return null;
      }
      return post;
    }).filter((post): post is Post => post !== null));
    
    // Also check reports
    setUserReports(prev => prev.map(post => {
      if (post.id === postId) {
        if (post.commentsData && post.commentsData.length > 0) {
          return { ...post, isDeleted: true };
        }
        return null;
      }
      return post;
    }).filter((post): post is Post => post !== null));
  };

  const updatePost = (postId: number, updates: Partial<Post>) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
    setUserReports(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const likePost = (postId: number) => {
    const updateLikes = (posts: Post[]) => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 } 
          : post
      );
    
    setUserPosts(updateLikes);
    setUserReports(updateLikes);
  };

  const addComment = (postId: number, comment: any) => {
    const updateComments = (posts: Post[]) => 
      posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: post.comments + 1,
              commentsData: [...(post.commentsData || []), comment]
            } 
          : post
      );
    
    setUserPosts(updateComments);
    setUserReports(updateComments);
  };

  return (
    <PostsContext.Provider value={{ 
      userPosts, 
      userReports, 
      addPost, 
      addReport, 
      deletePost, 
      updatePost, 
      likePost, 
      addComment 
    }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
