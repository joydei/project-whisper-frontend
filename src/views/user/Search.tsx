import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/user/Search.module.css';
import PostFeed from '../../components/PostFeed';
import { municipalityPosts, ghanaPosts } from '../../data/postsData';
import { municipalityData } from '../../data/municipalityData';
import { civilServiceData } from '../../data/civilServiceData';
import { ministryData } from '../../data/ministryData';

// Import SVG icons
import SearchIcon from '../../assets/icons/search.svg?react';
import FilterIcon from '../../assets/icons/filter.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import ShieldIcon from '../../assets/icons/shield-check.svg?react';
import BuildingIcon from '../../assets/icons/building.svg?react';
import NewspaperIcon from '../../assets/icons/newspaper.svg?react';
import UsersIcon from '../../assets/icons/users.svg?react';
import XIcon from '../../assets/icons/cross-circle.svg?react';
import ChevronRightIcon from '../../assets/icons/angle-small-right.svg?react';
import ShieldTrustIcon from '../../assets/icons/shield-trust.svg?react';

type FilterType = 'all' | 'posts' | 'municipalities' | 'civil' | 'ministries';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const initialFilter = (searchParams.get('filter') as FilterType) || 'all';
  
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [inputValue, setInputValue] = useState(initialQuery);

  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (activeFilter !== 'all') params.set('filter', activeFilter);
    setSearchParams(params, { replace: true });
  }, [query, activeFilter, setSearchParams]);

  // Combined posts
  const allPosts = useMemo(() => [...municipalityPosts, ...ghanaPosts], []);

  // Search results
  const searchResults = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return { posts: [], municipalities: [], civilServices: [], ministries: [] };

    // Search posts
    const posts = allPosts.filter(post => 
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.name.toLowerCase().includes(lowerQuery) ||
      post.category?.toLowerCase().includes(lowerQuery) ||
      post.location?.toLowerCase().includes(lowerQuery)
    );

    // Search municipalities
    const municipalities = Object.values(municipalityData).filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.region.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      m.services.some(s => s.toLowerCase().includes(lowerQuery))
    );

    // Search civil services  
    const civilServices = Object.values(civilServiceData).filter(cs =>
      cs.name.toLowerCase().includes(lowerQuery) ||
      cs.type.toLowerCase().includes(lowerQuery) ||
      cs.description.toLowerCase().includes(lowerQuery) ||
      cs.services.some(s => s.toLowerCase().includes(lowerQuery))
    );

    // Search ministries
    const ministries = Object.values(ministryData).filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.abbreviation.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      m.services.some(s => s.toLowerCase().includes(lowerQuery))
    );

    return { posts, municipalities, civilServices, ministries };
  }, [query, allPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    setQuery('');
  };

  const totalResults = 
    searchResults.posts.length + 
    searchResults.municipalities.length + 
    searchResults.civilServices.length + 
    searchResults.ministries.length;

  const filters: { id: FilterType; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'All', icon: <FilterIcon />, count: totalResults },
    { id: 'posts', label: 'Posts', icon: <NewspaperIcon />, count: searchResults.posts.length },
    { id: 'municipalities', label: 'Municipalities', icon: <BuildingIcon />, count: searchResults.municipalities.length },
    { id: 'civil', label: 'Civil Services', icon: <ShieldIcon />, count: searchResults.civilServices.length },
    { id: 'ministries', label: 'Ministries', icon: <GovernmentIcon />, count: searchResults.ministries.length },
  ];

  return (
    <div className={styles.searchPage}>
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <div className={styles.container}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search posts, municipalities, civil services, ministries..."
                className={styles.searchInput}
                autoFocus
              />
              {inputValue && (
                <button type="button" onClick={handleClear} className={styles.clearBtn}>
                  <XIcon />
                </button>
              )}
            </div>
            <button type="submit" className={styles.searchBtn}>Search</button>
          </form>

          {/* Filters */}
          <div className={styles.filters}>
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                <span>{filter.label}</span>
                {query && <span className={styles.filterCount}>{filter.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className={styles.searchContent}>
        <div className={styles.container}>
          {!query ? (
            <div className={styles.emptyState}>
              <SearchIcon className={styles.emptyIcon} />
              <h2>Search Aircho</h2>
              <p>Find posts, municipalities, civil services, and ministries</p>
            </div>
          ) : totalResults === 0 ? (
            <div className={styles.emptyState}>
              <SearchIcon className={styles.emptyIcon} />
              <h2>No results found</h2>
              <p>Try different keywords or check your spelling</p>
            </div>
          ) : (
            <Fade cascade damping={0.05} triggerOnce>
              {/* Municipalities Results */}
              {(activeFilter === 'all' || activeFilter === 'municipalities') && 
               searchResults.municipalities.length > 0 && (
                <div className={styles.resultSection}>
                  <div className={styles.sectionHeader}>
                    <BuildingIcon className={styles.sectionIcon} />
                    <h3>Municipalities</h3>
                    <span className={styles.resultCount}>{searchResults.municipalities.length}</span>
                  </div>
                  <div className={styles.cardGrid}>
                    {searchResults.municipalities.map(municipality => (
                      <div
                        key={municipality.slug}
                        className={styles.resultCard}
                        onClick={() => navigate(`/municipality/${municipality.slug}`)}
                      >
                        <div className={styles.cardIcon} style={{ backgroundColor: '#2d5a27' }}>
                          <BuildingIcon />
                        </div>
                        <div className={styles.cardContent}>
                          <h4>{municipality.name}</h4>
                          <p className={styles.cardMeta}>{municipality.region}</p>
                          <p className={styles.cardDesc}>{municipality.description.substring(0, 100)}...</p>
                        </div>
                        <ChevronRightIcon className={styles.cardArrow} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Civil Services Results */}
              {(activeFilter === 'all' || activeFilter === 'civil') && 
               searchResults.civilServices.length > 0 && (
                <div className={styles.resultSection}>
                  <div className={styles.sectionHeader}>
                    <ShieldIcon className={styles.sectionIcon} />
                    <h3>Civil Services</h3>
                    <span className={styles.resultCount}>{searchResults.civilServices.length}</span>
                  </div>
                  <div className={styles.cardGrid}>
                    {searchResults.civilServices.map(service => (
                      <div
                        key={service.slug}
                        className={styles.resultCard}
                        onClick={() => navigate(`/civil/${service.slug}`)}
                      >
                        <div className={styles.cardIcon} style={{ backgroundColor: service.coverColor }}>
                          <ShieldTrustIcon />
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <h4>{service.name}</h4>
                            <span className={styles.verifiedBadge}>
                              <ShieldTrustIcon />
                            </span>
                          </div>
                          <p className={styles.cardMeta}>{service.type}</p>
                          <p className={styles.cardDesc}>{service.tagline}</p>
                        </div>
                        <ChevronRightIcon className={styles.cardArrow} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ministries Results */}
              {(activeFilter === 'all' || activeFilter === 'ministries') && 
               searchResults.ministries.length > 0 && (
                <div className={styles.resultSection}>
                  <div className={styles.sectionHeader}>
                    <GovernmentIcon className={styles.sectionIcon} />
                    <h3>Ministries</h3>
                    <span className={styles.resultCount}>{searchResults.ministries.length}</span>
                  </div>
                  <div className={styles.cardGrid}>
                    {searchResults.ministries.map(ministry => (
                      <div
                        key={ministry.slug}
                        className={styles.resultCard}
                        onClick={() => navigate(`/ministry/${ministry.slug}`)}
                      >
                        <div className={styles.cardIcon} style={{ backgroundColor: ministry.coverColor }}>
                          <GovernmentIcon />
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <h4>{ministry.name}</h4>
                            <span className={styles.verifiedBadge}>
                              <ShieldTrustIcon />
                            </span>
                          </div>
                          <p className={styles.cardMeta}>{ministry.abbreviation} • National</p>
                          <p className={styles.cardDesc}>{ministry.tagline}</p>
                        </div>
                        <ChevronRightIcon className={styles.cardArrow} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {(activeFilter === 'all' || activeFilter === 'posts') && 
               searchResults.posts.length > 0 && (
                <div className={styles.resultSection}>
                  <div className={styles.sectionHeader}>
                    <NewspaperIcon className={styles.sectionIcon} />
                    <h3>Posts</h3>
                    <span className={styles.resultCount}>{searchResults.posts.length}</span>
                  </div>
                  <div className={styles.postsResults}>
                    <PostFeed posts={searchResults.posts} />
                  </div>
                </div>
              )}
            </Fade>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
