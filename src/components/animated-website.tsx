import React, { useEffect, useState } from 'react';

const AnimatedWebsite = () => {
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target.id)) {
            entry.target.classList.add('show');
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `animate-${index}`;
      }
      observer.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [animatedElements]);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 className="hidden" id="hero-title" style={styles.heroTitle}>
          Welcome to My Website
        </h1>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* About Section */}
        <section style={styles.section}>
          <h2 className="hidden" id="about-title" style={styles.sectionTitle}>
            About Us
          </h2>
          <p className="hidden" id="about-text" style={styles.text}>
            We are passionate about creating amazing experiences. Our team works
            tirelessly to bring you the best solutions for your needs.
          </p>
        </section>

        {/* Services Section */}
        <section style={styles.section}>
          <h2 className="hidden" id="services-title" style={styles.sectionTitle}>
            Our Services
          </h2>
          <div style={styles.servicesGrid}>
            <div className="hidden" id="service-1" style={styles.card}>
              <h3 style={styles.cardTitle}>Web Design</h3>
              <p>Creating beautiful and functional websites.</p>
            </div>
            <div className="hidden" id="service-2" style={styles.card}>
              <h3 style={styles.cardTitle}>Development</h3>
              <p>Building robust and scalable applications.</p>
            </div>
            <div className="hidden" id="service-3" style={styles.card}>
              <h3 style={styles.cardTitle}>Consulting</h3>
              <p>Expert advice for your digital needs.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section}>
          <h2 className="hidden" id="contact-title" style={styles.sectionTitle}>
            Contact Us
          </h2>
          <p className="hidden" id="contact-text" style={styles.text}>
            Get in touch with us to learn more about how we can help you succeed.
          </p>
        </section>
      </div>

      <style>
        {`
          .hidden {
            opacity: 0;
            filter: blur(5px);
            transform: translateX(-100%);
            transition: all 1s;
          }

          .show {
            opacity: 1;
            filter: blur(0);
            transform: translateX(0);
          }

          @media (prefers-reduced-motion) {
            .hidden {
              transition: none;
            }
          }

          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
};

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  section: {
    marginBottom: '6rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#333',
  },
  text: {
    fontSize: '1.125rem',
    lineHeight: '1.7',
    color: '#444',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  card: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  },
};

export default AnimatedWebsite;
