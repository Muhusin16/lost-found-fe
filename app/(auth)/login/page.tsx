// app/(auth)/login/page.tsx

"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './login.module.scss';
import Link from 'next/link';

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
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
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
            className={styles.input}
          />
        </div>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
