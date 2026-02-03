import styles from '../../styles/user/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Aircho</h1>
          <p className={styles.heroSubtitle}>
            Your trusted platform for connecting communities with municipal services
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>Get Started</button>
            <button className={styles.secondaryBtn}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Aircho?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Fast & Efficient</h3>
              <p className={styles.featureDescription}>
                Quick access to municipal services at your fingertips
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3 className={styles.featureTitle}>Secure & Reliable</h3>
              <p className={styles.featureDescription}>
                Your data is protected with industry-standard security
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Easy to Use</h3>
              <p className={styles.featureDescription}>
                Intuitive interface designed for everyone
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌍</div>
              <h3 className={styles.featureTitle}>Community Focused</h3>
              <p className={styles.featureDescription}>
                Bringing communities and municipalities together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Sign Up</h3>
              <p className={styles.stepDescription}>
                Create your account in just a few clicks
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Choose Service</h3>
              <p className={styles.stepDescription}>
                Browse and select the service you need
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Get Connected</h3>
              <p className={styles.stepDescription}>
                Connect with your municipality instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of users already using Aircho
          </p>
          <button className={styles.ctaBtn}>Sign Up Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
