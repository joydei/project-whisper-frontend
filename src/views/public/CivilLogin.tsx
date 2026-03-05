import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/public/CivilLogin.module.css';

// Import SVG icons
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import AngleRightIcon from '../../assets/icons/angle-small-right.svg?react';
import PoliceIcon from '../../assets/icons/user-police.svg?react';
import FireIcon from '../../assets/icons/fire-station.svg?react';
import AmbulanceIcon from '../../assets/icons/ambulance.svg?react';
import FloodIcon from '../../assets/icons/house-flood.svg?react';
import HelicopterIcon from '../../assets/icons/helicopter-side.svg?react';
import BuildingIcon from '../../assets/icons/building.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';

type CivilService = 'police' | 'fire' | 'medical' | 'disaster' | 'rescue';
type AccountType = 'headquarters' | 'municipality';

interface ServiceOption {
  value: CivilService;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const CivilLogin = () => {
  const [selectedService, setSelectedService] = useState<CivilService>('police');
  const [accountType, setAccountType] = useState<AccountType>('headquarters');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const services: ServiceOption[] = [
    { value: 'police',   label: 'Police Service',       icon: PoliceIcon },
    { value: 'fire',     label: 'Fire Service',         icon: FireIcon },
    { value: 'medical',  label: 'Medical Emergency',    icon: AmbulanceIcon },
    { value: 'disaster', label: 'Disaster Management',  icon: FloodIcon },
    { value: 'rescue',   label: 'Rescue Operations',    icon: HelicopterIcon },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const serviceRoutes: Record<CivilService, string> = {
      police:   'police',
      fire:     'fire-service',
      medical:  'medical-emergency',
      disaster: 'disaster-management',
      rescue:   'rescue-operations',
    };

    const base = serviceRoutes[selectedService];
    const sub = accountType === 'headquarters' ? 'hq' : 'municipality';
    navigate(`/civil/${base}/${sub}/dashboard`);
    setIsLoading(false);
  };

  const selectedLabel = services.find(s => s.value === selectedService)?.label ?? '';

  return (
    <div className={styles.loginPage}>
      {/* ── Left branding panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>Aircho</h1>
          <p className={styles.brandTagline}>Civil Services Portal</p>
        </div>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Incident Management</strong>Track, dispatch, and resolve incidents from a single dashboard.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Municipality Coordination</strong>Collaborate with local authorities across all regions.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Real-time Analytics</strong>Monitor response times, resolution rates, and citizen satisfaction.</p>
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
              <p>Civil Services Portal</p>
            </div>

            {/* Step 1: Select Service */}
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Select your service</p>
              <div className={styles.servicesGrid}>
                {services.map(svc => {
                  const SvcIcon = svc.icon;
                  return (
                    <button
                      key={svc.value}
                      type="button"
                      className={`${styles.serviceCard} ${selectedService === svc.value ? styles.active : ''}`}
                      onClick={() => setSelectedService(svc.value)}
                    >
                      <SvcIcon className={styles.serviceIcon} />
                      <span className={styles.serviceLabel}>{svc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Account Type */}
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Account type</p>
              <div className={styles.accountGrid}>
                <button
                  type="button"
                  className={`${styles.accountCard} ${accountType === 'headquarters' ? styles.active : ''}`}
                  onClick={() => setAccountType('headquarters')}
                >
                  <BuildingIcon className={styles.accountIcon} />
                  <div className={styles.accountText}>
                    <span className={styles.accountLabel}>Headquarters</span>
                    <span className={styles.accountDesc}>National-level operations</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`${styles.accountCard} ${accountType === 'municipality' ? styles.active : ''}`}
                  onClick={() => setAccountType('municipality')}
                >
                  <GovernmentIcon className={styles.accountIcon} />
                  <div className={styles.accountText}>
                    <span className={styles.accountLabel}>Municipality</span>
                    <span className={styles.accountDesc}>Local-level operations</span>
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Login Form */}
            <p className={styles.formHeading}>Log in</p>
            <p className={styles.formSubheading}>
              {selectedLabel} — {accountType === 'headquarters' ? 'HQ' : 'Municipality'} account
            </p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="civil-email" className={styles.label}>
                  <EnvelopeIcon className={styles.labelIcon} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="civil-email"
                  className={styles.input}
                  placeholder="you@service.gov.gh"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="civil-password" className={styles.label}>
                  <KeyIcon className={styles.labelIcon} />
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="civil-password"
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
                    <span>Continue as {selectedLabel}</span>
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

export default CivilLogin;
