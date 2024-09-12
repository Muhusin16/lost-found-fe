'use client';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './register.module.scss';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';
import '../../styles/app.scss';
import axiosInstance from '@/app/services/axiosInterceptor';

export default function AddNewUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${apiUrls.addNewUser}`, formData);

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
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Username"
            required
            className="form-control"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-control"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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
