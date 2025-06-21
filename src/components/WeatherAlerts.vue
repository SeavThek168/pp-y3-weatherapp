<template>
  <div class="weather-alerts-card">
    <div v-if="hasAlerts" class="card-content">
      <div 
        v-for="(alert, index) in weatherAlerts" 
        :key="index" 
        class="alert-item"
        :class="getAlertSeverityClass(alert.event)"
      >
        <div class="alert-header" @click="toggleAlert(index)">
          <div class="alert-icon">
            <i :class="getAlertIcon(alert.event)"></i>
          </div>
          <div class="alert-title">
            <h4>{{ alert.event }}</h4>
            <span class="alert-source">{{ alert.sender_name }}</span>
          </div>
          <div class="alert-toggle">
            <i :class="expandedAlerts.includes(index) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          </div>
        </div>
        
        <div v-show="expandedAlerts.includes(index)" class="alert-body">
          <div class="alert-time">
            <div>
              <i class="far fa-clock me-1"></i>
              <span>Start: {{ formatAlertTime(alert.start) }}</span>
            </div>
            <div>
              <i class="fas fa-hourglass-end me-1"></i>
              <span>End: {{ formatAlertTime(alert.end) }}</span>
            </div>
          </div>
          
          <div class="alert-description">
            {{ alert.description }}
          </div>
          
          <div class="alert-tags">
            <span v-if="alert.tags && alert.tags.length" 
                  v-for="tag in alert.tags"
                  :key="tag"
                  class="alert-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="no-alerts">
      <i class="fas fa-check-circle"></i>
      <p>No weather alerts for this location</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "WeatherAlerts",
  setup() {
    const store = useStore();
    const expandedAlerts = ref([]);
      const weatherAlerts = computed(() => {
      // If we have actual alerts from the API, use them
      if (store.state.weatherAlerts && store.state.weatherAlerts.length > 0) {
        return store.state.weatherAlerts;
      }
      
      // If One Call API is not available, generate alerts based on current weather conditions
      if (store.state.weather) {
        const weather = store.state.weather;
        const weatherId = weather.weather?.[0]?.id;
        const alerts = [];
        
        // Create synthetic alerts based on weather conditions
        if (weatherId) {
          const now = Math.floor(Date.now() / 1000);
          const oneDay = 24 * 60 * 60;
          
          // Thunderstorm conditions
          if (weatherId >= 200 && weatherId < 300) {
            alerts.push({
              sender_name: 'Weather App (Auto-Generated)',
              event: 'Thunderstorm Warning',
              start: now,
              end: now + oneDay,
              description: 'Thunderstorms detected in the area. Take caution and seek shelter if outdoors.',
              tags: ['thunderstorm', 'lightning']
            });
          }
          
          // Heavy rain
          if (weatherId >= 502 && weatherId < 600) {
            alerts.push({
              sender_name: 'Weather App (Auto-Generated)',
              event: 'Heavy Rain Alert',
              start: now,
              end: now + oneDay,
              description: 'Heavy rain may cause local flooding and reduced visibility. Drive with caution.',
              tags: ['rain', 'flood']
            });
          }
          
          // Snow
          if (weatherId >= 600 && weatherId < 700) {
            alerts.push({
              sender_name: 'Weather App (Auto-Generated)',
              event: 'Snow Advisory',
              start: now,
              end: now + oneDay,
              description: 'Snow may cause slippery roads and reduced visibility. Plan your travel accordingly.',
              tags: ['snow', 'winter']
            });
          }
          
          // Extreme temperature (hot)
          if (weather.main?.temp > 35) {
            alerts.push({
              sender_name: 'Weather App (Auto-Generated)',
              event: 'Heat Advisory',
              start: now,
              end: now + oneDay,
              description: 'Very high temperatures expected. Stay hydrated and avoid extended exposure to direct sunlight.',
              tags: ['heat', 'health']
            });
          }
          
          // Extreme temperature (cold)
          if (weather.main?.temp < 0) {
            alerts.push({
              sender_name: 'Weather App (Auto-Generated)',
              event: 'Freeze Warning',
              start: now,
              end: now + oneDay,
              description: 'Freezing temperatures expected. Protect sensitive vegetation and exposed pipes.',
              tags: ['cold', 'freeze']
            });
          }
        }
        
        return alerts;
      }
      
      return [];
    });
    
    const hasAlerts = computed(() => {
      return weatherAlerts.value && weatherAlerts.value.length > 0;
    });
    
    const toggleAlert = (index) => {
      if (expandedAlerts.value.includes(index)) {
        expandedAlerts.value = expandedAlerts.value.filter(i => i !== index);
      } else {
        expandedAlerts.value.push(index);
      }
    };
    
    const formatAlertTime = (timestamp) => {
      if (!timestamp) return 'N/A';
      return new Date(timestamp * 1000).toLocaleString();
    };
    
    const getAlertSeverityClass = (eventType) => {
      const lowEvents = ['Flood Watch', 'Wind Advisory', 'Fog Advisory', 'Heat Advisory'];
      const mediumEvents = ['Thunderstorm Watch', 'Freeze Warning', 'Winter Weather Advisory', 'Dense Fog Advisory'];
      const highEvents = ['Tornado Warning', 'Hurricane Warning', 'Severe Thunderstorm Warning', 'Flash Flood Warning', 'Blizzard Warning'];
      
      const eventLower = eventType.toLowerCase();
      
      if (highEvents.some(e => eventLower.includes(e.toLowerCase()))) {
        return 'alert-severe';
      } else if (mediumEvents.some(e => eventLower.includes(e.toLowerCase()))) {
        return 'alert-warning';
      } else if (lowEvents.some(e => eventLower.includes(e.toLowerCase()))) {
        return 'alert-advisory';
      }
      
      // Default based on certain words in the event description
      if (eventLower.includes('warning')) {
        return 'alert-warning';
      } else if (eventLower.includes('watch')) {
        return 'alert-advisory';
      }
      
      return 'alert-info';
    };
    
    const getAlertIcon = (eventType) => {
      const eventLower = eventType.toLowerCase();
      
      if (eventLower.includes('tornado')) {
        return 'fas fa-wind';
      } else if (eventLower.includes('thunderstorm')) {
        return 'fas fa-bolt';
      } else if (eventLower.includes('flood')) {
        return 'fas fa-water';
      } else if (eventLower.includes('snow') || eventLower.includes('winter') || eventLower.includes('blizzard')) {
        return 'far fa-snowflake';
      } else if (eventLower.includes('heat')) {
        return 'fas fa-temperature-high';
      } else if (eventLower.includes('cold') || eventLower.includes('freeze')) {
        return 'fas fa-temperature-low';
      } else if (eventLower.includes('fog')) {
        return 'fas fa-smog';
      } else if (eventLower.includes('hurricane') || eventLower.includes('tropical storm')) {
        return 'fas fa-hurricane';
      } else if (eventLower.includes('fire')) {
        return 'fas fa-fire';
      }
      
      return 'fas fa-exclamation-triangle';
    };
    
    return {
      weatherAlerts,
      hasAlerts,
      expandedAlerts,
      toggleAlert,
      formatAlertTime,
      getAlertSeverityClass,
      getAlertIcon
    };
  }
};
</script>

<style scoped>
.weather-alerts-card {
  background: var(--card-bg, white);
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.alert-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 5px solid;
}

.alert-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
}

.alert-severe {
  border-left-color: #f44336;
  background: rgba(244, 67, 54, 0.05);
}

.alert-warning {
  border-left-color: #ff9800;
  background: rgba(255, 152, 0, 0.05);
}

.alert-advisory {
  border-left-color: #ffeb3b;
  background: rgba(255, 235, 59, 0.05);
}

.alert-info {
  border-left-color: #2196f3;
  background: rgba(33, 150, 243, 0.05);
}

.alert-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.alert-header:hover {
  background: rgba(0, 0, 0, 0.02);
}

.alert-icon {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.alert-severe .alert-icon {
  color: #f44336;
}

.alert-warning .alert-icon {
  color: #ff9800;
}

.alert-advisory .alert-icon {
  color: #ffeb3b;
}

.alert-info .alert-icon {
  color: #2196f3;
}

.alert-title {
  flex: 1;
}

.alert-title h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.alert-source {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.alert-toggle {
  color: var(--text-secondary);
  padding: 0.5rem;
}

.alert-body {
  padding: 0 1rem 1rem;
  border-top: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-time {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.alert-description {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 1rem 0;
  color: var(--text-primary);
  white-space: pre-line;
}

.alert-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.alert-tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-gradient);
  border-radius: 12px;
  color: var(--text-secondary);
}

.no-alerts {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
  text-align: center;
}

.no-alerts i {
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.no-alerts p {
  font-size: 1.1rem;
  margin: 0;
}
</style>
