'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './register.module.scss';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';
import '../../styles/app.scss';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrls.register}`, formData);

      if (response) {
        console.log('Registration successful:', response.data);
        router.push('/login');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Error during registration:', err.response?.data?.msg || err.message);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Register</h1>
      <div className="login-page__content">
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="form-control"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-control"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-control"
          />
          <button className="hfmn-btn hfmn-btn--primary" style={{ width: "100%" }} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
