<template>
  <div class="weather-dashboard">
    <!-- Top section with search and location info -->
    <header class="dashboard-header">
      <div class="header-top">
        <WeatherSearch />
        <div class="units-toggle">
          <button 
            class="unit-btn" 
            :class="{ active: units === 'metric' }"
            @click="switchUnits('metric')"
          >°C</button>
          <button 
            class="unit-btn" 
            :class="{ active: units === 'imperial' }"
            @click="switchUnits('imperial')"
          >°F</button>
        </div>
      </div>
      <div class="location-info" v-if="currentLocation">
        <h1><i class="fas fa-map-marker-alt location-icon"></i> {{ currentLocation }}</h1>
        <p class="last-updated">Last updated: {{ lastUpdated }}</p>
      </div>
    </header>
    
    <!-- Weather alerts banner (only shows if there are alerts) -->
    <div class="alerts-banner" v-if="hasAlerts" @click="toggleAlertsModal">
      <div class="alert-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="alert-message">
        <p>{{ alertsCount }} active weather {{ alertsCount === 1 ? 'alert' : 'alerts' }} for this location</p>
      </div>
      <div class="alert-action">
        <span>View Details</span>
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
    
    <!-- Main content area with animated transitions -->
    <main class="dashboard-content" data-aos="fade-up">
      <!-- Hero section with current weather -->
      <div class="weather-hero">
        <CurrentWeather />
      </div>
      
      <!-- Weather cards grid -->
      <div class="weather-grid">
        <!-- Air Quality Card -->
        <div class="weather-card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-header">
            <h2><i class="fas fa-wind me-2"></i>Air Quality</h2>
          </div>
          <AirQuality />
        </div>
        
        <!-- UV Index Card -->
        <div class="weather-card" data-aos="fade-up" data-aos-delay="150">
          <div class="card-header">
            <h2><i class="fas fa-sun me-2"></i>UV Index</h2>
          </div>
          <UVIndex />
        </div>
        
        <!-- Sunrise/Sunset Card -->
        <div class="weather-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-header">
            <h2><i class="fas fa-sun me-2"></i>Sunrise & Sunset</h2>
          </div>
          <SunriseSunset />
        </div>
        
        <!-- Weather Map Card -->
        <div class="weather-card full-width" data-aos="fade-up" data-aos-delay="250">
          <div class="card-header">
            <h2><i class="fas fa-map-marked-alt me-2"></i>Weather Map</h2>
          </div>
          <WeatherMap />
        </div>
        
        <!-- Hourly Forecast Card -->
        <div class="weather-card full-width" data-aos="fade-up" data-aos-delay="300">
          <div class="card-header">
            <h2><i class="fas fa-clock me-2"></i>Hourly Forecast</h2>
            <button class="toggle-view-btn"><i class="fas fa-chart-line"></i></button>
          </div>
          <HourlyForecast />
        </div>
        
        <!-- 5-Day Forecast Card -->
        <div class="weather-card full-width" data-aos="fade-up" data-aos-delay="400">
          <div class="card-header">
            <h2><i class="fas fa-calendar-week me-2"></i>5-Day Forecast</h2>
          </div>
          <FiveDayForecast />
        </div>
        
        <!-- Weather Highlights Card -->
        <div class="weather-card full-width" data-aos="fade-up" data-aos-delay="500">
          <div class="card-header">
            <h2><i class="fas fa-star me-2"></i>Weather Highlights</h2>
          </div>
          <WeatherHighlights />
        </div>
      </div>
    </main>
    
    <!-- Footer area with attribution and theme toggle -->
    <footer class="dashboard-footer">
      <div class="footer-content">
        <p>© 2025 WeatherApp - Powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a></p>
        <button class="theme-toggle" @click="toggleTheme">
          <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </footer>
    
    <!-- Weather alerts modal -->
    <div class="modal-overlay" v-if="showAlertsModal" @click="toggleAlertsModal"></div>
    <div class="alerts-modal" v-if="showAlertsModal">
      <div class="modal-header">
        <h3>Weather Alerts</h3>
        <button class="close-btn" @click="toggleAlertsModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <WeatherAlerts />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherSearch from '@/components/WeatherSearch.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import FiveDayForecast from '@/components/FiveDayForecast.vue'
import AirQuality from '@/components/AirQuality.vue'
import SunriseSunset from '@/components/SunriseSunset.vue'
import WeatherHighlights from '@/components/WeatherHighlights.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import UVIndex from '@/components/UVIndex.vue'
import WeatherMap from '@/components/WeatherMap.vue'
import WeatherAlerts from '@/components/WeatherAlerts.vue'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'HomeView',
  components: {
    WeatherSearch,
    CurrentWeather,
    FiveDayForecast,
    AirQuality,
    SunriseSunset,
    WeatherHighlights,
    HourlyForecast,
    UVIndex,
    WeatherMap,
    WeatherAlerts
  },
  setup() {
    const store = useStore()
    const showAlertsModal = ref(false)
    const isDarkTheme = ref(false)
    
    // Get current location from store
    const currentLocation = computed(() => {
      return store.getters.currentLocation
    })
    
    // Get last updated time from store
    const lastUpdated = computed(() => {
      return store.getters.lastUpdatedFormatted || new Date().toLocaleString()
    })
    
    // Get current units
    const units = computed(() => {
      return store.state.units
    })
    
    // Get weather alerts
    const hasAlerts = computed(() => {
      return store.getters.hasAlerts
    })
    
    const alertsCount = computed(() => {
      return store.state.weatherAlerts?.length || 0
    })
    
    // Toggle theme between light and dark
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value
      document.body.classList.toggle('dark-theme', isDarkTheme.value)
      localStorage.setItem('darkTheme', isDarkTheme.value)
    }
    
    // Toggle alerts modal
    const toggleAlertsModal = () => {
      showAlertsModal.value = !showAlertsModal.value
      
      // Add/remove body scroll lock
      if (showAlertsModal.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
    
    // Switch between metric and imperial units
    const switchUnits = (newUnits) => {
      if (newUnits !== store.state.units) {
        store.dispatch('changeUnits', newUnits)
      }
    }
    
    // Try to get user's location on mount
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            store.dispatch('fetchWeatherByCoords', {
              lat: latitude,
              lon: longitude
            })
          },
          (error) => {
            console.error('Geolocation error:', error)
            // Fall back to default location (New York)
            store.dispatch('fetchWeatherByCity', 'New York')
          }
        )
      } else {
        // Geolocation not supported
        store.dispatch('fetchWeatherByCity', 'New York')
      }
    }
    
    onMounted(() => {
      // Initialize animations
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      })
      
      // Check saved theme preference
      const savedTheme = localStorage.getItem('darkTheme') === 'true'
      if (savedTheme) {
        isDarkTheme.value = true
        document.body.classList.add('dark-theme')
      }
      
      // Get initial weather data
      getUserLocation()
    })
    
    return {
      currentLocation,
      lastUpdated,
      isDarkTheme,
      toggleTheme,
      hasAlerts,
      alertsCount,
      showAlertsModal,
      toggleAlertsModal,
      units,
      switchUnits
    }
  }
}
</script>

<style lang="scss">
.weather-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-gradient);
  position: relative;
  overflow-x: hidden;
  color: var(--text-primary);
  transition: all 0.3s ease;
  
  // Header styles
  .dashboard-header {
    padding: 1.5rem 2rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--header-bg);
    backdrop-filter: blur(10px);
    box-shadow: var(--card-shadow);
    border-radius: 0 0 1rem 1rem;
    
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
    
    .units-toggle {
      display: flex;
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid var(--border-color);
      height: 42px;
      
      .unit-btn {
        width: 42px;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
        
        &.active {
          background: var(--accent-color);
          color: white;
        }
        
        &:hover:not(.active) {
          background: var(--btn-hover-bg);
        }
      }
    }
    
    .location-info {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      
      h1 {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--accent-color);
        margin: 0;
        
        .location-icon {
          color: var(--accent-color);
          animation: pulse 2s infinite;
        }
      }
      
      .last-updated {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
  
  // Alerts banner
  .alerts-banner {
    display: flex;
    align-items: center;
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
    padding: 0.75rem 2rem;
    margin: 0.5rem 2rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    
    &:hover {
      background: rgba(244, 67, 54, 0.15);
      transform: translateY(-2px);
    }
    
    .alert-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      animation: pulse 1.5s infinite;
    }
    
    .alert-message {
      flex: 1;
      
      p {
        margin: 0;
        font-weight: 600;
      }
    }
    
    .alert-action {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 500;
      
      i {
        margin-left: 0.5rem;
      }
    }
  }
  
  // Main content area
  .dashboard-content {
    flex: 1;
    width: 100%;
    max-width: 1600px;
    margin: 1rem auto 2rem;
    padding: 0 2rem;
    
    .weather-hero {
      margin-bottom: 2rem;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: var(--card-shadow);
    }
    
    .weather-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
      
      .weather-card {
        background: var(--card-bg);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--card-shadow-hover);
        }
        
        &.full-width {
          grid-column: 1 / -1;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          
          h2 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            
            i {
              color: var(--accent-color);
              margin-right: 0.5rem;
            }
          }
          
          .toggle-view-btn {
            background: transparent;
            border: none;
            color: var(--accent-color);
            font-size: 1rem;
            cursor: pointer;
            padding: 0.3rem;
            border-radius: 0.3rem;
            transition: background 0.2s ease;
            
            &:hover {
              background: var(--btn-hover-bg);
            }
          }
        }
      }
    }
  }
  
  // Footer
  .dashboard-footer {
    padding: 1rem 2rem;
    background: var(--footer-bg);
    border-top: 1px solid var(--border-color);
    backdrop-filter: blur(8px);
    position: relative;
    
    .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1600px;
      margin: 0 auto;
      
      p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      a {
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      .theme-toggle {
        background: transparent;
        color: var(--accent-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--btn-hover-bg);
          transform: rotate(15deg);
        }
        
        i {
          font-size: 1.1rem;
        }
      }
    }
  }
  
  // Weather Alerts Modal
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1000;
  }
  
  .alerts-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    background: var(--card-bg);
    border-radius: 1rem;
    z-index: 1001;
    box-shadow: var(--card-shadow-hover);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      
      h3 {
        margin: 0;
        font-size: 1.3rem;
        color: var(--text-primary);
      }
      
      .close-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 50%;
        line-height: 1;
        transition: all 0.2s ease;
        
        &:hover {
          background: var(--btn-hover-bg);
          color: var(--accent-color);
        }
      }
    }
    
    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }
  }
}

// Animations
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

// Create CSS variables to make theme toggling easier
:root {
  --bg-gradient: linear-gradient(135deg, #f0f9ff, #e0f2fe, #dbeafe);
  --header-bg: rgba(240, 249, 255, 0.85);
  --card-bg: rgba(255, 255, 255, 0.9);
  --footer-bg: rgba(255, 255, 255, 0.7);
  --text-primary: #334155;
  --text-secondary: #64748b;
  --accent-color: #6366f1;
  --border-color: rgba(203, 213, 225, 0.5);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --btn-hover-bg: rgba(99, 102, 241, 0.1);
}

// Dark theme variables
body.dark-theme {
  --bg-gradient: linear-gradient(135deg, #0f172a, #1e293b, #334155);
  --header-bg: rgba(15, 23, 42, 0.85);
  --card-bg: rgba(30, 41, 59, 0.9);
  --footer-bg: rgba(15, 23, 42, 0.7);
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --accent-color: #818cf8;
  --border-color: rgba(51, 65, 85, 0.5);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  --card-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.3);
  --btn-hover-bg: rgba(129, 140, 248, 0.1);
}
</style>