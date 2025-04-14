export default class WeatherParser {
    grouped;
    constructor(forecast) {
        function GroupBy(obj) {

            //translate dt to JS date
            let dt = new Date(obj.dt * 1000);

            //make a date with format month.day
            let month = dt.getMonth();
            let day = dt.getDate();
            let key = month + "." + day;

            return key;
        }
        this.grouped = Object.groupBy(forecast, GroupBy);

        // mock up what this object looks like, so you know how you're going to be accessing it.
        /* 

        {
            month1.day1: [{forecastItem1}, {forecastItem1}, {forecastItem1}],
            month2.day2: [{forecastItem2}, {forecastItem2}, {forecastItem2}],
        }
        
        */
    }
}
