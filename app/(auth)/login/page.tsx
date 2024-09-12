"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "../../styles/app.scss";
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';
import { setJsonValueInLocalStorage } from '@/app/services/coreServices';
import { jwtDecode} from 'jwt-decode'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${apiUrls.login}`,{email, password});

     if(response.data.success) {
      let token = response.data.data.token;
      if (token) {
        setJsonValueInLocalStorage('token',token);
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken?.role;

        if (userRole == 'user') {
          router.push('/user/dashboard');
        } else if (userRole == 'admin') {
          router.push('/dashboard');
        }
      }
     }
    } catch (error) {
      console.error(error);
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
