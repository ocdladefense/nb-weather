import WeatherParser from "./WeatherParser.js";

const geoUrlString = "/geo/1.0/zip"
const weatherUrlString = "/data/2.5/forecast"
const openWeatherUrl = "http://api.openweathermap.org"

export default class Controller {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /*
    URLSearchParams takes in a object (params) and converts it to a URL query format
    Example: forecast?units=imperial&lat=${lat}&lon=${lon}&${apikey} after forecast? there is units=imperial&lat=${lat}&lon=${lon}&${apikey} this is a query string
    this data can be represented like: 
    {
    units : "imperial",
    lat: lat,
    lon: lon,
    appid: this.apiKey
    }
    and when that data is put through the class URLSearchParams it will convert the object key value pairs into this query string units=imperial rather than units : "imperial"
    */

    buildQueryString = (domain, path, params) => {
        const query = new URLSearchParams(params).toString();
        console.log(query);
        return `${domain}${path}?${query}`;
    };

    buildGeoUrl = (zip) => {
        return this.buildQueryString(openWeatherUrl, geoUrlString, {
            zip: `${zip},US`,
            appid: this.apiKey
        });
    };

    buildWeatherUrl = (lat, lon) => {
        return this.buildQueryString(openWeatherUrl, weatherUrlString, {
            units: "imperial",
            lat: lat,
            lon: lon,
            appid: this.apiKey
        });
    };

    async fetchLatLon(zip) {
        try {
            const response = await fetch(this.buildGeoUrl(zip));
            if (!response.ok) throw new Error("Failed to fetch geolocation data.");
            return await response.json();
        } catch (error) {
            console.error("Error in fetchLatLon:", error.message);
            return null;
        }
    }

    async fetchRawData(lat, lon) {
        try {
            const response = await fetch(this.buildWeatherUrl(lat, lon));
            if (!response.ok) throw new Error("Failed to fetch weather data.");
            return await response.json();
        } catch (error) {
            console.error("Error in fetchRawData:", error.message);
            return null;
        }
    }

    sendRawWeatherDataToParser(weatherData, name) {
        try {
            let parser = new WeatherParser(weatherData.list, name);
            parser.parse();
            let grouped = parser.getAsDailyForecast();
            return grouped;

        } catch (err) {
            console.error("Error in fetchForecast:", err);
            throw err;


        }
    }
}
