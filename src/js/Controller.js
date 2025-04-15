import WeatherParser from "./WeatherParser.js";

const apikey = process.env.API_KEY;

// Helper functions to build URLs
const buildGeoUrl = (zip) => `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apikey}`;
const buildWeatherUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apikey}`;

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

    async sendRawWeatherDataToParser(weatherData) {
        try {
            let parser = new WeatherParser(weatherData.list);

            return parser.finalArray;

        } catch (err) {
            console.error("Error in fetchForecast:", err);
            throw err;


        }
    }
}
