

class DailyForecast {

        oneDay.dt = new Date(forecast[i + NOON].dt * 1000);
      oneDay.temp = forecast[i + NOON].main.temp;
      oneDay.minTemp = findMinTemp(forecast, i);
      oneDay.maxTemp = findMaxTemp(forecast, i);
      oneDay.morningTemp = forecast[i + MORNING].main.temp;
      oneDay.dayTemp = forecast[i + DAY].main.temp;
      oneDay.eveningTemp = forecast[i + EVENING].main.temp;
      oneDay.nightTemp = forecast[i + NIGHT].main.temp;
      oneDay.description = forecast[i + NOON].weather[0].description;
      oneDay.icon = forecast[i + NOON].weather[0].icon;
      oneDay.pressure = forecast[i + NOON].main.pressure;
      oneDay.wind = forecast[i + NOON].wind.speed;
      oneDay.humidity = forecast[i + NOON].main.humidity;



    static NOON = 4;
    static SIXAM = 2;
    static SIXPM = 6;
    static NINEPM = 7;
    static MORNING = DailyForecast.SIXAM;
    static DAY = DailyForecast.NOON;
    static EVENING = DailyForecast.SIXPM;
    static NIGHT = DailyForecast.NINEPM;
    static PERDAY = 8;
    static DAYS = 4;



    constructor(data) {

        this.data = data;
    }


    // This would never actually get used.  Deprecate. 
    getTemp() {

        // throw DataNotFoundError("No data found for this date.");
        //return forecast[i + NOON].main.temp;
    }


    getLow() {

        let lowTemps = this.data.map((day) => {
            return day.main.temp_min;
        });

        return Math.min(...lowTemps);
    }


    getHigh() {

        let highTemps = this.data.map((day) => {
            return day.main.temp_max;
        });

        return Math.max(...highTemps);
    }


    // We need an algorithm to find one or more data points that meet some creiteria around timestamp
    // For example, if the timestamp is 12:00, we want to find the data points that are closest to 12:00.
    getDataByHour(hours) {
        return this.data.filter((hours) => {
            let dt = new Date(hours.dt * 1000);
            let hours = dt.getHours();

            return hours === hours;
        });
    }

    getMorningTemp() {

        // Get any data points that are representative of "morning" (6am)
        let data = this.getData(DailyForecast.SIXAM);
        data = data[0];

        return data.main.temp;
    }


    getDayTemp() {
        // Get any data points that are representative of "morning" (6am)
        let data = this.getData(DailyForecast.NOON);
        data = data[0];

        return data.main.temp;
    }
    getEveningTemp() {
        // Get any data points that are representative of "morning" (6am)
        let data = this.getData(DailyForecast.SIXPM);
        data = data[0];

        return data.main.temp;
    }


    getNightTemp() {
        // Get any data points that are representative of "morning" (6am)
        let data = this.getData(DailyForecast.NINEPM);
        data = data[0];

        return data.main.temp;
    }


    getDescription() {
        return this.data[i + NOON].weather[0].description;
    }
    getIcon() {
        return this.data[i + NOON].weather[0].icon;
    }
    getPressure() {
        return this.data[i + NOON].main.pressure;
    }
    getWind() {
        return this.data[i + NOON].wind.speed;
    }
    getHumidity() {
        return this.data[i + NOON].main.humidity;
    }



}
