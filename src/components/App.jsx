import React from 'react';
//import forecast from '../data/data.json';
/*

/// Components:
- App (Master Component);                                                                   Check[X]
- ZipCodeInput(A text input for the user to enter a zip code)                               Check[X]
- WeatherListItem  (A button that summarizes the high/low for a day; it's also selectable)   Check[]
- WeatherList (Parent component that displays all of the WeatherListItems)                  Check[]
- DailyForecastDetails currentday(Show all of the important weather for a given day)                  Check[]
*/

//TODO: get onClick handler to render WeatherListItemDetails

function WeatherListItemDetails({day}) {
    return(
        <div key={day.dt} className="weather-list-item-details">
            <h2>{day.getCity()} - {day.getFormattedDate()}</h2>
            <p>{day.getDescription()} <img src={day.getIcon()} alt={day.getDescription()} /></p>
            <p>High: {day.getHigh()}&deg;F, Low: {day.getLow()}&deg;F</p>
            <p>Humidity: {day.getHumidity()}%, Wind: {day.getWind()} mph</p>

        </div>
    )
}


function WeatherListItem({day}) {
    return (
    <div key={day.dt} className="weather-list-item">
      {day.getFormattedDate()} - High: {day.getCity()}°F, Low: {day.getLow()}°F
      <WeatherListItemDetails day={day} />
    </div>
    )
}

function WeatherList({forecast}) {
    return(
    <div id="weatherList">
    {forecast.map(day => <WeatherListItem day={day}/>)}
    </div>
    )
}



export default function App({forecast}) {

return (

<div className="app">

    <div className="zip-form">
        <form id="zipForm">

            <div className="flex-parent">
                <label htmlFor="zipcode">Zip</label>
                <input className="form-control" type="input" id="zipcode" name="zipcode" defaultValue="" required />
                <button type="submit" className="btn btn-success"> Get the forcast!</button>
            </div>
        </form>
    </div>

   <WeatherList forecast={forecast} />

</div>
)
}

// export default function WeatherListItem() {}
// export default function WeatherList() {}
// export default function DailyForecastDetails() {}


