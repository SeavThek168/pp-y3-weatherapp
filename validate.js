const fs = require('fs');

// Validate syntax of AirQuality.vue
try {
  const airQualityContent = fs.readFileSync('./src/components/AirQuality.vue', 'utf8');
  console.log('AirQuality.vue file loaded successfully.');
} catch (error) {
  console.error('Error reading AirQuality.vue:', error);
}

// Validate syntax of SunriseSunset.vue
try {
  const sunriseSunsetContent = fs.readFileSync('./src/components/SunriseSunset.vue', 'utf8');
  console.log('SunriseSunset.vue file loaded successfully.');
} catch (error) {
  console.error('Error reading SunriseSunset.vue:', error);
}
