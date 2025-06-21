<template>
  <div class="hourly-forecast-container" data-aos="fade-up" data-aos-delay="200">
    <div class="hourly-header">
      <h2><i class="fas fa-clock me-2"></i>Hourly Forecast</h2>
      <div class="hourly-controls">
        <div v-if="lastUpdated" class="hourly-updated">
          <i class="fas fa-sync-alt me-1"></i> Updated {{ lastUpdated }}
        </div>
        <button @click="scrollLeft" class="scroll-btn scroll-left">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="scrollRight" class="scroll-btn scroll-right">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="hourly-loading">
      <div class="hourly-loading-container">
        <div class="hourly-skeleton-container">
          <div class="hourly-skeleton" v-for="i in 8" :key="i">
            <div class="skeleton-time"></div>
            <div class="skeleton-icon"></div>
            <div class="skeleton-temp"></div>
            <div class="skeleton-detail"></div>
            <div class="skeleton-detail"></div>
          </div>
        </div>
      </div>
      <div class="hourly-loading-text">Loading hourly forecast...</div>
    </div>
    
    <!-- Hourly Forecast Content -->
    <div v-else class="hourly-forecast-scroll" ref="scrollContainer">
      <div class="hourly-forecast">
        <div
          v-for="(forecast, index) in hourlyForecasts"
          :key="index"
          class="hourly-card"
          :class="{'current-hour': isCurrentHour(forecast.dt_txt)}"
        >
          <div class="hour-time">{{ formatHour(forecast.dt_txt) }}</div>
          <div class="hour-day" v-if="showDay(index, forecast.dt_txt)">
            {{ formatDay(forecast.dt_txt) }}
          </div>
          <div class="hour-icon">
            <img
              :src="getWeatherIcon(forecast.weather[0].icon)"
              :alt="forecast.weather[0].description"
            />
          </div>
          <div class="hour-temp">{{ formatTemp(forecast.main.temp) }}&deg;C</div>
          <div class="hour-feels-like" v-if="showFeelsLike(forecast)">
            Feels like {{ formatTemp(forecast.main.feels_like) }}&deg;
          </div>
          <div class="hour-description">
            {{ forecast.weather[0].description }}
          </div>
          <div class="hour-details">
            <div class="hour-detail">
              <i class="fas fa-droplet"></i> {{ forecast.main.humidity }}%
            </div>
            <div class="hour-detail">
              <i class="fas fa-wind"></i> {{ forecast.wind.speed }} m/s
            </div>
          </div>
          <div v-if="forecast.pop" class="hour-precipitation">
            <i class="fas fa-cloud-rain"></i> {{ Math.round(forecast.pop * 100) }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "HourlyForecast",  data() {
    return {
      refreshTimer: null,
      showCount: 8, // Number of hourly forecasts to show initially
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.forecastLoading;
    },
    lastUpdated() {
      if (!this.$store.state.lastUpdated) return null;
      return moment(this.$store.state.lastUpdated).format('h:mm A');
    },
    forecast() {
      return this.$store.state.forecast;
    },
    hourlyForecasts() {
      if (!this.forecast) return [];
      return this.forecast.list.slice(0, this.showCount);
    },
  },
  mounted() {
    this.fetchData();
    
    // Set up auto-refresh every 30 minutes
    this.refreshTimer = setInterval(() => {
      this.fetchData();
    }, 30 * 60 * 1000);
  },
  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  },
  methods: {
    formatHour(datetime) {
      return moment(datetime).format("h A"); // Format time as "6 PM"
    },
    formatDay(datetime) {
      const today = moment().startOf('day');
      const forecastDate = moment(datetime).startOf('day');
      
      if (forecastDate.isSame(today)) {
        return 'Today';
      } else if (forecastDate.isSame(today.clone().add(1, 'days'))) {
        return 'Tomorrow';
      } else {
        return moment(datetime).format("ddd");
      }
    },
    formatTemp(temp) {
      return temp.toFixed(1);
    },
    getWeatherIcon(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`; // Fetch weather icon from OpenWeather
    },
    isCurrentHour(datetime) {
      const now = moment();
      const forecastTime = moment(datetime);
      // Check if forecast time is within 30 minutes of current time
      return Math.abs(now.diff(forecastTime, 'minutes')) < 30;
    },
    showDay(index, datetime) {
      // Show the day label on the first forecast or when the day changes
      if (index === 0) return true;
      
      const prevDay = moment(this.hourlyForecasts[index - 1].dt_txt).startOf('day');
      const currentDay = moment(datetime).startOf('day');
      
      return !prevDay.isSame(currentDay);
    },
    showFeelsLike(forecast) {
      // Only show feels-like if it's significantly different from actual temp (>1°C difference)
      return Math.abs(forecast.main.temp - forecast.main.feels_like) > 1;
    },    async fetchData() {
      try {
        await this.$store.dispatch("fetchForecast");
      } catch (error) {
        console.error("Failed to fetch hourly forecast data:", error);
      }
    },
    scrollLeft() {
      if (this.$refs.scrollContainer) {
        this.$refs.scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
      }
    },
    scrollRight() {
      if (this.$refs.scrollContainer) {
        this.$refs.scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
/* Container styling */
.hourly-forecast-container {
  max-width: 900px;
  margin: 25px auto;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
}

/* Header styling */
.hourly-header {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.hourly-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}

.hourly-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hourly-updated {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-right: 10px;
}

.scroll-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.scroll-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Loading state */
.hourly-loading {
  padding: 30px 20px;
  background: linear-gradient(to bottom, #fdf2f8, #f5f3ff);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hourly-loading-container {
  width: 100%;
  overflow: hidden;
}

.hourly-skeleton-container {
  display: flex;
  gap: 20px;
  padding: 10px 0;
}

.hourly-skeleton {
  min-width: 150px;
  height: 180px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
}

.hourly-skeleton::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.5s infinite;
}

.skeleton-time {
  width: 60%;
  height: 20px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-icon {
  width: 50px;
  height: 50px;
  background: #e2e8f0;
  border-radius: 50%;
  margin: 10px 0;
}

.skeleton-temp {
  width: 70%;
  height: 25px;
  background: #e2e8f0;
  border-radius: 4px;
  margin: 10px 0;
}

.skeleton-detail {
  width: 80%;
  height: 15px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.hourly-loading-text {
  color: #64748b;
  margin-top: 20px;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Scrollable container */
.hourly-forecast-scroll {
  padding: 25px;
  overflow-x: auto;
  background: linear-gradient(to bottom, #fdf2f8, #f5f3ff);
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
  scroll-behavior: smooth;
}

.hourly-forecast-scroll::-webkit-scrollbar {
  height: 8px;
}

.hourly-forecast-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.hourly-forecast-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}

/* Hourly cards container */
.hourly-forecast {
  display: flex;
  gap: 20px;
  min-width: max-content;
}

/* Individual hour card */
.hourly-card {
  min-width: 150px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hourly-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}

.hourly-card.current-hour {
  background: linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  border: 2px solid rgba(139, 92, 246, 0.3);
  transform: scale(1.05);
}

.hourly-card.current-hour::before {
  content: 'Now';
  position: absolute;
  top: 0;
  right: 0;
  background: #8b5cf6;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-bottom-left-radius: 10px;
}

/* Time display */
.hour-time {
  font-weight: 700;
  font-size: 1.1rem;
  color: #8b5cf6;
  margin-bottom: 5px;
}

.hour-day {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 10px;
  font-weight: 500;
}

/* Weather icon */
.hour-icon {
  margin: 10px 0;
}

.hour-icon img {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* Temperature */
.hour-temp {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 5px 0;
}

.hour-feels-like {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
}

.hour-description {
  font-size: 0.9rem;
  color: #4b5563;
  text-transform: capitalize;
  margin-bottom: 10px;
}

/* Additional weather details */
.hour-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #64748b;
}

.hour-precipitation {
  font-size: 0.85rem;
  color: #3b82f6;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.hour-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.hour-details i {
  color: #8b5cf6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hourly-card {
    min-width: 130px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .hourly-card {
    min-width: 110px;
    padding: 12px;
  }
  
  .hour-time {
    font-size: 1rem;
  }
  
  .hour-temp {
    font-size: 1.2rem;
  }
}
</style>
