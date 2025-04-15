
import DailyForecast from "./DailyForecast.js";
import WeatherParser from "./WeatherParser.js";

const apikey = process.env.API_KEY;

//Helper functions to make enhance readability and reusability
//const buildGeoUrl = (zip) => `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&${apikey}`;
//const buildWeatherUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&${apikey}`;

export default class Controller {
    constructor(apikey) {
        this.apikey = apikey;
    }

    buildGeoUrl(zip) { 
        return `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${this.apikey}`; 
    }
    buildWeatherUrl(lat, lon) { 
        return `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${this.apikey}`; 
    }

  //  async fetchLatLon(zip) {
  //     try {
  //       const response = await fetch(this.buildGeoUrl(zip));
  //       if (!response.ok) throw new Error("Failed to fetch geolocation data.");
  //       return await response.json();

  //     } catch (error) {
  //       console.error("Error in fetchLatLon:", error.message);
  //       return null;
  //     }
  //   }

  //  async fetchRawData(lat, lon) {
  //  try {
  //    const response = await fetch(this.buildWeatherUrl(lat, lon));
  //    if (!response.ok) throw new Error("Failed to fetch weather data.");
  //    return await response.json();


  //  } catch (error) {
  //    console.error("Error in fetchRawData:", error.message);
  //    return null;
  //  }
  //}

    async fetchForecast(zip) {
    try {
      //Extracting geolocation data with zipcode
      const getLatLon = await fetch(this.buildGeoUrl(zip));

      if (!getLatLon.ok) throw new Error("Failed to fetch geolocation data.");
      const geoData = await getLatLon.json();

      //Extracting latitude and longitude from geolocation data
      const { lat, lon, } = geoData;

      //Using the lat and lon data to fetch raw weather data from api
      const fetchWeatherData = await fetch(this.buildWeatherUrl(lat,lon));
      if (!fetchWeatherData.ok) throw new Error("Failed to fetch weather data.");
      const weatherData = await fetchWeatherData.json();

      //Calls parseForecast from the model and returns it to the view
      //return parseForecast(weatherData.list);
        
      let parser = new WeatherParser(weatherData.list);
        console.log(parser);

        return parser.finalArray;

    } catch (err) {
      console.error("Error in fetchForecast:", err);
      throw err;
    }
  }
}



