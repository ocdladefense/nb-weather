const apikey = process.env.API_KEY;

// Helper functions to build URLs
const buildGeoUrl = (zip) => http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&${apikey};
const buildWeatherUrl = (lat, lon) => https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&${apikey};


export default class Controller {
  async fetchLatLon(zip) {
    try {
      const response = await fetch(buildGeoUrl(zip));
      if (!response.ok) throw new Error("Failed to fetch geolocation data.");
      return await response.json();
    } catch (error) {
      console.error("Error in fetchLatLon:", error.message);
      return null;
    }
  }

  async fetchRawData(lat, lon) {
    try {
      const response = await fetch(buildWeatherUrl(lat, lon));
      if (!response.ok) throw new Error("Failed to fetch weather data.");
      return await response.json();
    } catch (error) {
      console.error("Error in fetchRawData:", error.message);
      return null;
    }
  }

  parseForecast(weatherData) {
    console.log(weatherData); // Replace with actual parsing logic
  }
}
