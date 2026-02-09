import { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/components/Navbar.module.css';
import { municipalityData } from '../data/municipalityData';
import { civilServiceData } from '../data/civilServiceData';
import { ministryData } from '../data/ministryData';

// Import SVG icons
import HomeIcon from '../assets/icons/home.svg?react';
import MegaphoneIcon from '../assets/icons/megaphone-sound-waves.svg?react';
import InboxIcon from '../assets/icons/inbox-full.svg?react';
import BellIcon from '../assets/icons/bell.svg?react';
import UserIcon from '../assets/icons/circle-user.svg?react';
import SearchIcon from '../assets/icons/search.svg?react';
import MessagesIcon from '../assets/icons/messages.svg?react';
import BuildingIcon from '../assets/icons/building.svg?react';
import ShieldIcon from '../assets/icons/shield-check.svg?react';
import GovernmentIcon from '../assets/icons/government-flag.svg?react';
import ShieldTrustIcon from '../assets/icons/shield-trust.svg?react';
import ChevronRightIcon from '../assets/icons/angle-small-right.svg?react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMessagesActive = location.pathname.startsWith('/messages');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search results
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query || query.length < 2) return { municipalities: [], civilServices: [], ministries: [] };

    const municipalities = Object.values(municipalityData)
      .filter(m => m.name.toLowerCase().includes(query) || m.region.toLowerCase().includes(query))
      .slice(0, 3);

    const civilServices = Object.values(civilServiceData)
      .filter(cs => cs.name.toLowerCase().includes(query) || cs.type.toLowerCase().includes(query))
      .slice(0, 3);

    const ministries = Object.values(ministryData)
      .filter(m => m.name.toLowerCase().includes(query) || m.abbreviation.toLowerCase().includes(query))
      .slice(0, 3);

    return { municipalities, civilServices, ministries };
  }, [searchQuery]);

  const hasResults = searchResults.municipalities.length > 0 || 
                      searchResults.civilServices.length > 0 || 
                      searchResults.ministries.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show dropdown when typing
  useEffect(() => {
    if (isFocused && searchQuery.length >= 2) {
      setShowDropdown(true);
    } else if (searchQuery.length < 2) {
      setShowDropdown(false);
    }
  }, [searchQuery, isFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>Aircho</h1>
          </Link>
        </div>
        <div className={styles.searchBar} ref={searchRef}>
          <form onSubmit={handleSearch}>
            <SearchIcon className={styles.searchIcon} />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search for updates, reports, or topics..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </form>
          
          {/* Search Dropdown */}
          {showDropdown && (
            <div className={styles.searchDropdown}>
              {!hasResults && searchQuery.length >= 2 ? (
                <div className={styles.noResults}>
                  <p>No results found for "{searchQuery}"</p>
                  <button onClick={handleViewAll} className={styles.viewAllBtn}>
                    Search all content
                    <ChevronRightIcon />
                  </button>
                </div>
              ) : (
                <>
                  {/* Municipalities */}
                  {searchResults.municipalities.length > 0 && (
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownHeader}>
                        <BuildingIcon />
                        <span>Municipalities</span>
                      </div>
                      {searchResults.municipalities.map(m => (
                        <div 
                          key={m.slug} 
                          className={styles.dropdownItem}
                          onClick={() => handleResultClick(`/municipality/${m.slug}`)}
                        >
                          <div className={styles.dropdownIcon} style={{ backgroundColor: '#2d5a27' }}>
                            <BuildingIcon />
                          </div>
                          <div className={styles.dropdownInfo}>
                            <span className={styles.dropdownName}>{m.name}</span>
                            <span className={styles.dropdownMeta}>{m.region}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Civil Services */}
                  {searchResults.civilServices.length > 0 && (
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownHeader}>
                        <ShieldIcon />
                        <span>Civil Services</span>
                      </div>
                      {searchResults.civilServices.map(cs => (
                        <div 
                          key={cs.slug} 
                          className={styles.dropdownItem}
                          onClick={() => handleResultClick(`/civil/${cs.slug}`)}
                        >
                          <div className={styles.dropdownIcon} style={{ backgroundColor: cs.coverColor }}>
                            <ShieldTrustIcon />
                          </div>
                          <div className={styles.dropdownInfo}>
                            <span className={styles.dropdownName}>{cs.name}</span>
                            <span className={styles.dropdownMeta}>{cs.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ministries */}
                  {searchResults.ministries.length > 0 && (
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownHeader}>
                        <GovernmentIcon />
                        <span>Ministries</span>
                      </div>
                      {searchResults.ministries.map(m => (
                        <div 
                          key={m.slug} 
                          className={styles.dropdownItem}
                          onClick={() => handleResultClick(`/ministry/${m.slug}`)}
                        >
                          <div className={styles.dropdownIcon} style={{ backgroundColor: m.coverColor }}>
                            <GovernmentIcon />
                          </div>
                          <div className={styles.dropdownInfo}>
                            <span className={styles.dropdownName}>{m.name}</span>
                            <span className={styles.dropdownMeta}>{m.abbreviation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View All Button */}
                  {hasResults && (
                    <button onClick={handleViewAll} className={styles.viewAllBtn}>
                      View all results for "{searchQuery}"
                      <ChevronRightIcon />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} end>
            <HomeIcon className={styles.icon} />
            Home
          </NavLink>
          <NavLink to="/voice-out" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <MegaphoneIcon className={styles.icon} />
            Voice Out
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <InboxIcon className={styles.icon} />
            Inbox
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <BellIcon className={styles.icon} />
            Notifications
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <UserIcon className={styles.icon} />
            Profile
          </NavLink>
        </nav>
        <Link to="/messages" className={`${styles.messagesCta} ${isMessagesActive ? styles.messagesCtaActive : ''}`}>
          <MessagesIcon className={styles.messagesCtaIcon} />
          <span className={styles.messagesCtaPulse} />
        </Link>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;