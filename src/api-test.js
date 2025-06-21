// Simple script to test the OpenWeather API
const axios = require('axios');

const API_KEY = "16d7ffb7b81c1a8b609196ddd5bc6470";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

async function testAPI() {
  try {
    console.log('Testing OpenWeather API connectivity...');
    
    // Test the geocoding API
    console.log('1. Testing Geocoding API...');
    const geoResponse = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: 'London',
        limit: 1,
        appid: API_KEY
      }
    });
    console.log('✓ Geocoding API working! Results:', geoResponse.data);
    
    if (geoResponse.data && geoResponse.data.length > 0) {
      const { lat, lon } = geoResponse.data[0];
      
      // Test the current weather API
      console.log('\n2. Testing Current Weather API...');
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY
        }
      });
      console.log('✓ Current Weather API working! Status:', weatherResponse.status);
      
      // Test the One Call API
      console.log('\n3. Testing One Call API...');
      const oneCallResponse = await axios.get(`${BASE_URL}/onecall`, {
        params: {
          lat,
          lon,
          units: 'metric',
          exclude: 'minutely',
          appid: API_KEY
        }
      });
      console.log('✓ One Call API working! Status:', oneCallResponse.status);
    }
    
    console.log('\nAll API tests completed successfully!');
  } catch (error) {
    console.error('API Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    console.error('\nPossible issues:');
    console.error('1. Invalid API key');
    console.error('2. API key has restricted access or requires subscription');
    console.error('3. Network connectivity issues');
    console.error('4. API endpoint has changed or is unavailable');
  }
}

testAPI();
