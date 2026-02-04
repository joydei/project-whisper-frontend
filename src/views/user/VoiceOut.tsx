import { useState, type FormEvent } from 'react';
import styles from '../../styles/user/VoiceOut.module.css';

// Import SVG icons
import SirenIcon from '../../assets/icons/siren-on.svg?react';
import MegaphoneIcon from '../../assets/icons/megaphone-sound-waves.svg?react';
import ShieldIcon from '../../assets/icons/shield-check.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import ClipFileIcon from '../../assets/icons/clip-file.svg?react';
import DescriptionIcon from '../../assets/icons/description-alt.svg?react';
import BooksIcon from '../../assets/icons/books.svg?react';
import GovernmentIcon from '../../assets/icons/government-flag.svg?react';
import LightbulbIcon from '../../assets/icons/lightbulb-on.svg?react';
import PriorityIcon from '../../assets/icons/priority-arrows.svg?react';

interface FormData {
  category: string;
  location: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  anonymous: boolean;
  attachments: File[];
}

const VoiceOut = () => {
  const [reportType, setReportType] = useState<'municipality' | 'civil'>('municipality');
  const [formData, setFormData] = useState<FormData>({
    category: '',
    location: '',
    subject: '',
    description: '',
    priority: 'medium',
    anonymous: false,
    attachments: []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, attachments: `${file.name} exceeds 5MB limit` }));
        return false;
      }
      return true;
    });
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Submitting report:', {
        reportType,
        ...formData
      });
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          category: '',
          location: '',
          subject: '',
          description: '',
          priority: 'medium',
          anonymous: false,
          attachments: []
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors({ category: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      setFormData({
        category: '',
        location: '',
        subject: '',
        description: '',
        priority: 'medium',
        anonymous: false,
        attachments: []
      });
      setErrors({});
    }
  };

  const handleReportTypeChange = (type: 'municipality' | 'civil') => {
    setReportType(type);
    setFormData(prev => ({ ...prev, category: '', priority: 'medium' }));
    setErrors({});
  };

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
                type="button"
                className={`${styles.typeBtn} ${reportType === 'municipality' ? styles.active : ''}`}
                onClick={() => handleReportTypeChange('municipality')}
              >
                <GovernmentIcon className={styles.typeBtnIcon} />
                <div>
                  <h4>Municipality</h4>
                  <p>Infrastructure, sanitation, utilities</p>
                </div>
              </button>
              <button 
                type="button"
                className={`${styles.typeBtn} ${reportType === 'civil' ? styles.active : ''}`}
                onClick={() => handleReportTypeChange('civil')}
              >
                <SirenIcon className={styles.typeBtnIcon} />
                <div>
                  <h4>Civil Services</h4>
                  <p>Police, fire service, ambulance</p>
                </div>
              </button>
            </div>

            {submitSuccess && (
              <div className={styles.successMessage}>
                <ShieldIcon className={styles.successIcon} />
                <p>Your report has been submitted successfully! We'll notify you once it's reviewed.</p>
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              {reportType === 'municipality' ? (
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    <GovernmentIcon className={styles.labelIcon} />
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="category" 
                    name="category"
                    className={`${styles.select} ${errors.category ? styles.error : ''}`}
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="infrastructure">Infrastructure (Roads, Buildings)</option>
                    <option value="sanitation">Sanitation & Cleanliness</option>
                    <option value="safety">Public Safety</option>
                    <option value="utilities">Utilities (Water, Electricity)</option>
                    <option value="environment">Environment & Parks</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    <SirenIcon className={styles.labelIcon} />
                    Service Type <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="category" 
                    name="category"
                    className={`${styles.select} ${errors.category ? styles.error : ''}`}
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="police">Police Assistance</option>
                    <option value="fire">Fire Service</option>
                    <option value="ambulance">Ambulance/Medical Emergency</option>
                    <option value="disaster">Disaster Management</option>
                    <option value="rescue">Rescue Operations</option>
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>
                  <MarkerIcon className={styles.labelIcon} />
                  Location <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`${styles.input} ${errors.location ? styles.error : ''}`}
                  placeholder="Enter location or address"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {errors.location && <span className={styles.errorText}>{errors.location}</span>}
                <p className={styles.hint}>Be as specific as possible (street name, landmark, area)</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  <BooksIcon className={styles.labelIcon} />
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={handleInputChange}
                  maxLength={100}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                <p className={styles.hint}>{formData.subject.length}/100 characters</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  <DescriptionIcon className={styles.labelIcon} />
                  Description <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                  rows={6}
                  placeholder="Provide detailed information about your concern... (minimum 20 characters)"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={1000}
                ></textarea>
                {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                <p className={styles.hint}>{formData.description.length}/1000 characters</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>
                  <PriorityIcon className={styles.labelIcon} />
                  Priority Level
                </label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="low"
                      checked={formData.priority === 'low'}
                      onChange={handleInputChange}
                    />
                    <span>Low</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="medium"
                      checked={formData.priority === 'medium'}
                      onChange={handleInputChange}
                    />
                    <span>Medium</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="high"
                      checked={formData.priority === 'high'}
                      onChange={handleInputChange}
                    />
                    <span>High</span>
                  </label>
                  {reportType === 'civil' && (
                    <label className={styles.radioLabel}>
                      <input 
                        type="radio" 
                        name="priority" 
                        value="emergency"
                        checked={formData.priority === 'emergency'}
                        onChange={handleInputChange}
                      />
                      <span className={styles.emergency}>Emergency</span>
                    </label>
                  )}
                </div>
                {reportType === 'civil' && formData.priority === 'emergency' && (
                  <div className={styles.emergencyAlert}>
                    <SirenIcon className={styles.emergencyIcon} />
                    <p>For life-threatening emergencies, please call emergency services directly.</p>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                  />
                  <span>Submit anonymously</span>
                </label>
                <p className={styles.hint}>Your identity will be hidden from public view</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="attachment" className={styles.label}>
                  <ClipFileIcon className={styles.labelIcon} />
                  Attachments (Optional)
                </label>
                <input
                  type="file"
                  id="attachment"
                  className={styles.fileInput}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <p className={styles.hint}>You can upload images or documents (Max 5MB per file)</p>
                {errors.attachments && <span className={styles.errorText}>{errors.attachments}</span>}
                
                {formData.attachments.length > 0 && (
                  <div className={styles.attachmentList}>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className={styles.attachmentItem}>
                        <ClipFileIcon className={styles.attachmentIcon} />
                        <span className={styles.attachmentName}>{file.name}</span>
                        <span className={styles.attachmentSize}>
                          ({(file.size / 1024).toFixed(1)}KB)
                        </span>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeAttachment(index)}
                          aria-label="Remove attachment"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <MegaphoneIcon className={styles.infoIcon} />
                How It Works
              </h3>
              <ul className={styles.infoList}>
                <li>Choose between Municipality or Civil Services</li>
                <li>Select the appropriate category</li>
                <li>Provide detailed information and location</li>
                <li>Attach any relevant photos or documents</li>
                <li>Submit and track your report status</li>
                <li>Receive updates via notifications</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <h3 className={styles.tipTitle}>
                <LightbulbIcon className={styles.tipIcon} />
                Tips for Better Reports
              </h3>
              <ul className={styles.infoList}>
                <li>Be specific about the location</li>
                <li>Include clear photos if possible</li>
                <li>Describe the issue in detail</li>
                <li>Set appropriate priority level</li>
                <li>Check for duplicate reports</li>
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
