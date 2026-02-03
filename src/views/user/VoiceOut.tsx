import styles from '../../styles/user/VoiceOut.module.css';

const VoiceOut = () => {
  return (
    <div className={styles.voiceOutPage}>
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Voice Out</h1>
          <p className={styles.pageSubtitle}>Share your concerns and suggestions with your municipality</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit Your Feedback</h2>
            
            <form className={styles.form}>
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
                <button type="submit" className={styles.submitBtn}>Submit Feedback</button>
              </div>
            </form>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>📢 How It Works</h3>
              <ul className={styles.infoList}>
                <li>Select the appropriate category for your concern</li>
                <li>Provide detailed information and location</li>
                <li>Attach any relevant photos or documents</li>
                <li>Submit and track your feedback status</li>
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
