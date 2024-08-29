"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "../../styles/app.scss";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5002/api/admin/login', { email, password });
      console.log(response);
      // debugger;
      localStorage.setItem('token', response.data.token); // Store token in local storage
      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Redirecting to Forgot Password.');
      setTimeout(() => {
        router.push('/forgot-password'); // Redirect to forgot password page
      }, 2000); // Redirect after 2 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login-page__content">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Link className='link' href="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="hfmn-btn hfmn-btn--primary" style={{ width: "100%" }} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
