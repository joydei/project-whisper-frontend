import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/public/Login.module.css';

// Import SVG icons
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';

const Login = () => {
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
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      {/* ── Left branding panel (desktop only) ── */}
      <div className={styles.leftPanel}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>Aircho</h1>
          <p className={styles.brandTagline}>Connecting Communities with Services</p>

          <div className={styles.portalButtons}>
            <Link to="/civil-login" className={styles.portalBtn}>
              <SirenIcon className={styles.portalBtnIcon} />
              <span>Civil Services Portal</span>
            </Link>
            <Link to="/municipality-login" className={styles.portalBtn}>
              <GovernmentIcon className={styles.portalBtnIcon} />
              <span>Municipality Portal</span>
            </Link>
          </div>
        </div>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Report Issues</strong>Submit infrastructure, safety, and service concerns directly to your municipality.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Track Progress</strong>Follow your reports in real time and get notified when they are resolved.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Engage Locally</strong>Read updates from civil services and government entities in your area.</p>
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
              <p>Connecting Communities with Services</p>
            </div>

            {/* Form */}
            <p className={styles.formHeading}>Log in</p>
            <p className={styles.formSubheading}>Welcome back — Log in to your account</p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <EnvelopeIcon className={styles.labelIcon} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  <KeyIcon className={styles.labelIcon} />
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
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
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>

            {/* Mobile-only portal links */}
            <div className={styles.mobilePortalLinks}>
              <Link to="/civil-login" className={styles.mobilePortalBtn}>
                <SirenIcon className={styles.portalBtnIcon} />
                <span>Civil Services Portal</span>
              </Link>
              <Link to="/municipality-login" className={styles.mobilePortalBtn}>
                <GovernmentIcon className={styles.portalBtnIcon} />
                <span>Municipality Portal</span>
              </Link>
            </div>

            <div className={styles.signupPrompt}>
              <p>Don't have an account? <a href="/signup" className={styles.signupLink}>Sign Up</a></p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Login;