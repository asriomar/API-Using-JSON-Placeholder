// src/components/Post.js
import React from 'react';

const Post = ({ post, deletePost, setEditingPost }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setEditingPost(post)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deletePost(post.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
