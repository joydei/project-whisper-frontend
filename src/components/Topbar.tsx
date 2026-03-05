import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Topbar.module.css";
import logo from "../assets/imaginary-station.png";
import { useTheme } from "../context/ThemeContext";
import LightbulbIcon from "../assets/icons/lightbulb-on.svg?react";
import MoonStarsIcon from "../assets/icons/moon-stars.svg?react";

const SERVICE_NAMES: Record<string, string> = {
  police: 'Ghana Police Service',
  'fire-service': 'Ghana National Fire Service',
  'medical-emergency': 'National Ambulance Service',
  'disaster-management': 'National Disaster Management Organization',
  'rescue-operations': 'National Rescue Operations',
};

const TopBar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Derive civil service label from URL if on a civil route
  const segments = location.pathname.split('/').filter(Boolean);
  const isCivilRoute = segments[0] === 'civil';
  const isMunicipalityRoute = segments[0] === 'municipality';
  const serviceSlug = segments[1] || '';
  const accountType = segments[2] || '';

  let centerLabel: string | null = null;
  if (isCivilRoute) {
    centerLabel = `${SERVICE_NAMES[serviceSlug] ?? 'Civil Service'}${accountType ? ` — ${accountType === 'municipality' ? 'Municipality' : 'HQ'}` : ''}`;
  } else if (isMunicipalityRoute) {
    centerLabel = 'Accra Metropolitan Assembly';
  }

  const languages = [
    'English',
    'French',
    'Ewe',
    'Twi',
    'Ga',
    'Dagbani',
    'Hausa',
    'Fante',
    'Dagaare',
    'Nzema'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <span>Powered by</span>
        <img src={logo} alt="Imaginary Station" className={styles.logo} />
      </div>

      {centerLabel && (
        <div className={styles.civilLabel}>{centerLabel}</div>
      )}
      <ul className={styles.right}>
        <li>
          <Link to="/help" className={styles.topBarLink}>
            Help
          </Link>
        </li>
        <li>
          <Link to="/join-us" className={styles.topBarLink}>
            Join Us
          </Link>
        </li>
        <li
          ref={dropdownRef}
          className={styles.languageSelector}
        >
          <div 
            className={styles.languageButton}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            {selectedLanguage} ▼
          </div>
          {showLanguageDropdown && (
            <div className={styles.languageDropdown}>
              {languages.map((language) => (
                <div
                  key={language}
                  className={`${styles.languageOption} ${selectedLanguage === language ? styles.selected : ''}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          )}
        </li>
        <li>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <LightbulbIcon className={styles.themeIcon} />
            ) : (
              <MoonStarsIcon className={styles.themeIcon} />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;