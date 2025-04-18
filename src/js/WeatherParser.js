import DailyForecast from "./DailyForecast";

export default class WeatherParser {
    grouped;
    finalArray;
    constructor(forecast, name) {
        this.forecast = forecast;
        this.name = name;
    }

    GroupBy(obj) {
        //translate dt to JS date
        let dt = new Date(obj.dt * 1000);

        //make a date with format month.day
        let month = dt.getMonth();
        let day = dt.getDate();
        let key = month + "." + day;

        return key;
    }

    parse() {
        if (!Array.isArray(this.forecast)) {
            console.error("invalid forecast data");
        }

        this.grouped = Object.groupBy(this.forecast, this.GroupBy.bind(this));
    }

    getAsDailyForecast() {
        if (!this.grouped || Object.keys(this.grouped).length == 0) {
            console.error("Grouped data is missing or empty")
        }

        this.finalArray = [];
        for (let day in this.grouped) {
            let foo = this.grouped[day];
            this.finalArray.push(new DailyForecast(foo, this.name));
        }
        return this.finalArray
    }
}
