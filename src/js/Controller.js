import parseForecast from "./weatherParsing.js";

const apikey = process.env.API_KEY;

//Helper functions to make enhance readability and reusability
const buildGeoUrl = (zip) => `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&${apikey}`;
const buildWeatherUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&${apikey}`;

export default class Controller {
  async fetchForecast(zip) {
    try {
      //Extracting geolocation data with zipcode
      const getLatLon = await fetch(buildGeoUrl(zip));

      if (!getLatLon.ok) throw new Error("Failed to fetch geolocation data.");
      const geoData = await getLatLon.json();

      //Extracting latitude and longitude from geolocation data
      const { lat, lon, } = geoData;

      //Using the lat and lon data to fetch raw weather data from api
      const fetchWeatherData = await fetch(buildWeatherUrl(lat,lon));
      if (!fetchWeatherData.ok) throw new Error("Failed to fetch weather data.");
      const weatherData = await fetchWeatherData.json();

      //Calls parseForecast from the model and returns it to the view
      return parseForecast(weatherData.list);
    } catch (err) {
      console.error("Error in fetchForecast:", err);
      throw err;
    }
  }
}
 