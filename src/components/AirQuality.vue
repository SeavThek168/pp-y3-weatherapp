<template>
  <div class="air-quality-card" data-aos="fade-up">
    
    <div class="card-content">
      <!-- AQI status indicator -->
      <div class="aqi-status">
        <div class="aqi-meter">
          <div class="aqi-indicator" :style="{ transform: `rotate(${aqiRotation}deg)` }"></div>
          <div class="aqi-levels">
            <span class="level level-1">Good</span>
            <span class="level level-3">Moderate</span>
            <span class="level level-5">Poor</span>
          </div>
        </div>
        
        <div class="aqi-value">
          <div class="aqi-number">{{ aqiLevel }}</div>
          <div :class="['aqi-text', `aqi-${aqiLevel}`]">{{ aqiText }}</div>
        </div>
      </div>
      
      <!-- Air components grid -->
      <div class="air-components">
        <div 
          v-for="(value, key) in displayComponents" 
          :key="key" 
          class="component-item"
        >
          <div class="component-name">{{ formatComponentName(key) }}</div>
          <div class="component-value">{{ value }} μg/m³</div>
        </div>
      </div>
    </div>
    
    <!-- Footer with WHO info -->
    <div class="card-footer">
      <div class="aqi-info">
        <i class="fas fa-info-circle me-2"></i>
        <span>Based on WHO air quality guidelines</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AirQuality",
  data() {
    return {
      aqiList: ["Good", "Fair", "Moderate", "Unhealthy", "Poor", "Very Poor"],
      componentLabels: {
        co: "Carbon Monoxide",
        no: "Nitric Oxide",
        no2: "Nitrogen Dioxide",
        o3: "Ozone",
        so2: "Sulfur Dioxide",
        pm2_5: "PM2.5",
        pm10: "PM10",
        nh3: "Ammonia"
      }
    };
  },
  computed: {
    airQuality() {
      return this.$store.state.airQuality;
    },
    aqiLevel() {
      return this.airQuality?.list[0]?.main?.aqi || 1;
    },
    aqiText() {
      return this.aqiList[this.aqiLevel - 1];
    },
    aqiRotation() {
      // Calculate rotation for the AQI meter (from -60 to 60 degrees)
      const level = this.aqiLevel;
      const maxLevel = 5;
      return -60 + ((level - 1) / (maxLevel - 1)) * 120;
    },
    airComponents() {
      if (!this.airQuality) return {};
      return this.airQuality.list[0].components;
    },
    displayComponents() {
      // Select only the most important components to display
      const components = this.airComponents;
      const priorityKeys = ['pm2_5', 'pm10', 'o3', 'no2'];
      
      if (!components || Object.keys(components).length === 0) {
        return {
          pm2_5: '--',
          pm10: '--',
          o3: '--',
          no2: '--'
        };      }
      
      const result = {};
      priorityKeys.forEach(key => {
        result[key] = components[key] ? Math.round(components[key]) : '--';
      });
      
      return result;
    }
  },
  methods: {
    formatComponentName(key) {
      return this.componentLabels[key] || key;
    }
  }
};
</script>

<style scoped>
.air-quality-card {
  background: var(--card-bg, white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow, 0 10px 25px rgba(0, 0, 0, 0.06));
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.air-quality-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover, 0 10px 30px rgba(0, 0, 0, 0.1));
}

.card-header {
  padding: 16px 20px;
  color: var(--text-primary, #334155);
  border-bottom: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.card-header h3 i {
  color: var(--accent-color, #6366f1);
}

.card-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* AQI Meter Styles */
.aqi-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.aqi-meter {
  position: relative;
  width: 140px;
  height: 90px;
  overflow: hidden;
}

.aqi-meter::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140px;
  background: conic-gradient(
    from 180deg,
    #4caf50 0deg 60deg,  /* Good - green */
    #ffeb3b 60deg 90deg,  /* Fair - yellow */
    #ff9800 90deg 120deg,  /* Moderate - orange */
    #f44336 120deg 150deg,  /* Unhealthy - red */
    #9c27b0 150deg 180deg  /* Poor - purple */
  );
  border-radius: 50%;
  transform: translateY(50%);
}

.aqi-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 80px;
  background: white;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(0deg);
  z-index: 2;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.aqi-levels {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-5px);
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.6);
}

.aqi-value {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aqi-number {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.aqi-text {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 4px 12px;
  border-radius: 12px;
  margin-top: 4px;
}

/* AQI Text Colors */
.aqi-text.aqi-1 {
  background-color: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  box-shadow: 0 2px 10px rgba(76, 175, 80, 0.2);
}

.aqi-text.aqi-2 {
  background-color: rgba(255, 235, 59, 0.15);
  color: #d6b600;
  box-shadow: 0 2px 10px rgba(255, 235, 59, 0.2);
}

.aqi-text.aqi-3 {
  background-color: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  box-shadow: 0 2px 10px rgba(255, 152, 0, 0.2);
}

.aqi-text.aqi-4 {
  background-color: rgba(244, 67, 54, 0.15);
  color: #f44336;
  box-shadow: 0 2px 10px rgba(244, 67, 54, 0.2);
}

.aqi-text.aqi-5 {
  background-color: rgba(156, 39, 176, 0.15);
  color: #9c27b0;
  box-shadow: 0 2px 10px rgba(156, 39, 176, 0.2);
}

/* Air components grid */
.air-components {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.component-item {
  background: rgba(248, 250, 252, 0.5);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  border: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

.component-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  background: rgba(248, 250, 252, 0.8);
}

.component-name {
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
  margin-bottom: 4px;
}

.component-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary, #334155);
}

.card-footer {
  padding: 12px 20px;
  background: var(--footer-bg, rgba(248, 250, 252, 0.7));
  border-top: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
  margin-top: auto;
}

.aqi-info {
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
