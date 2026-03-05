import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/public/AdminLogin.module.css';

// Import SVG icons
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import AngleRightIcon from '../../assets/icons/angle-small-right.svg?react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/admin/dashboard');
    setIsLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      {/* ── Left branding panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>Aircho</h1>
          <p className={styles.brandTagline}>Admin Portal</p>
        </div>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>System Management</strong>Manage users, municipalities, and civil services across the platform.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Platform Analytics</strong>Monitor platform-wide metrics, usage statistics, and system health.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Configuration</strong>Control platform settings, permissions, and deployment configurations.</p>
          </li>
        </ul>

        <p className={styles.leftFooter}>© {new Date().getFullYear()} Aircho · Ghana</p>
      </div>

      {/* ── Right form panel ── */}
      <div className={styles.rightPanel}>
        <Fade duration={500} triggerOnce>
          <div className={styles.loginCard}>
            {/* Mobile-only brand */}
            <div className={styles.mobileBrand}>
              <h1>Aircho</h1>
              <p>Admin Portal</p>
            </div>

            {/* Login Form */}
            <p className={styles.formHeading}>Admin Login</p>
            <p className={styles.formSubheading}>Sign in to the administration panel</p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="admin-email" className={styles.label}>
                  <EnvelopeIcon className={styles.labelIcon} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="admin-email"
                  className={styles.input}
                  placeholder="admin@aircho.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="admin-password" className={styles.label}>
                  <KeyIcon className={styles.labelIcon} />
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="admin-password"
                    className={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon className={styles.eyeIcon} />
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
              </div>

              <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                {isLoading ? (
                  <span className={styles.loadingDots}>
                    <span /><span /><span />
                  </span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <AngleRightIcon className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.backPrompt}>
              <p><a href="/login" className={styles.backLink}>← Back to main login</a></p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default AdminLogin;
