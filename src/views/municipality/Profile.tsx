import { useState } from 'react';
import styles from '../../styles/municipality/Profile.module.css';

const MunicipalityProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: 'Accra Metropolitan Assembly',
    slug: 'accra-metropolitan-assembly',
    description: 'The Accra Metropolitan Assembly is the political and administrative authority for the city of Accra, the capital of Ghana. We are committed to providing quality services and improving the lives of our citizens.',
    region: 'Greater Accra',
    district: 'Accra Metropolis',
    population: '2,557,000',
    phone: '+233 302 123 456',
    email: 'info@accra-metro.gov.gh',
    website: 'https://ama.gov.gh',
    address: 'P.O. Box 385, Accra',
    officeHours: 'Monday – Friday, 8:00 AM – 5:00 PM',
    services: [
      'Waste Management',
      'Road Maintenance',
      'Street Lighting',
      'Market Management',
      'Building Permits',
      'Birth & Death Registry',
    ],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Municipality Profile</h1>
          <p className={styles.pageSubtitle}>Manage your public-facing profile information</p>
        </div>
        <button
          className={styles.editBtn}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Preview */}
      <div className={styles.profileCard}>
        <div className={styles.profileBanner}>
          <div className={styles.profileAvatar}>AMA</div>
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{profile.name}</h2>
          <p className={styles.profileRegion}>{profile.region} • {profile.district}</p>
          <p className={styles.profileDescription}>{profile.description}</p>
        </div>
      </div>

      {/* Details Form */}
      <div className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <h3 className={styles.cardTitle}>General Information</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>Assembly Name</label>
            <input
              type="text"
              className={styles.input}
              value={profile.name}
              disabled={!isEditing}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={profile.description}
              disabled={!isEditing}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Region</label>
              <input
                type="text"
                className={styles.input}
                value={profile.region}
                disabled={!isEditing}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Population</label>
              <input
                type="text"
                className={styles.input}
                value={profile.population}
                disabled={!isEditing}
                onChange={(e) => handleChange('population', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.detailCard}>
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="text"
              className={styles.input}
              value={profile.phone}
              disabled={!isEditing}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={profile.email}
              disabled={!isEditing}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Website</label>
            <input
              type="url"
              className={styles.input}
              value={profile.website}
              disabled={!isEditing}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Office Hours</label>
            <input
              type="text"
              className={styles.input}
              value={profile.officeHours}
              disabled={!isEditing}
              onChange={(e) => handleChange('officeHours', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={styles.detailCard}>
        <h3 className={styles.cardTitle}>Services Offered</h3>
        <div className={styles.servicesList}>
          {profile.services.map((service, i) => (
            <span key={i} className={styles.serviceTag}>{service}</span>
          ))}
          {isEditing && (
            <button className={styles.addServiceBtn}>+ Add Service</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MunicipalityProfileEdit;
