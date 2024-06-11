// src/components/PostForm.js
import React, { useState, useEffect } from 'react';

const PostForm = ({ addPost, updatePost, editingPost, setEditingPost }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    if (editingPost) {
      setPost(editingPost);
    } else {
      setPost({ title: '', body: '' });
    }
  }, [editingPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(post);
    } else {
      addPost(post);
    }
    resetForm();
  };

  const resetForm = () => {
    setPost({ title: '', body: '' });
    setEditingPost(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Add Post'}</h2>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <textarea
        name="body"
        value={post.body}
        onChange={handleChange}
        placeholder="Body"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {editingPost ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default PostForm;
