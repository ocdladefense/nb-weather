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

        // mock up what this object looks like, so you know how you're going to be accessing it.
    }
}
