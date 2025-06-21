<template>
  <div class="about-view">
    <div class="about-container">
      <!-- Hero Section -->
      <section class="about-hero" data-aos="fade-up">
        <div class="hero-content">
          <h1 class="about-title">About <span>Weather</span><span class="accent">App</span></h1>
          <p class="about-subtitle">Your comprehensive weather intelligence platform</p>
          <div class="hero-divider"></div>
          <p class="hero-description">
            WeatherApp provides accurate, real-time weather information with an intuitive interface.
            Stay informed about current conditions, forecasts, and environmental metrics for any location worldwide.
          </p>
          
          <div class="team-info">
            <h3 class="team-heading">Our Team</h3>
            <p class="team-intro">Developed by Year 3 students at Royal University of Phnom Penh (RUPP), Cambodia as part of our project practicum:</p>
            
            <div class="team-members">
              <div class="team-member">
                <div class="member-icon"><i class="fas fa-code"></i></div>
                <div class="member-details">
                  <h4>Chhem Seavthek</h4>
                  <p>Team Leader & Lead Coder</p>
                </div>
              </div>
              
              <div class="team-member">
                <div class="member-icon"><i class="fas fa-cloud-download-alt"></i></div>
                <div class="member-details">
                  <h4>Chun Keman</h4>
                  <p>API Specialist</p>
                </div>
              </div>
              
              <div class="team-member">
                <div class="member-icon"><i class="fas fa-paint-brush"></i></div>
                <div class="member-details">
                  <h4>Ngeth Theareth</h4>
                  <p>UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
          <i class="hero-icon fas fa-cloud-sun-rain"></i>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" data-aos="fade-up" data-aos-delay="100">
        <h2 class="section-title">Premium Features</h2>
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="150">
            <div class="feature-icon"><i class="fas fa-clock"></i></div>
            <h3>Real-time Updates</h3>
            <p>Get the latest weather data with frequent updates for accurate information.</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon"><i class="fas fa-calendar-day"></i></div>
            <h3>5-Day Forecast</h3>
            <p>Plan your week with detailed 5-day weather predictions and trends.</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="250">
            <div class="feature-icon"><i class="fas fa-wind"></i></div>
            <h3>Air Quality Index</h3>
            <p>Monitor air pollution levels and receive health recommendations.</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
            <h3>Weather Highlights</h3>
            <p>Track humidity, pressure, visibility, and other key weather metrics.</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="350">
            <div class="feature-icon"><i class="fas fa-hourglass-half"></i></div>
            <h3>Hourly Forecast</h3>
            <p>View hour-by-hour predictions to plan your day with precision.</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div class="feature-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>Location-based</h3>
            <p>Get weather data for your current location or search for any place.</p>
          </div>
        </div>
      </section>

      <!-- Technology Stack Section -->
      <section class="tech-section" data-aos="fade-up" data-aos-delay="150">
        <h2 class="section-title">Our Technology Stack</h2>
        <div class="tech-cards">
          <div class="tech-card" data-aos="flip-left" data-aos-delay="200">
            <div class="tech-logo">
              <i class="fab fa-vuejs"></i>
            </div>
            <h4>Vue.js 3</h4>
            <p>Modern front-end framework powering our reactive user interface</p>
          </div>
          
          <div class="tech-card" data-aos="flip-left" data-aos-delay="250">
            <div class="tech-logo">
              <i class="fas fa-database"></i>
            </div>
            <h4>Vuex</h4>
            <p>State management for efficient data handling across components</p>
          </div>
          
          <div class="tech-card" data-aos="flip-left" data-aos-delay="300">
            <div class="tech-logo">
              <i class="fas fa-cloud-download-alt"></i>
            </div>
            <h4>OpenWeather API</h4>
            <p>Reliable weather data source with global coverage</p>
          </div>
          
          <div class="tech-card" data-aos="flip-left" data-aos-delay="350">
            <div class="tech-logo">
              <i class="fab fa-bootstrap"></i>
            </div>
            <h4>Bootstrap</h4>
            <p>Responsive design framework ensuring cross-device compatibility</p>
          </div>
        </div>
      </section>

      <!-- Data Sources Section -->
      <section class="data-section" data-aos="fade-up" data-aos-delay="200">
        <h2 class="section-title">Data Sources & Project Information</h2>
        <div class="data-content">
          <p>
            WeatherApp sources its data from the OpenWeather API, which collects information from meteorological 
            broadcasts, weather stations, radar data, satellite observations, and other official weather data providers.
            This ensures our users receive accurate and reliable weather information.
          </p>
          
          <div class="project-info" data-aos="fade-up" data-aos-delay="150">
            <h3>Project Practicum Details</h3>
            <p>
              This weather application was developed as part of the Year 3 project practicum at 
              <strong>Royal University of Phnom Penh (RUPP)</strong>, Cambodia. The project aims to demonstrate 
              the practical implementation of modern web development technologies and API integration 
              while creating a useful tool for weather monitoring.
            </p>
          </div>
          
          <div class="data-info" data-aos="fade-right" data-aos-delay="250">
            <div class="info-item">
              <div class="info-icon"><i class="fas fa-broadcast-tower"></i></div>
              <div class="info-text">
                <h4>Weather Stations</h4>
                <p>Data from thousands of weather stations worldwide</p>
              </div>
            </div>
            
            <div class="info-item" data-aos="fade-right" data-aos-delay="300">
              <div class="info-icon"><i class="fas fa-satellite"></i></div>
              <div class="info-text">
                <h4>Satellite Imagery</h4>
                <p>Cloud patterns and atmospheric conditions from space</p>
              </div>
            </div>
            
            <div class="info-item" data-aos="fade-right" data-aos-delay="350">
              <div class="info-icon"><i class="fas fa-tachometer-alt"></i></div>
              <div class="info-text">
                <h4>Meteorological Models</h4>
                <p>Advanced prediction models for forecast accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact/Footer Section -->
      <section class="about-footer" data-aos="fade-up" data-aos-delay="250">
        <div class="footer-content">
          <h2>Stay Connected</h2>
          <p>
            We're constantly improving WeatherApp with new features and data sources.
            Follow us for updates or reach out with feedback and suggestions.
          </p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
          
          <div class="team-recognition">
            <p>Created by RUPP Year 3 Students:</p>
            <p class="team-names">Chhem Seavthek • Chun Keman • Ngeth Theareth</p>
          </div>
          
          <p class="copyright">© 2025 WeatherApp. All rights reserved.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-view {
  color: var(--text-primary);
  padding: 40px 0 60px;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  margin-bottom: 80px;
}

/* Hero Section */
.about-hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 100px;
}

.hero-content {
  flex: 1;
  min-width: 300px;
  padding-right: 40px;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
}

.about-title span {
  position: relative;
}

.accent {
  color: #fcd34d;
}

.about-subtitle {
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
  font-weight: 300;
}

.hero-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #fcd34d);
  margin: 25px 0;
  border-radius: 2px;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

/* Team Info Styles */
.team-info {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.team-heading {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--accent-color);
  display: flex;
  align-items: center;
}

.team-heading::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  margin-right: 10px;
  border-radius: 2px;
}

.team-intro {
  font-size: 1rem;
  margin-bottom: 20px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(99, 102, 241, 0.2);
}

.team-member:last-child {
  border-bottom: none;
}

.member-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  font-size: 18px;
}

.member-details h4 {
  margin: 0 0 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.member-details p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.hero-image {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.hero-icon {
  font-size: 12rem;
  color: var(--accent-color);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3));
}

/* Features Section */
.section-title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon i {
  font-size: 24px;
  color: #6366f1;
}

.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Tech Stack Section */
.tech-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.tech-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 25px;
  width: 220px;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-8px);
}

.tech-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.tech-logo i {
  font-size: 32px;
  color: white;
}

.tech-card h4 {
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.tech-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Data Sources Section */
.data-content {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--card-shadow);
}

.data-content > p {
  margin-bottom: 30px;
  line-height: 1.7;
}

.project-info {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-left: 4px solid #6366f1;
}

.project-info h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--accent-color);
}

.project-info p {
  line-height: 1.7;
  margin-bottom: 0;
}

.data-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.info-icon {
  width: 50px;
  height: 50px;
  min-width: 50px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon i {
  color: #6366f1;
  font-size: 20px;
}

.info-text h4 {
  margin-bottom: 8px;
}

.info-text p {
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Footer Section */
.about-footer {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  box-shadow: var(--card-shadow);
}

.about-footer h2 {
  margin-bottom: 20px;
}

.about-footer p {
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.7;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.social-link {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}

.team-recognition {
  margin: 25px 0;
  padding: 15px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.07), rgba(139, 92, 246, 0.07));
}

.team-recognition p {
  margin: 0 0 5px;
  font-size: 0.95rem;
}

.team-names {
  font-weight: 600;
  color: var(--accent-color);
  font-size: 1.1rem !important;
}

.copyright {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .about-hero {
    flex-direction: column;
    margin-bottom: 60px;
  }
  
  .hero-content {
    padding-right: 0;
    margin-bottom: 30px;
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .team-info {
    padding: 20px;
    margin-top: 20px;
  }
  
  .team-members {
    gap: 10px;
  }
  
  .hero-icon {
    font-size: 8rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-cards {
    gap: 20px;
  }
  
  .tech-card {
    width: calc(50% - 10px);
    padding: 20px 15px;
  }
  
  .data-content {
    padding: 25px;
  }
  
  .about-footer {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .tech-card {
    width: 100%;
  }
  
  .info-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>