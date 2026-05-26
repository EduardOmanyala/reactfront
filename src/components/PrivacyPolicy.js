import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        lineHeight: 1.6,
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          borderBottom: '2px solid #eaeaea',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
          color: '#0a2540',
        }}
      >
        Privacy Policy
      </h1>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#555' }}>
        Effective date: {new Date().toLocaleDateString('en-KE')}
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>1. Introduction</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Welcome to our website. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our services, which include selling e-books, providing MMF performance charts, offering CPA revision materials for Kenya, and publishing a finance & investment blog.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>2. Information We Collect</h2>
        <p style={{ marginBottom: '0.5rem' }}>We may collect the following types of information:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li style={{ marginBottom: '0.25rem' }}><strong>Personal Data:</strong> Name, email address, billing information (when purchasing e-books or CPA materials).</li>
          <li style={{ marginBottom: '0.25rem' }}><strong>Usage Data:</strong> IP address, browser type, pages visited (including charts, revision materials, blog posts).</li>
          <li style={{ marginBottom: '0.25rem' }}><strong>Cookies & Tracking:</strong> We use cookies to enhance user experience and analyze site traffic.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>3. How We Use Your Information</h2>
        <p style={{ marginBottom: '0.5rem' }}>Your data helps us to:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Process and deliver e-book and CPA material purchases.</li>
          <li>Provide up-to-date MMF performance charts and financial insights.</li>
          <li>Improve our blog content and personalize your reading experience.</li>
          <li>Respond to customer support inquiries.</li>
          <li>Comply with Kenyan data protection laws (Data Protection Act, 2019).</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>4. Sharing Your Information</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We do not sell or rent your personal data. We may share information with trusted third-party service providers (e.g., payment processors, hosting, analytics) solely to operate our website. All providers are contractually obligated to keep your data secure.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>5. Data Security</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We implement SSL encryption, secure servers, and access controls to protect your information. However, no internet transmission is 100% secure – you share data at your own risk.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>6. Your Rights (Under Kenyan Law & GDPR)</h2>
        <p style={{ marginBottom: '0.5rem' }}>You have the right to:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Withdraw consent for marketing emails.</li>
          <li>Lodge a complaint with the Office of the Data Protection Commissioner (Kenya).</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:privacy@yourdomain.co.ke" style={{ color: '#0066cc', textDecoration: 'none' }}>privacy@yourdomain.co.ke</a>.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>7. Cookies & Tracking Technologies</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Our site uses cookies to remember your preferences, analyze MMF chart usage, and improve blog recommendations. You can disable cookies in your browser settings, but some features may not work properly.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>8. Children's Privacy</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Our services (especially CPA revision materials and finance content) are intended for adults aged 18+. We do not knowingly collect data from children under 13.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>9. Changes to This Policy</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We may update this policy occasionally. The “Effective date” at the top will change. Continued use of the site after changes means you accept the revised policy.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>10. Contact Us</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          For privacy-related questions, reach out to:
        </p>
        <address style={{ fontStyle: 'normal', background: '#f9f9f9', padding: '1rem', borderRadius: '6px' }}>
          <strong>Your Business Name</strong><br />
          Email: <a href="mailto:info@ken-lib.com" style={{ color: '#0066cc' }}>info@ken-lib.com</a><br />
          <br />
          Address: Nairobi, Kenya
        </address>
      </section>

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eaeaea', fontSize: '0.8rem', textAlign: 'center', color: '#777' }}>
        © {new Date().getFullYear()} Ken-lib.com. All rights reserved.
      </div>
    </div>
  );
};

export default PrivacyPolicy;