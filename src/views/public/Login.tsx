import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade, Slide } from 'react-awesome-reveal';
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
  gradient: string;
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate based on selected role
    switch (selectedRole) {
      case 'user':
        navigate('/');
        break;
      case 'municipality':
        navigate('/municipality/dashboard');
        break;
      case 'civil':
        navigate('/civil/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
    }
    
    setIsLoading(false);
  };

  const roles: RoleOption[] = [
    { 
      value: 'user', 
      label: 'Citizen', 
      icon: UserCheckIcon, 
      description: 'Report issues to your municipality',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      value: 'municipality', 
      label: 'Municipality', 
      icon: GovernmentIcon, 
      description: 'Manage reports and services',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      value: 'civil', 
      label: 'Civil Services', 
      icon: SirenIcon, 
      description: 'Emergency response management',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: SettingsIcon, 
      description: 'System administration',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
  ];

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <Fade duration={800} triggerOnce>
          <div className={styles.loginCard}>
            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.logo}>Aircho</h1>
              <p className={styles.tagline}>Connecting Communities with Services</p>
            </div>

            {/* Role Selection */}
            <Slide direction="up" duration={600} delay={200} triggerOnce>
              <div className={styles.roleSelector}>
                <h2 className={styles.sectionTitle}>Select Your Role</h2>
                <div className={styles.rolesGrid}>
                  {roles.map((role) => {
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
                        <span className={styles.roleLabel}>{role.label}</span>
                        <span className={styles.roleDescription}>{role.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Slide>

            {/* Login Form */}
            <Slide direction="up" duration={600} delay={400} triggerOnce>
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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={styles.input}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
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
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                </div>

                <button 
                  type="submit" 
                  className={styles.loginBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className={styles.loadingText}>Logging in...</span>
                  ) : (
                    <>
                      <span>Login as {roles.find(r => r.value === selectedRole)?.label}</span>
                      <AngleRightIcon className={styles.btnIcon} />
                    </>
                  )}
                </button>
              </form>
            </Slide>

            {/* Signup Prompt */}
            <Fade duration={600} delay={600} triggerOnce>
              <div className={styles.signupPrompt}>
                <p>Don't have an account? <a href="#" className={styles.signupLink}>Sign Up</a></p>
              </div>
            </Fade>
          </div>
        </Fade>

        {/* Decorative Background Elements */}
        <div className={styles.backgroundDecor}>
          <div className={styles.decorCircle} style={{ top: '10%', left: '5%' }}></div>
          <div className={styles.decorCircle} style={{ bottom: '15%', right: '8%' }}></div>
          <div className={styles.decorSquare} style={{ top: '60%', left: '10%' }}></div>
          <div className={styles.decorSquare} style={{ top: '20%', right: '12%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
