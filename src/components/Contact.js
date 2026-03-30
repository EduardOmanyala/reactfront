// src/components/Contact.js
import React, { useState } from "react";
import BASE_URL from '../Config';
import "./gen.css"; // 👈 import CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message || "Message sent successfully!");
        // setStatus("Message sent successfully!");
        setIsError(false);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      setStatus("Network error. Please check your connection.");
      setIsError(true);
    }
  };

  return (


    <div id="contact" >
        <div className="container">
            <div className="content-wrapper">
                <section className="contact-grid">
                    <div className="contact-form glass">
                        <h2>Get In Touch</h2>
                        
                    {/* ✅ ALERT ABOVE FORM */}
              {status && (
                <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="cta-button mt-1">
                  Send Message
                </button>
              </form>
                    </div>

                    <div className="contact-info glass">
                        <h2>Contact Information</h2>
                        
                        <div className="contact-item">
                            <div className="contact-item-icon">📧</div>
                            <div className="contact-item-text">
                                <h4>Email</h4>
                                <p>support@ken-lib.com</p>
                            </div>
                        </div>


                        <div className="contact-item">
                            <div className="contact-item-icon">📍</div>
                            <div className="contact-item-text">
                                <h4>Address</h4>
                                <p>Bamburi Road<br/>Bamburi, Mombasa</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon">🕒</div>
                            <div className="contact-item-text">
                                <h4>Business Hours</h4>
                                <p>Mon-Fri: 9AM-6PM<br/>Sat-Sun: 10AM-4PM</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-map-section">
                    <div className="contact-map glass">
                        <h2>Find Us</h2>
                        <div className="map-container">
                            <div className="map-placeholder">
                                <div className="map-placeholder-icon">🗺️</div>
                                <p><strong>Interactive Map Area</strong></p>
                                <p>123 Design Street</p>
                                <p>Creative District, CD 12345</p>
                                <p style={{ marginTop: '15px', fontSize: '12px', opacity: 0.7 }}>
                                    Map integration can be added with<br/>
                                    Google Maps, OpenStreetMap, or Mapbox
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>



  );
};

export default Contact;










