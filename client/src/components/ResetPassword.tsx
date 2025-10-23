import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import type { ApiResponse } from '../types/api';
import '../styles/Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  submit?: string;
  token?: string;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setErrors({ token: 'Invalid or missing reset token' });
    }
  }, [token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!token) {
      setErrors({ token: 'Invalid or missing reset token' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data: ApiResponse<unknown> = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrors({ submit: data.error });
      }
    } catch (error) {
      setErrors({ submit: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Password Reset Successful</h1>
          </div>

          <div className="password-reset-success">
            <div className="success-icon">✅</div>
            <p>Your password has been reset successfully!</p>
            <p className="redirect-message">Redirecting to login page...</p>

            <div className="auth-footer">
              <Link to="/login" className="auth-link">
                Continue to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Set New Password</h1>
          <p>Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {(errors.submit || errors.token) && (
            <div className="error-message">
              {errors.submit || errors.token}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your new password"
              disabled={loading || !!errors.token}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your new password"
              disabled={loading || !!errors.token}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || !!errors.token}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
