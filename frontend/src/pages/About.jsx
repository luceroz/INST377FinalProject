import React from "react";
import { motion } from "framer-motion";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className='about-container'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.section variants={itemVariants} className='about-section'>
        <h2>About Art Gallery</h2>
        <p>
          Welcome to our digital art exploration platform, where we bridge the
          gap between art enthusiasts and the world's most prestigious art
          collections.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className='mission-section'>
        <h3>Our Mission</h3>
        <p>
          To make art more accessible by providing a unified platform to explore
          and discover artworks from multiple renowned institutions including
          the Art Institute of Chicago and The Metropolitan Museum of Art.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className='features-section'>
        <h3>Key Features</h3>
        <ul>
          <li>Access to extensive art collections from multiple museums</li>
          <li>Advanced search capabilities</li>
          <li>Detailed artwork information and history</li>
          <li>Visual exploration of art pieces</li>
          <li>Shop from a wide selction of art pieces</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className='faq-section'>
        <h3>Frequently Asked Questions</h3>
        <div className='faq-grid'>
          <div className='faq-item'>
            <h4>How do I search for artworks?</h4>
            <p>
              Use our search page to find artworks by title, artist, or keyword.
              Results will show matches from multiple museum collections.
            </p>
          </div>
          <div className='faq-item'>
            <h4>Are the images free to use?</h4>
            <p>
              Image usage rights vary by institution. Please check each museum's
              specific guidelines for image usage rights.
            </p>
          </div>
          <div className='faq-item'>
            <h4>How often is the content updated?</h4>
            <p>
              Our platform fetches real-time data from museum APIs, ensuring you
              always see the most current information available.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default About;
