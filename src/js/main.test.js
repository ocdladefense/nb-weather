//test Dates.js imports
import { getDate, getWeekday } from "./dates";

//test Parser imports
import WeatherPaser from "./WeatherParser";
//import data.json from "../data"; //unsure how to import

//test forecast imports
import DailyForecast from "./DailyForecast";

//test API imports
import Controller from "./Controller";

test('getDate correctly converts unix Timestamp', () => {
    const date = getDate(1744750800)
    expect(date.getDate()).toBe(15);
});

test('getWeekday returns correct day of the week', () => {
    const date = new Date("2025-04-15");
    expect(getWeekday(date)).toBe("Tuesday");
});

//proves weatherparser makes groups
test('WeatherParser groups forecast data', () => {
    const parser = new WeatherParser(mockData.list);
    expect(Object.keys(parser.grouped).length).toBeGreaterThan(0);
})

//proves dailyforecast will display correct weather details from a grouped forecast
test('DailyForecast gets correct temp ranges', () => {
    const mockData = [{ main: { temp_min: 40, temp_max: 60 }, main: { temp_min: 35, temp_max: 55 }}];
    const forecast = new DailyForecast(mockData);
    expect(forecast.getLow()).toBe(35);
    expect(forecast.getHigh()).toBe(60);
})

//proves API returns correct URL to call fetch
test('Controller gets correct API URL for geolocation', () => {
    const API_KEY = process.env.API_KEY;
    const controller = new Controller(API_KEY);
    expect(controller.buildGeoUrl("97405")).toBe("http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&API_KEY") //add key
})


