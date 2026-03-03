import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from '../../styles/public/Signup.module.css';

// Import SVG icons
import UserCheckIcon from '../../assets/icons/user-check.svg?react';
import EnvelopeIcon from '../../assets/icons/envelope.svg?react';
import KeyIcon from '../../assets/icons/key.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import PhoneIcon from '../../assets/icons/phone-call.svg?react';
import MarkerIcon from '../../assets/icons/marker.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import AngleRightIcon from '../../assets/icons/angle-small-right.svg?react';
import BuildingIcon from '../../assets/icons/building-foundation.svg?react';

// ── Ghana Regions & Municipalities ──────────────────────────────
const ghanaRegions: Record<string, string[]> = {
  'Greater Accra': [
    'Accra Metropolitan',
    'Tema Metropolitan',
    'Ga East Municipal',
    'Ga West Municipal',
    'Ga Central Municipal',
    'Ga South Municipal',
    'Ledzokuku Municipal',
    'Krowor Municipal',
    'Adentan Municipal',
    'Ashaiman Municipal',
    'Shai-Osudoku District',
    'Ningo-Prampram District',
    'Ada East District',
    'Ada West District',
    'Dangme West District',
  ],
  'Ashanti': [
    'Kumasi Metropolitan',
    'Obuasi Municipal',
    'Ejisu Municipal',
    'Asante Akim Central Municipal',
    'Asante Akim North District',
    'Asante Akim South Municipal',
    'Bekwai Municipal',
    'Bosomtwe District',
    'Kwabre East District',
    'Mampong Municipal',
    'Offinso Municipal',
    'Offinso North District',
    'Sekyere Central District',
    'Sekyere East District',
    'Sekyere Kumawu District',
    'Atwima Kwanwoma District',
    'Atwima Mponua District',
    'Atwima Nwabiagya Municipal',
  ],
  'Western': [
    'Sekondi-Takoradi Metropolitan',
    'Ahanta West Municipal',
    'Effia-Kwesimintsim Municipal',
    'Mpohor District',
    'Nzema East Municipal',
    'Jomoro Municipal',
    'Ellembelle District',
    'Prestea Huni-Valley Municipal',
    'Tarkwa-Nsuaem Municipal',
    'Wassa Amenfi Central Municipal',
    'Wassa Amenfi East Municipal',
    'Wassa Amenfi West Municipal',
    'Wassa East District',
  ],
  'Western North': [
    'Juaboso District',
    'Bia East District',
    'Bia West District',
    'Bibiani-Anhwiaso-Bekwai Municipal',
    'Bodi District',
    'Sefwi Akontombra District',
    'Sefwi Wiawso Municipal',
    'Sefwi Wiawso District',
  ],
  'Central': [
    'Cape Coast Metropolitan',
    'Assin Central Municipal',
    'Assin North District',
    'Assin South District',
    'Ekumfi District',
    'Gomoa Central District',
    'Gomoa East District',
    'Gomoa West District',
    'Mfantsiman Municipal',
    'Twifo Atti-Morkwa District',
    'Twifo Praso',
    'Agona East District',
    'Agona West Municipal',
    'Ajumako-Enyan-Essiam District',
    'Abura-Asebu-Kwamankese District',
    'Komenda-Edina-Eguafo-Abrem Municipal',
  ],
  'Eastern': [
    'New Juaben Municipal',
    'Koforidua',
    'Birim Central Municipal',
    'Akuapim North Municipal',
    'Akuapim South District',
    'Fanteakwa North District',
    'Fanteakwa South District',
    'Kwahu East District',
    'Kwahu South District',
    'Kwahu West Municipal',
    'East Akim Municipal',
    'Lower Manya Krobo Municipal',
    'Upper Manya Krobo District',
    'Upper West Akim District',
    'West Akim Municipal',
    'Yilo Krobo Municipal',
  ],
  'Volta': [
    'Ho Municipal',
    'Hohoe Municipal',
    'Keta Municipal',
    'Kpando Municipal',
    'Agotime-Ziope District',
    'Akatsi North District',
    'Akatsi South District',
    'Anloga District',
    'Central Tongu District',
    'Adaklu District',
    'Afadjato South District',
    'Biakoye District',
    'Kpando District',
    'North Dayi District',
    'North Tongu District',
    'South Dayi District',
    'South Tongu District',
  ],
  'Oti': [
    'Krachi East Municipal',
    'Krachi Nchumuru District',
    'Krachi West District',
    'Nkwanta North District',
    'Nkwanta South Municipal',
    'Biakoye District',
    'Jasikan District',
    'Kadjebi District',
  ],
  'Bono': [
    'Sunyani Municipal',
    'Berekum Municipal',
    'Dormaa Central Municipal',
    'Dormaa East District',
    'Dormaa West District',
    'Jaman North District',
    'Jaman South Municipal',
    'Tain District',
    'Wenchi Municipal',
  ],
  'Bono East': [
    'Techiman Municipal',
    'Atebubu-Amantin Municipal',
    'Kintampo North Municipal',
    'Kintampo South District',
    'Nkoranza North District',
    'Nkoranza South Municipal',
    'Pru East District',
    'Pru West District',
    'Sene East District',
    'Sene West District',
    'Techiman North District',
  ],
  'Ahafo': [
    'Asunafo North Municipal',
    'Asunafo South District',
    'Asutifi North District',
    'Asutifi South District',
    'Tano North Municipal',
    'Tano South Municipal',
  ],
  'Northern': [
    'Tamale Metropolitan',
    'Sagnarigu Municipal',
    'Gushegu Municipal',
    'Karaga District',
    'Kpandai District',
    'Mion District',
    'Nanumba North Municipal',
    'Nanumba South District',
    'Nanton District',
    'Saboba District',
    'Savelugu Municipal',
    'Tolon District',
    'Yendi Municipal',
    'Zabzugu District',
    'Central Gonja District',
  ],
  'Savannah': [
    'Sawla-Tuna-Kalba District',
    'Bole District',
    'Central Gonja District',
    'East Gonja Municipal',
    'North East Gonja District',
    'North Gonja District',
    'West Gonja Municipal',
  ],
  'North East': [
    'Chereponi District',
    'East Mamprusi Municipal',
    'Mamprugu Moagduri District',
    'Nalerigu-Gambaga',
    'West Mamprusi Municipal',
  ],
  'Upper East': [
    'Bolgatanga Municipal',
    'Bawku Municipal',
    'Bawku West District',
    'Binduri District',
    'Bolgatanga East District',
    'Builsa North Municipal',
    'Builsa South District',
    'Garu District',
    'Kassena-Nankana Municipal',
    'Kassena-Nankana West District',
    'Nabdam District',
    'Pusiga District',
    'Talensi District',
    'Tempane District',
  ],
  'Upper West': [
    'Wa Municipal',
    'Daffiama-Bussie-Issa District',
    'Jirapa Municipal',
    'Lambussie-Karni District',
    'Lawra Municipal',
    'Nadowli-Kaleo District',
    'Nandom Municipal',
    'Sisala East Municipal',
    'Sisala West District',
    'Sissala West District',
    'Wa East District',
    'Wa West District',
  ],
};

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  region: string;
  municipality: string;
  password: string;
  confirmPassword: string;
}

type FormField = keyof FormData;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    region: '',
    municipality: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const regionNames = Object.keys(ghanaRegions).sort();
  const municipalities = formData.region ? ghanaRegions[formData.region] : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset municipality when region changes
      ...(name === 'region' ? { municipality: '' } : {}),
    }));
    if (errors[name as FormField]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<FormField, string>> = {};

    if (!formData.firstName.trim())       newErrors.firstName    = 'First name is required.';
    if (!formData.lastName.trim())        newErrors.lastName     = 'Last name is required.';
    if (!formData.dateOfBirth)            newErrors.dateOfBirth  = 'Date of birth is required.';
    else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
      if (actualAge < 13)  newErrors.dateOfBirth = 'You must be at least 13 years old.';
      if (dob > today)     newErrors.dateOfBirth = 'Date of birth cannot be in the future.';
    }
    if (!formData.phone.trim())           newErrors.phone        = 'Phone number is required.';
    else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone))
                                          newErrors.phone        = 'Enter a valid phone number.';
    if (!formData.email.trim())           newErrors.email        = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                          newErrors.email        = 'Enter a valid email address.';
    if (!formData.region)                 newErrors.region       = 'Please select your region.';
    if (!formData.municipality)           newErrors.municipality = 'Please select your municipality.';
    if (!formData.password)               newErrors.password     = 'Password is required.';
    else if (formData.password.length < 8)
                                          newErrors.password     = 'Password must be at least 8 characters.';
    if (!formData.confirmPassword)        newErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword)
                                          newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className={styles.signupPage}>
      {/* ── Left form panel ── */}
      <div className={styles.rightPanel}>
        <Fade duration={500} triggerOnce>
          <div className={styles.signupCard}>
            {/* Mobile-only brand */}
            <div className={styles.mobileBrand}>
              <h1>Aircho</h1>
              <p>Connecting Communities with Services</p>
            </div>

            <p className={styles.formHeading}>Create an account</p>
            <p className={styles.formSubheading}>Join Aircho and make your voice heard</p>

            <form className={styles.signupForm} onSubmit={handleSubmit} noValidate>

              {/* Name row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    <UserCheckIcon className={styles.labelIcon} />
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    placeholder="Kofi"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>
                    <UserCheckIcon className={styles.labelIcon} />
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    placeholder="Mensah"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              {/* Date of Birth */}
              <div className={styles.formGroup}>
                <label htmlFor="dateOfBirth" className={styles.label}>
                  <CalendarIcon className={styles.labelIcon} />
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth}</span>}
              </div>

              {/* Phone + Email row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    <PhoneIcon className={styles.labelIcon} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="+233 20 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <EnvelopeIcon className={styles.labelIcon} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Region */}
              <div className={styles.formGroup}>
                <label htmlFor="region" className={styles.label}>
                  <MarkerIcon className={styles.labelIcon} />
                  Region
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="region"
                    name="region"
                    className={`${styles.select} ${errors.region ? styles.inputError : ''}`}
                    value={formData.region}
                    onChange={handleChange}
                  >
                    <option value="">Select your region</option>
                    {regionNames.map(r => (
                      <option key={r} value={r}>{r} Region</option>
                    ))}
                  </select>
                </div>
                {errors.region && <span className={styles.errorText}>{errors.region}</span>}
              </div>

              {/* Municipality — only shown after region is selected */}
              {formData.region && (
                <div className={styles.formGroup}>
                  <label htmlFor="municipality" className={styles.label}>
                    <BuildingIcon className={styles.labelIcon} />
                    Municipality / District
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="municipality"
                      name="municipality"
                      className={`${styles.select} ${errors.municipality ? styles.inputError : ''}`}
                      value={formData.municipality}
                      onChange={handleChange}
                    >
                      <option value="">Select your municipality</option>
                      {municipalities.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  {errors.municipality && <span className={styles.errorText}>{errors.municipality}</span>}
                </div>
              )}

              <div className={styles.divider} />

              {/* Password + Confirm Password row */}
              <div className={styles.formRow}>

              {/* Password */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  <KeyIcon className={styles.labelIcon} />
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(p => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon className={styles.eyeIcon} />
                  </button>
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  <KeyIcon className={styles.labelIcon} />
                  Confirm Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(p => !p)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon className={styles.eyeIcon} />
                  </button>
                </div>
                {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
              </div>

              </div> {/* end password formRow */}

              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? (
                  <span className={styles.loadingDots}>
                    <span /><span /><span />
                  </span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <AngleRightIcon className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.loginPrompt}>
              <p>Already have an account? <a href="/login" className={styles.loginLink}>Log in</a></p>
            </div>
          </div>
        </Fade>
      </div>

      {/* ── Right branding panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>Aircho</h1>
          <p className={styles.brandTagline}>Connecting Communities with Services</p>
        </div>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Report Issues</strong>Submit infrastructure, safety, and service concerns directly to your municipality.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Track Progress</strong>Follow your reports in real time and get notified when they are resolved.</p>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} />
            <p><strong>Engage Locally</strong>Read updates from civil services and government entities in your area.</p>
          </li>
        </ul>

        <p className={styles.leftFooter}>© {new Date().getFullYear()} Aircho · Ghana</p>
      </div>
    </div>
  );
};

export default Signup;
