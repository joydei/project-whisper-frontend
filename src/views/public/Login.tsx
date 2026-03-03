import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/public/Login.module.css';

// Import SVG icons
import UserCheckIcon from '../../assets/icons/user-check.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import SettingsIcon from '../../assets/icons/settings.svg?react';
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import AngleRightIcon from '../../assets/icons/angle-small-right.svg?react';

type UserRole = 'user' | 'municipality' | 'civil' | 'admin';

interface RoleOption {
  value: UserRole;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
}

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
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
    switch (selectedRole) {
      case 'user':        navigate('/'); break;
      case 'municipality': navigate('/municipality/dashboard'); break;
      case 'civil':       navigate('/civil/dashboard'); break;
      case 'admin':       navigate('/admin/dashboard'); break;
    }
    setIsLoading(false);
  };

  const roles: RoleOption[] = [
    { value: 'user',         label: 'User',           icon: UserCheckIcon,  description: 'Report issues & follow updates'   },
    { value: 'municipality', label: 'Municipality',   icon: GovernmentIcon, description: 'Manage reports & services'         },
    { value: 'civil',        label: 'Civil Services', icon: SirenIcon,      description: 'Emergency response management'     },
    { value: 'admin',        label: 'Admin',          icon: SettingsIcon,   description: 'System administration'             },
  ];

  const selectedRoleLabel = roles.find(r => r.value === selectedRole)?.label ?? '';

  return (
    <div className={styles.loginPage}>
      {/* ── Left branding panel (desktop only) ── */}
      <div className={styles.leftPanel}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>Aircho</h1>
          <p className={styles.brandTagline}>Connecting Communities with Services</p>
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

            {/* Role selector */}
            <div className={styles.roleSelector}>
              <p className={styles.sectionTitle}>Select your role</p>
              <div className={styles.rolesGrid}>
                {roles.map(role => {
                  const RoleIcon = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      className={`${styles.roleCard} ${selectedRole === role.value ? styles.active : ''}`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <div className={styles.roleIconWrapper}>
                        <RoleIcon className={styles.roleIcon} />
                      </div>
                      <div className={styles.roleText}>
                        <span className={styles.roleLabel}>{role.label}</span>
                        <span className={styles.roleDescription}>{role.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Form */}
            <p className={styles.formHeading}>Log in</p>
            <p className={styles.formSubheading}>Welcome back — log in as {selectedRoleLabel}</p>

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
                    <span>Continue as {selectedRoleLabel}</span>
                    <AngleRightIcon className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>

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