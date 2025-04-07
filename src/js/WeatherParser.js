class WeatherParser {
    grouped;
    constructor(forecast) {
        function GroupBy(obj) {

            //translate dt to JS date
            let dt = new Date(data[i].dt * 1000);

            //make a date with format month.day
            let month = dt.getMonth();
            let day = dt.getDay();
            let key = month + "." + day;

            return key;
        }
        this.grouped = forecast.groupBy(GroupBy);
    }
}