import { useState } from 'react';
import styles from '../../styles/user/VoiceOut.module.css';

const VoiceOut = () => {
  const [reportType, setReportType] = useState<'municipality' | 'civil'>('municipality');

  return (
    <div className={styles.voiceOutPage}>
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Voice Out</h1>
          <p className={styles.pageSubtitle}>Share your concerns and make your voice heard</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit Your Report</h2>
            
            {/* Report Type Selection */}
            <div className={styles.reportTypeSelection}>
              <button 
                className={`${styles.typeBtn} ${reportType === 'municipality' ? styles.active : ''}`}
                onClick={() => setReportType('municipality')}
              >
                <span className={styles.typeBtnIcon}>🏛️</span>
                <div>
                  <h4>Municipality</h4>
                  <p>Infrastructure, sanitation, utilities</p>
                </div>
              </button>
              <button 
                className={`${styles.typeBtn} ${reportType === 'civil' ? styles.active : ''}`}
                onClick={() => setReportType('civil')}
              >
                <span className={styles.typeBtnIcon}>🚨</span>
                <div>
                  <h4>Civil Services</h4>
                  <p>Police, fire service, ambulance</p>
                </div>
              </button>
            </div>

            <form className={styles.form}>
              {reportType === 'municipality' ? (
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>Category</label>
                  <select id="category" className={styles.select}>
                    <option value="">Select a category</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="safety">Safety</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label htmlFor="civilService" className={styles.label}>Service Type</label>
                  <select id="civilService" className={styles.select}>
                    <option value="">Select a service</option>
                    <option value="police">🚓 Police</option>
                    <option value="fire">🚒 Fire Service</option>
                    <option value="ambulance">🚑 Ambulance Service</option>
                    <option value="disaster">⚠️ Disaster Management</option>
                  </select>
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>Location</label>
                <input
                  type="text"
                  id="location"
                  className={styles.input}
                  placeholder="Enter location or address"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  className={styles.input}
                  placeholder="Brief description of the issue"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                  id="description"
                  className={styles.textarea}
                  rows={6}
                  placeholder="Provide detailed information about your concern..."
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>Priority Level</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="priority" value="low" />
                    <span>Low</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="priority" value="medium" defaultChecked />
                    <span>Medium</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="priority" value="high" />
                    <span>High</span>
                  </label>
                  {reportType === 'civil' && (
                    <label className={styles.radioLabel}>
                      <input type="radio" name="priority" value="emergency" />
                      <span className={styles.emergency}>Emergency</span>
                    </label>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="attachment" className={styles.label}>Attachments (Optional)</label>
                <input
                  type="file"
                  id="attachment"
                  className={styles.fileInput}
                  multiple
                />
                <p className={styles.hint}>You can upload images or documents (Max 5MB)</p>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Submit Report</button>
              </div>
            </form>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>📢 How It Works</h3>
              <ul className={styles.infoList}>
                <li>Choose between Municipality or Civil Services</li>
                <li>Select the appropriate category</li>
                <li>Provide detailed information and location</li>
                <li>Attach any relevant photos or documents</li>
                <li>Submit and track your report status</li>
              </ul>
            </div>

            <div className={styles.statsCard}>
              <h3 className={styles.statsTitle}>Your Activity</h3>
              <div className={styles.stat}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Total Submissions</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>8</span>
                <span className={styles.statLabel}>Resolved</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoiceOut;
