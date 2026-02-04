import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/Topbar.module.css";
import logo from "../assets/imaginary-station.png";

const TopBar = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const dropdownRef = useRef<HTMLLIElement>(null);

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
      </ul>
    </div>
  );
};

export default TopBar;