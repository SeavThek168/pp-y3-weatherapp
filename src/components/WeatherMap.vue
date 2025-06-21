<template>
  <div class="weather-map-card">
    <div class="map-controls">
      <div class="layer-selectors">
        <button 
          v-for="layer in layerOptions" 
          :key="layer.id"
          :class="['layer-btn', { active: activeLayer === layer.id }]"
          @click="setActiveLayer(layer.id)"
        >
          <i :class="layer.icon"></i>
          <span>{{ layer.label }}</span>
        </button>
      </div>
    </div>
    
    <div id="weather-map" class="map-container"></div>
    
    <div class="map-legend">
      <div v-if="activeLayer === 'temp'" class="legend-temp">
        <div class="legend-title">Temperature (°C)</div>
        <div class="legend-colors">
          <div class="color-item" style="background: #4575b4;">-40</div>
          <div class="color-item" style="background: #74add1;">-30</div>
          <div class="color-item" style="background: #abd9e9;">-20</div>
          <div class="color-item" style="background: #e0f3f8;">-10</div>
          <div class="color-item" style="background: #ffffbf;">0</div>
          <div class="color-item" style="background: #fee090;">10</div>
          <div class="color-item" style="background: #fdae61;">20</div>
          <div class="color-item" style="background: #f46d43;">30</div>
          <div class="color-item" style="background: #d73027;">40</div>
        </div>
      </div>
      
      <div v-else-if="activeLayer === 'precipitation'" class="legend-precip">
        <div class="legend-title">Precipitation (mm/h)</div>
        <div class="legend-colors">
          <div class="color-item" style="background: #ffffff;">0</div>
          <div class="color-item" style="background: #d0d1e6;">0.5</div>
          <div class="color-item" style="background: #74add1;">2</div>
          <div class="color-item" style="background: #4575b4;">10</div>
          <div class="color-item" style="background: #313695;">30</div>
        </div>
      </div>
      
      <div v-else-if="activeLayer === 'clouds'" class="legend-clouds">
        <div class="legend-title">Cloud Coverage (%)</div>
        <div class="legend-colors">
          <div class="color-item" style="background: #ffffff;">0</div>
          <div class="color-item" style="background: #f0f0f0;">20</div>
          <div class="color-item" style="background: #d9d9d9;">40</div>
          <div class="color-item" style="background: #bdbdbd;">60</div>
          <div class="color-item" style="background: #969696;">80</div>
          <div class="color-item" style="background: #525252;">100</div>
        </div>
      </div>
      
      <div v-else class="legend-wind">
        <div class="legend-title">Wind Speed (m/s)</div>
        <div class="legend-colors">
          <div class="color-item" style="background: #ffffff;">0</div>
          <div class="color-item" style="background: #e6f2e0;">5</div>
          <div class="color-item" style="background: #b2e2b2;">10</div>
          <div class="color-item" style="background: #66c266;">15</div>
          <div class="color-item" style="background: #2ca25f;">20</div>
          <div class="color-item" style="background: #006837;">25+</div>
        </div>
      </div>
    </div>
    
    <div class="map-footer">
      <span>
        <i class="fas fa-info-circle me-1"></i>
        Map data © OpenWeatherMap
      </span>
      <span>Last updated: {{ lastUpdated }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import 'leaflet/dist/leaflet.css';

export default {
  name: "WeatherMap",
  setup() {
    const store = useStore();
    let map = null;
    let tileLayer = null;
    
    const activeLayer = ref('temp');
    const mapInitialized = ref(false);
    
    const layerOptions = [
      { id: 'temp', label: 'Temperature', icon: 'fas fa-temperature-high' },
      { id: 'precipitation', label: 'Precipitation', icon: 'fas fa-cloud-rain' },
      { id: 'clouds', label: 'Clouds', icon: 'fas fa-cloud' },
      { id: 'wind', label: 'Wind', icon: 'fas fa-wind' }
    ];
    
    const lastUpdated = computed(() => {
      return new Date().toLocaleTimeString();
    });
    
    const location = computed(() => {
      return store.state.selectedLocation;
    });
    
    const initMap = () => {
      if (mapInitialized.value) return;
      
      // Import Leaflet dynamically to avoid SSR issues
      import('leaflet').then((L) => {
        if (!document.getElementById('weather-map')) return;
        
        // Create map centered at current location or default to New York
        const defaultLat = 40.7128;
        const defaultLon = -74.006;
        
        map = L.map('weather-map').setView(
          [location.value?.lat || defaultLat, location.value?.lon || defaultLon], 
          8
        );
        
        // Add OpenStreetMap base layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(map);
        
        // Add initial weather layer
        addWeatherLayer(activeLayer.value);
        
        // Add marker for current location
        if (location.value) {
          L.marker([location.value.lat, location.value.lon])
            .addTo(map)
            .bindPopup(location.value.display || 'Selected Location');
        }
        
        mapInitialized.value = true;
      });
    };
    
    const addWeatherLayer = (layerId) => {
      if (!map) return;
      
      // If there's an existing tile layer, remove it
      if (tileLayer) {
        map.removeLayer(tileLayer);
      }
      
      // API Key
      const API_KEY = process.env.VUE_APP_WEATHER_API_KEY || "ffebb6d220be97c63c7cf84998a7af7f";
      
      // Define layer URL based on selected type
      let layerUrl = '';
      
      switch (layerId) {
        case 'temp':
          layerUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
          break;
        case 'precipitation':
          layerUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
          break;
        case 'clouds':
          layerUrl = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
          break;
        case 'wind':
          layerUrl = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
          break;
        default:
          layerUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
      }
      
      // Add the selected weather layer
      import('leaflet').then((L) => {
        tileLayer = L.tileLayer(layerUrl, {
          attribution: 'Map data &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
          maxZoom: 18,
          opacity: 0.7
        }).addTo(map);
      });
    };
    
    const setActiveLayer = (layerId) => {
      activeLayer.value = layerId;
      
      if (mapInitialized.value) {
        addWeatherLayer(layerId);
      }
    };
    
    // Watch for location changes to update map center
    watch(() => location.value, (newLocation) => {
      if (newLocation && map) {
        import('leaflet').then((L) => {
          // Update map center
          map.setView([newLocation.lat, newLocation.lon], 8);
          
          // Clear existing markers
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });
          
          // Add new marker
          L.marker([newLocation.lat, newLocation.lon])
            .addTo(map)
            .bindPopup(newLocation.display || 'Selected Location');
        });
      }
    });
    
    onMounted(() => {
      // Initialize map after component is mounted
      initMap();
    });
    
    onBeforeUnmount(() => {
      // Clean up map instance when component is unmounted
      if (map) {
        map.remove();
        map = null;
        mapInitialized.value = false;
      }
    });
    
    return {
      activeLayer,
      layerOptions,
      lastUpdated,
      setActiveLayer
    };
  }
};
</script>

<style scoped>
.weather-map-card {
  background: var(--card-bg, white);
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-controls {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

.layer-selectors {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.layer-btn {
  background: transparent;
  border: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.layer-btn:hover {
  background: var(--btn-hover-bg, rgba(99, 102, 241, 0.1));
}

.layer-btn.active {
  background: var(--accent-color, #6366f1);
  color: white;
  border-color: var(--accent-color, #6366f1);
}

.map-container {
  flex: 1;
  min-height: 400px;
  width: 100%;
  z-index: 1;
}

.map-legend {
  padding: 0.75rem 1rem;
  background: var(--card-bg, white);
  border-top: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

.legend-title {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
}

.legend-colors {
  display: flex;
  width: 100%;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
}

.color-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: rgba(0, 0, 0, 0.7);
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
}

.map-footer {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color, rgba(203, 213, 225, 0.5));
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .map-container {
    min-height: 300px;
  }
  
  .layer-selectors {
    justify-content: start;
  }
}
</style>
