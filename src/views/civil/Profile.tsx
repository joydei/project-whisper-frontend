import { useState } from 'react';
import styles from '../../styles/civil/Profile.module.css';

const SERVICE_NAME = 'Ghana Police Service';

const Profile = () => {
  const [bio, setBio] = useState(
    'The Ghana Police Service is the main law enforcement agency in Ghana, responsible for the detection and prevention of crime, apprehension of offenders, and maintenance of public order and safety.'
  );

  const contacts = {
    phone: '+233 30 277 3906',
    email: 'info@police.gov.gh',
    website: 'police.gov.gh',
    address: 'Police Headquarters, Ring Road East, Accra',
  };

  const services = [
    'Crime Reporting & Investigation',
    'Traffic Management & Enforcement',
    'Community Policing',
    'Criminal Intelligence',
    'Missing Persons & Search',
    'Public Event Security',
  ];

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Public Profile</h1>
        <p className={styles.pageSubtitle}>Edit your service's public-facing profile visible to citizens</p>
      </div>

      <div className={styles.profileGrid}>
        {/* Profile Overview */}
        <div className={styles.card}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>🚓</div>
            <div>
              <h2 className={styles.serviceName}>{SERVICE_NAME}</h2>
              <p className={styles.serviceType}>Law Enforcement • National Service</p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Public Bio</label>
            <textarea
              className={styles.textarea}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>

          <button className={styles.saveBtn}>Save Changes</button>
        </div>

        {/* Contact Information */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactValue}>{contacts.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>{contacts.email}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Website</span>
              <span className={styles.contactValue}>{contacts.website}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Address</span>
              <span className={styles.contactValue}>{contacts.address}</span>
            </div>
          </div>
          <button className={styles.editBtn}>Edit Contact Info</button>
        </div>
      </div>

      {/* Services Offered */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Services Offered</h3>
        <div className={styles.servicesList}>
          {services.map((s, i) => (
            <div key={i} className={styles.serviceTag}>
              {s}
            </div>
          ))}
        </div>
        <button className={styles.editBtn}>Edit Services</button>
      </div>
    </div>
  );
};

export default Profile;
