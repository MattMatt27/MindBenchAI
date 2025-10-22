import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const API_URL = 'http://localhost:5000/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus('error');
      setMessage('No verification token provided');
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Email verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error occurred');
    }
  };

  const resendVerification = async () => {
    const email = prompt('Please enter your email address to resend verification:');
    if (!email) return;

    setResending(true);

    try {
      const response = await fetch(`${API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Verification email sent! Please check your inbox.');
      } else {
        alert(data.error || 'Failed to resend verification email');
      }
    } catch (error) {
      alert('Network error occurred');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Email Verification</h1>
        </div>

        <div className="verification-content">
          {status === 'verifying' && (
            <div className="verification-status">
              <div className="loading-spinner"></div>
              <p>Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="verification-status success">
              <div className="success-icon">✅</div>
              <p className="success-message">{message}</p>
              <p className="redirect-message">Redirecting to login page...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="verification-status error">
              <div className="error-icon">❌</div>
              <p className="error-message">{message}</p>

              <div className="verification-actions">
                <button
                  onClick={resendVerification}
                  className="auth-button"
                  disabled={resending}
                >
                  {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>

                <Link to="/login" className="auth-link">
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}