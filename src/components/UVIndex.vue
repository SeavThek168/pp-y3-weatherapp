<template>
  <div class="uv-index-card">
    <div class="card-content">
      <div class="uv-index-meter">
        <svg viewBox="0 0 120 120" class="uv-gauge">
          <!-- UV Index Scale Background -->
          <path 
            d="M60,60 L60,10 A50,50 0 0,1 110,60 Z" 
            class="uv-gauge-low" />
          <path 
            d="M60,60 L110,60 A50,50 0 0,1 85,102 Z" 
            class="uv-gauge-moderate" />
          <path 
            d="M60,60 L85,102 A50,50 0 0,1 35,102 Z" 
            class="uv-gauge-high" />
          <path 
            d="M60,60 L35,102 A50,50 0 0,1 10,60 Z" 
            class="uv-gauge-very-high" />
          <path 
            d="M60,60 L10,60 A50,50 0 0,1 60,10 Z" 
            class="uv-gauge-extreme" />
            
          <!-- Indicator Needle -->
          <line 
            x1="60" y1="60" 
            x2="60" y2="20" 
            class="uv-gauge-needle"
            :style="{ transform: `rotate(${uvIndexRotation}deg)` }" 
            transform-origin="60 60"
          />
          
          <!-- Center point -->
          <circle cx="60" cy="60" r="5" class="uv-gauge-center" />
        </svg>
        
        <div class="uv-value">
          <div class="value">{{ uvIndex }}</div>
          <div class="label" :class="uvIndexClass">{{ uvIndexText }}</div>
        </div>
      </div>
      
      <div class="uv-scale">
        <span class="scale-item low">0-2<br>Low</span>
        <span class="scale-item moderate">3-5<br>Moderate</span>
        <span class="scale-item high">6-7<br>High</span>
        <span class="scale-item very-high">8-10<br>Very High</span>
        <span class="scale-item extreme">11+<br>Extreme</span>
      </div>
      
      <div class="uv-protection">
        <div class="protection-header">
          <i class="fas fa-shield-alt me-2"></i>
          <span>Protection recommended</span>
        </div>
        <ul class="protection-list">
          <template v-if="uvIndex <= 2">
            <li><i class="fas fa-check"></i> Minimal protection required</li>
            <li><i class="fas fa-check"></i> Safe for most skin types</li>
          </template>
          
          <template v-else-if="uvIndex <= 5">
            <li><i class="fas fa-check"></i> Wear sunscreen SPF 30+</li>
            <li><i class="fas fa-check"></i> Seek shade during midday hours</li>
          </template>
          
          <template v-else-if="uvIndex <= 7">
            <li><i class="fas fa-exclamation-triangle"></i> Wear SPF 30+ sunscreen</li>
            <li><i class="fas fa-exclamation-triangle"></i> Cover up with hat & sunglasses</li>
            <li><i class="fas fa-exclamation-triangle"></i> Limit sun exposure between 10AM-4PM</li>
          </template>
          
          <template v-else>
            <li><i class="fas fa-radiation"></i> Wear SPF 50+ sunscreen</li>
            <li><i class="fas fa-radiation"></i> Protective clothing essential</li>
            <li><i class="fas fa-radiation"></i> Avoid sun exposure between 10AM-4PM</li>
            <li><i class="fas fa-radiation"></i> Seek shade when outdoors</li>
          </template>
        </ul>
      </div>
      
      <p class="uv-info">
        <i class="fas fa-info-circle me-2"></i>
        UV predictions updated hourly from solar radiation measurements
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "UVIndex",
  setup() {
    const store = useStore();
    
    const uvIndex = computed(() => {
      return store.getters.uvIndex !== null ? store.getters.uvIndex : 0;
    });
    
    const uvIndexText = computed(() => {
      const index = uvIndex.value;
      if (index <= 2) return 'Low';
      if (index <= 5) return 'Moderate';
      if (index <= 7) return 'High';
      if (index <= 10) return 'Very High';
      return 'Extreme';
    });
    
    const uvIndexClass = computed(() => {
      const index = uvIndex.value;
      if (index <= 2) return 'low';
      if (index <= 5) return 'moderate';
      if (index <= 7) return 'high';
      if (index <= 10) return 'very-high';
      return 'extreme';
    });
    
    // Calculate the rotation angle for the UV index meter needle
    // Scale is from 0 to 11+ (we cap at 12 for calculation)
    // Angle range is 240 degrees (from -120 to +120)
    const uvIndexRotation = computed(() => {
      const maxUV = 12;
      const index = Math.min(uvIndex.value, maxUV);
      // Convert to degrees on a 240 degree scale, centered at -120
      return -120 + (index / maxUV) * 240;
    });
    
    return {
      uvIndex,
      uvIndexText,
      uvIndexClass,
      uvIndexRotation
    };
  }
};
</script>

<style scoped>
.uv-index-card {
  background: var(--card-bg, white);
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
}

.uv-index-meter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
}

.uv-gauge {
  width: 150px;
  height: 150px;
}

.uv-gauge-low {
  fill: #4caf50;
}

.uv-gauge-moderate {
  fill: #ffeb3b;
}

.uv-gauge-high {
  fill: #ff9800;
}

.uv-gauge-very-high {
  fill: #f44336;
}

.uv-gauge-extreme {
  fill: #9c27b0;
}

.uv-gauge-needle {
  stroke: var(--text-primary, #333);
  stroke-width: 4;
  stroke-linecap: round;
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.uv-gauge-center {
  fill: var(--text-primary, #333);
}

.uv-value {
  text-align: center;
}

.uv-value .value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  color: var(--text-primary);
}

.uv-value .label {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 12px;
  margin-top: 5px;
  display: inline-block;
}

.uv-value .low {
  background-color: rgba(76, 175, 80, 0.15);
  color: #4caf50;
}

.uv-value .moderate {
  background-color: rgba(255, 235, 59, 0.15);
  color: #d6b600;
}

.uv-value .high {
  background-color: rgba(255, 152, 0, 0.15);
  color: #ff9800;
}

.uv-value .very-high {
  background-color: rgba(244, 67, 54, 0.15);
  color: #f44336;
}

.uv-value .extreme {
  background-color: rgba(156, 39, 176, 0.15);
  color: #9c27b0;
}

.uv-scale {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.7rem;
  text-align: center;
}

.uv-scale .scale-item {
  flex: 1;
  border-radius: 4px;
  padding: 0.25rem 0;
  font-weight: 500;
  line-height: 1.2;
}

.uv-scale .low {
  color: #4caf50;
}

.uv-scale .moderate {
  color: #d6b600;
}

.uv-scale .high {
  color: #ff9800;
}

.uv-scale .very-high {
  color: #f44336;
}

.uv-scale .extreme {
  color: #9c27b0;
}

.uv-protection {
  background: var(--card-bg-accent, rgba(248, 250, 252, 0.5));
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
  border: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

.protection-header {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.protection-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.protection-list li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.protection-list li i {
  position: absolute;
  left: 0;
  top: 0.2rem;
}

.protection-list li i.fa-check {
  color: #4caf50;
}

.protection-list li i.fa-exclamation-triangle {
  color: #ff9800;
}

.protection-list li i.fa-radiation {
  color: #f44336;
}

.uv-info {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
