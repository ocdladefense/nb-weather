export default class DailyForecast {

    static MORNING = 6;
    static NOON = 12;
    static EVENING = 18;
    static NIGHT = 22;

    constructor(data, name) {
        this.data = data;
        this.name = name;
    }

    getLow() {
        return Math.min(...this.data.map(day => day.main.temp_min));
    }

    getHigh() {
        return Math.max(...this.data.map(day => day.main.temp_max));
    }

    // Helper: get hour from timestamp
    getHour(dt) {
        return new Date(dt * 1000).getHours();
    }

    // Finds the data point closest to the target hour
    getClosestDataToHour(targetHour) {
        let closest = this.data.reduce((prev, curr) => {
            let prevHourDiff = Math.abs(this.getHour(prev.dt) - targetHour);
            let currHourDiff = Math.abs(this.getHour(curr.dt) - targetHour);
            return currHourDiff < prevHourDiff ? curr : prev;
        });
        return closest;
    }

    getFormattedDate() {
        let date = new Date(this.data[0].dt * 1000);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    getCity() {
        return this.name;
    }

    getTempAt(partOfDay) {
        let data = this.getClosestDataToHour(partOfDay);
        return data?.main?.temp ?? 'N/A';
    }

    getMorningTemp() {
        return this.getTempAt(DailyForecast.MORNING);
    }

    getDayTemp() {
        return this.getTempAt(DailyForecast.NOON);
    }

    getEveningTemp() {
        return this.getTempAt(DailyForecast.EVENING);
    }

    getNightTemp() {
        return this.getTempAt(DailyForecast.NIGHT);
    }

    getDataPointAt(partOfDay) {
        return this.getClosestDataToHour(partOfDay);
    }

    getDescription() {
        let data = this.getDataPointAt(DailyForecast.NOON);
        return data?.weather?.[0]?.description ?? 'N/A';
    }

    getIcon() {
        let data = this.getDataPointAt(DailyForecast.NOON);
        let icon = data?.weather?.[0]?.icon ?? '';
        return icon ? `http://openweathermap.org/img/w/${icon}.png` : '';
    }

    getPressure() {
        let data = this.getDataPointAt(DailyForecast.NOON);
        return data?.main?.pressure ?? 'N/A';
    }

    getWind() {
        let data = this.getDataPointAt(DailyForecast.NOON);
        return data?.wind?.speed ?? 'N/A';
    }

    getHumidity() {
        let data = this.getDataPointAt(DailyForecast.NOON);
        return data?.main?.humidity ?? 'N/A';
    }
}
