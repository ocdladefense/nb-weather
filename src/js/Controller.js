
import DailyForecast from "./DailyForecast.js";
import WeatherParser from "./WeatherParser.js";

//const apikey = process.env.API_KEY;

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

    /* I was trying to incorporate the changed made by Orion but I don't have time right now but here is the code Orion wrote 

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
*/

//     async fetchForecast(zip) {
//     try {
//       //Extracting geolocation data with zipcode
//       const getLatLon = await fetch(this.buildGeoUrl(zip));

//       if (!getLatLon.ok) throw new Error("Failed to fetch geolocation data.");
//       const geoData = await getLatLon.json();

//       //Extracting latitude and longitude from geolocation data
//       const { lat, lon, } = geoData;

//       //Using the lat and lon data to fetch raw weather data from api
//       const fetchWeatherData = await fetch(this.buildWeatherUrl(lat,lon));
//       if (!fetchWeatherData.ok) throw new Error("Failed to fetch weather data.");
//       const weatherData = await fetchWeatherData.json();

//       //Calls parseForecast from the model and returns it to the view
//       //return parseForecast(weatherData.list);
        
//       let parser = new WeatherParser(weatherData.list);
//         //console.log(parser);
//         let finalArray = [];
//         for(let day in parser.grouped) {
//             let foo = parser.grouped[day];
//             finalArray.push(new DailyForecast(foo));
//         }
//         return finalArray;

//     } catch (err) {
//       console.error("Error in fetchForecast:", err);
//       throw err;
//     }
//   }
// }



 async fetchLatLon(zip) {
        try {
            const response = await fetch(this.buildGeoUrl(zip));
            if (!response.ok) throw new Error("Failed to fetch geolocation data.");
            let r = await response.json();
            console.log(r);
            return r;
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
        let err = "";
        if (!weatherData.list) {
            err = "No forecast available."
            console.log(err);
        }

        // if (!weatherData)

            try {
                
                // let parser = new WeatherParser(weatherData.list, name);
                // console.log(name);
                // console.log(parser.finalArray);
                // return parser.finalArray;

                let parser = new WeatherParser(weatherData.list, name);
                parser.parse(weatherData.list);
                let grouped = parser.getAsDailyForecast("")

                return grouped;

            } catch (err) {
                console.error("Error in fetchForecast:", err);
                throw err;
            }
    }

}
