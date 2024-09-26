'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './forgot-password.module.scss';
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';

const ResetPassword = () => {
  const [step, setStep] = useState<'forgot' | 'verify' | 'reset'>('forgot');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post(apiUrls.forgotPassword, { email });
      console.log(response);

      setMessage('OTP sent to your email. Please check your email.');
      setStep('verify');
      const { resetToken } = response.data.data; 
      localStorage.setItem('resetToken', resetToken); 
    } catch (error) {
      console.error(error);
      setMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const resetToken = localStorage.getItem('resetToken');
    console.log('resetToken:', resetToken);

    try {
      await axiosInstance.post(apiUrls.verifyOtp, { email, otp, resetToken });
      setMessage('OTP verified. Please set a new password.');
      setStep('reset');
    } catch (error) {
      console.error(error);
      setMessage('Failed to verify OTP. Please check your OTP and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const resetToken = localStorage.getItem('resetToken');
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      if (password && email) {
        await axiosInstance.post(apiUrls.resetPassword, {
          email,
          newPassword: password,
          resetToken, 
        });
        setMessage('Password reset successful. Redirecting to login...');
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Find Your Account</h1>
      <h5>Please enter your email address to search for your account.</h5>

      {step === 'forgot' && (
        <div className="login-page__content">
          <form onSubmit={handleForgotPasswordSubmit} className={styles.form}>
            <div className={styles.formGroup}>
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
            <button className="hfmn-btn hfmn-btn--primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        </div>
      )}

      {step === 'verify' && (
        <div className="login-page__content">
          <form onSubmit={handleVerifyOtpSubmit} className={styles.form}>
            <div className={styles.formGroup}>
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
            <div className={styles.formGroup}>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button className="hfmn-btn hfmn-btn--primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        </div>
      )}

      {step === 'reset' && (
        <div className="login-page__content">
          <form onSubmit={handleResetPasswordSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button className="hfmn-btn hfmn-btn--primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
