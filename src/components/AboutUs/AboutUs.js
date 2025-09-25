import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        {/* Left side - About Store */}
        <div className="about-store-section">
          <h2 className="section-title">about store</h2>
          <div className="store-description">
            <p>
              Welcome to Beauty Store, your online destination for high-quality cosmetics and self-care products. Here you can discover a wide selection of makeup, skincare, and haircare essentials designed to highlight your natural beauty and support your daily routine. Our commitment is to serve each and everyone by offering trusted brands and carefully selected products that meet the highest standards of quality. We believe that taking care of yourself should be simple, enjoyable, and inspiring.
            </p>
            <div className="contact-info">
              <p>Contacts: beautystore@gmail.com |</p>
              <p>Instagram: @beautystore | GitHub: github.com/KhegayNicole/beauty-store</p>
            </div>
          </div>
        </div>

        {/* Right side - About Us with features */}
        <div className="about-us-section">
          <h1 className="main-title">ABOUT US</h1>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                🚚
              </div>
              <div className="feature-text">
                <p>We make sure your orders arrive quickly and on time.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                💰
              </div>
              <div className="feature-text">
                <p>We regularly offer sales and special deals to make beauty affordable.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                🤖
              </div>
              <div className="feature-text">
                <p>Our team provides professional support and reliable service.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                ❤️
              </div>
              <div className="feature-text">
                <p>Customers trust us and enjoy shopping with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;