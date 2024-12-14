import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Help() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // Simulate sending form
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.div 
      className="help-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="contact-info">
        <h2>Contact Us</h2>
        <div className="contact-methods">
          <div className="contact-method">
            <h3>Email</h3>
            <p>support@artgallery.com</p>
          </div>
          <div className="contact-method">
            <h3>Phone</h3>
            <p>+1 (301) 383-4910</p>
          </div>
          <div className="contact-method">
            <h3>Address</h3>
            <p>113 Art Street, Gallery City, CA 12345</p>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h3>Send us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={submitStatus === 'sending'}
          >
            {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="success-message">
              Message sent successfully!
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      </section>
    </motion.div>
  );
}

export default Help;
