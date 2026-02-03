import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/public/Login.module.css';

type UserRole = 'user' | 'municipality' | 'civil' | 'admin';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
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
  };

  const roles = [
    { value: 'user' as UserRole, label: 'Citizen', icon: '👤', description: 'Report issues to your municipality' },
    { value: 'municipality' as UserRole, label: 'Municipality', icon: '🏛️', description: 'Manage reports and services' },
    { value: 'civil' as UserRole, label: 'Civil Services', icon: '🚨', description: 'Emergency response management' },
    { value: 'admin' as UserRole, label: 'Admin', icon: '⚙️', description: 'System administration' },
  ];

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.logo}>Aircho</h1>
            <p className={styles.tagline}>Connecting Communities with Services</p>
          </div>

          <div className={styles.roleSelector}>
            <h2 className={styles.sectionTitle}>Select Your Role</h2>
            <div className={styles.rolesGrid}>
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  className={`${styles.roleCard} ${selectedRole === role.value ? styles.active : ''}`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <span className={styles.roleIcon}>{role.icon}</span>
                  <span className={styles.roleLabel}>{role.label}</span>
                  <span className={styles.roleDescription}>{role.description}</span>
                </button>
              ))}
            </div>
          </div>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
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
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formFooter}>
              <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Login as {roles.find(r => r.value === selectedRole)?.label}
            </button>
          </form>

          <div className={styles.signupPrompt}>
            <p>Don't have an account? <a href="#" className={styles.signupLink}>Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
