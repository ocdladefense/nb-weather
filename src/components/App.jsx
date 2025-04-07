import React from 'react';

/*

/// Components:
- App (Master Component);
- ZipCodeInput(A text input for the user to enter a zip code)
- WeatherListItem (A button that summarizes the high/low for a day; it's also selectable)
- WeatherList (Parent component that displays all of the WeatherListItems)
- DailyForecastDetails (Show all of the important weather for a given day)
*/

export default function App() {

return (

<div class="app">

    <div class="zip-form">
        <form id="zipForm">

            <div class="flex-parent">
                <label for="zipcode">Zip</label>
                <input class="form-control" type="input" id="zipcode" name="zipcode" value="" required />
                <button type="submit" class="btn btn-success"> Get the forcast!</button>
            </div>
        </form>
    </div>

    <div id="weatherList">
  
    </div>

    <div id="currentDay">

    </div>
</div>


)

}

