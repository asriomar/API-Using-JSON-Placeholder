// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
  };

  const addPost = async (post) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    setPosts([...posts, response.data]);
  };

  const updatePost = async (updatedPost) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
    setPosts(posts.map(post => post.id === updatedPost.id ? response.data : post));
    setEditingPost(null);
  };

  const deletePost = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  };

  const filterPosts = () => {
    const filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">JSONPlaceholder Posts</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <PostForm addPost={addPost} updatePost={updatePost} editingPost={editingPost} setEditingPost={setEditingPost} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredPosts.map(post => (
          <Post key={post.id} post={post} deletePost={deletePost} setEditingPost={setEditingPost} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
