<template>
  <div class="weather-highlights-container p-4">
    <!-- Show content only when weather data is available -->
    <div v-if="weather">
      
      <!-- Weather Highlights Cards -->
      <div class="highlights-grid">
        <div 
          v-for="(highlight, index) in highlights" 
          :key="index"
          class="highlight-card"
        >
          <div class="highlight-icon">
            <i :class="highlight.icon"></i>
          </div>
          <div class="highlight-content">
            <h3 class="highlight-title">{{ highlight.title }}</h3>
            <div class="highlight-value">{{ highlight.value }}</div>
          </div>
        </div>
      </div>

      <!-- UV Index and Visibility -->
      <div class="additional-data">
        <div class="additional-card">
          <div class="additional-header">
            <i class="fas fa-eye me-2"></i>
            <h3>Visibility</h3>
          </div>
          <div class="additional-value">
            {{ weather.visibility ? (weather.visibility / 1000).toFixed(1) + ' km' : 'N/A' }}
          </div>
          <div class="additional-scale">
            <div class="scale-bar">
              <div class="scale-fill" :style="{ width: `${Math.min(100, (weather.visibility || 0) / 100)}%` }"></div>
            </div>
            <div class="scale-labels">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>
        
        <div class="additional-card">
          <div class="additional-header">
            <i class="fas fa-sun me-2"></i>
            <h3>UV Index</h3>
          </div>
          <div class="additional-value">Moderate</div>
          <div class="additional-scale">
            <div class="scale-bar uv-bar">
              <div class="scale-fill" style="width: 40%"></div>
            </div>
            <div class="scale-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading weather highlights...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherHighlights",
  computed: {
    weather() {
      return this.$store.state.weather;
    },
    formattedSunrise() {
      if (!this.weather) return "--";
      return this.formatTime(this.weather.sys.sunrise);
    },
    formattedSunset() {
      if (!this.weather) return "--";
      return this.formatTime(this.weather.sys.sunset);
    },
    highlights() {
      if (!this.weather) return [];
      return [
        {
          title: "Humidity",
          value: `${this.weather.main.humidity}%`,
          icon: "fa-solid fa-droplet fa-3x text-primary",
        },
        {
          title: "Pressure",
          value: `${this.weather.main.pressure} hPa`,
          icon: "fa-solid fa-gauge fa-3x text-success",
        },
        {
          title: "Wind Speed",
          value: `${this.weather.wind.speed} m/s`,
          icon: "fa-solid fa-wind fa-3x text-info",
        },
        {
          title: "Feels Like",
          value: `${Math.round(this.weather.main.feels_like)}°C`,
          icon: "fa-solid fa-temperature-high fa-3x text-danger",
        },
      ];
    },
  },
  methods: {
    formatTime(timestamp) {
      if (!this.weather || !timestamp) return "--";
      return new Date(timestamp * 1000 + this.weather.timezone * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.weather-highlights-container {
  width: 100%;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.section-title i {
  color: #10b981;
}

/* Highlights Grid */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.highlight-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.highlight-icon {
  margin-right: 20px;
  font-size: 0.8rem;
}

.highlight-icon i {
  opacity: 0.9;
}

.highlight-content {
  flex: 1;
}

.highlight-title {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 5px 0;
  font-weight: 500;
}

.highlight-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

/* Additional Data Styling */
.additional-data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.additional-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.additional-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.additional-header i {
  font-size: 1.2rem;
  color: #10b981;
}

.additional-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #334155;
}

.additional-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 15px;
}

.additional-scale {
  margin-top: 10px;
}

.scale-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.scale-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 4px;
}

.uv-bar .scale-fill {
  background: linear-gradient(90deg, #10b981, #eab308);
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 5px;
}

/* Loading state */
.loading-state {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(16, 185, 129, 0.2);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .additional-data {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
  
  .highlight-card {
    padding: 15px;
  }
}
</style>
