import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Post } from '../data/postsData';

interface PostsContextType {
  userPosts: Post[];
  addPost: (post: Omit<Post, 'id' | 'time' | 'likes' | 'comments' | 'shares' | 'reposts'>) => void;
  deletePost: (postId: number) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

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
  };

  return (
    <PostsContext.Provider value={{ userPosts, addPost, deletePost }}>
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
