import React from 'react';

const TermsOfService = () => {
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
        Terms of Service
      </h1>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#555' }}>
        Effective date: {new Date().toLocaleDateString('en-KE')}
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          By accessing or using this website (including e-book sales, MMF performance charts, CPA revision materials for Kenya, and the finance/investment blog), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>2. Services Overview</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We provide:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Digital e-books for purchase and download.</li>
          <li>Money Market Fund (MMF) performance charts – for informational purposes only.</li>
          <li>CPA revision materials for the Kenyan CPA examination.</li>
          <li>A blog on finance and investment topics.</li>
        </ul>
        <p style={{ marginBottom: '0.75rem' }}>
          All content is for general informational and educational use. We do not provide personalized financial advice.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>3. Account Registration</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Some features (e.g., purchasing e-books or accessing premium CPA materials) may require an account. You agree to:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the security of your password and account.</li>
          <li>Notify us immediately of any unauthorized use.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>4. Purchases & Digital Products</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          <strong>E-books and CPA revision materials</strong> are digital goods. After successful payment, you receive a downloadable link. Due to the digital nature, <strong>all sales are final</strong> unless a technical issue prevents download (contact us within 7 days). Refunds are not provided for change of mind.
        </p>
        <p style={{ marginBottom: '0.75rem' }}>
          You may not share, resell, or redistribute purchased materials without explicit written permission.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>5. MMF Performance Charts – Disclaimer</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          The MMF charts are based on publicly available data and historical performance. Past performance does not guarantee future returns. We do not guarantee the accuracy, completeness, or timeliness of chart data. Always verify with the fund manager before making investment decisions.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>6. Blog Content & Financial Information</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Our finance and investment blog is for educational purposes only. Nothing on this site constitutes professional financial, legal, or tax advice. You should consult a licensed professional before making any investment. We are not liable for any losses incurred based on blog content.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>7. Intellectual Property</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          All content on this website – including e-books, CPA revision materials, charts, blog posts, logos, and graphics – is our intellectual property or used under license. You may not:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Republish, distribute, or sell our content without permission.</li>
          <li>Use our materials for commercial training without a license.</li>
          <li>Remove copyright or watermarks from downloaded files.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>8. User Conduct</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          You agree not to:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li>Use the site for any illegal purpose under Kenyan law.</li>
          <li>Upload malware, scrapers, or disruptive scripts.</li>
          <li>Harass other users or post offensive comments on the blog.</li>
          <li>Attempt to reverse engineer our charts or payment systems.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>9. Third-Party Links</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          Our site may link to external websites (e.g., fund managers, CPA bodies, payment providers). We are not responsible for their content, privacy practices, or terms.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>10. Limitation of Liability</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          To the maximum extent permitted by Kenyan law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our e-books, charts, CPA materials, or blog. Our total liability for any claim shall not exceed the amount you paid us in the preceding 6 months.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>11. Indemnification</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your violation of these Terms or misuse of our content.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>12. Termination</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We may suspend or terminate your access if you violate these Terms. Upon termination, you must destroy any downloaded materials in your possession.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>13. Governing Law & Dispute Resolution</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          These Terms are governed by the laws of Kenya. Any dispute shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes will be submitted to the exclusive jurisdiction of the courts in Nairobi, Kenya.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>14. Changes to Terms</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance. Material changes will be notified via email or site banner.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#0a2540' }}>15. Contact Information</h2>
        <p style={{ marginBottom: '0.75rem' }}>
          For questions about these Terms, please contact us:
        </p>
        <address style={{ fontStyle: 'normal', background: '#f9f9f9', padding: '1rem', borderRadius: '6px' }}>
          <strong>Your Business Name</strong><br />
          Email: <a href="mailto:info@ken-lib.com" style={{ color: '#0066cc', textDecoration: 'none' }}>info@ken-lib.com</a><br />
          <br />
          Nairobi, Kenya
        </address>
      </section>

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eaeaea', fontSize: '0.8rem', textAlign: 'center', color: '#777' }}>
        © {new Date().getFullYear()} Ken-lib.com. All rights reserved.
      </div>
    </div>
  );
};

export default TermsOfService;