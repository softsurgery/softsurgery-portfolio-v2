'use client'

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const usersRes = await fetch('/api/users');
      const usersData = await usersRes.json();
      setUsers(usersData);

      const postsRes = await fetch('/api/posts');
      const postsData = await postsRes.json();
      setPosts(postsData);
    }

    fetchData();
  }, []);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: parseInt(age), email }),
      });
      const data = await res.json();
      setUsers([...users, data[0]]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, userId: parseInt(userId) }),
      });
      const data = await res.json();
      setPosts([...posts, data[0]]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Users and Posts</h1>

      {/* Form to add a new user */}
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Form to add a new post */}
      <h2>Add Post</h2>
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>

      {/* Display users */}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display posts */}
      <h2>Posts</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
