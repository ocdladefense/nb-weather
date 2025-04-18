import React, { useState } from 'react';


const styles = {
//   list: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     justifyContent: 'center',
//   },
  item: {
    border: '1px solid black',
    padding: '10px',
    borderRadius: '20px',
    background: 'white',
    cursor: 'pointer',
    flex: '1 0 200px',
  },
};

// Component to show extra weather details when a day is selected
function WeatherListItemDetails({ day }) {
  return (
    <div key={day.dt} className="weather-list-item-details">
      <h2>{day.getCity()} - {day.getFormattedDate()}</h2>
      <p>{day.getDescription()} <img src={day.getIcon()} alt={day.getDescription()} /></p>
      <p>High: {day.getHigh()}°F, Low: {day.getLow()}°F</p>
      <p>Humidity: {day.getHumidity()}%, Wind: {day.getWind()} mph</p>
    </div>
  );
}

// Each clickable item
function WeatherListItem({ day, isSelected, onClick }) {
  return (
    <div
      className="weather-list-item"
      onClick={onClick}
      style={styles.item}
    >
      {day.getFormattedDate()} - High: {day.getHigh()}°F, Low: {day.getLow()}°F
      {isSelected && <WeatherListItemDetails day={day} />}
    </div>
  );
}

// The full list of forecast items
function WeatherList({ forecast }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); // toggle
  };

  return (
    <div id="weatherList" /*style={styles.list}*/>
      {forecast.map((day, index) => (
        <WeatherListItem
          key={index}
          day={day}
          isSelected={selectedIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}

// Main App component
export default function App() {
  const [zip, setZip] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    try {
      const controller = window.c;
      const { lat, lon, name } = await controller.fetchLatLon(zip);
      const weatherData = await controller.fetchRawData(lat, lon);
      const parsedForecast = controller.sendRawWeatherDataToParser(weatherData, name);
      setForecast(parsedForecast);
      setError('');
    } catch (err) {
      setError('Invalid ZIP code or fetch error.');
      console.error(err);
    }
  };

  return (
    <div className="app">

      <div className="zip-form">
        <form id="zipForm" onSubmit={handleFetchWeather}>

          <div className="flex-parent">
            <label htmlFor="zipcode">Zip</label>
            <input className="form-control" type="text" id="zipcode" name="zipcode" value={zip} onChange={(e) =>  {console.log(e.target.value); setZip(e.target.value)}} required/>
            <button type="submit" className="btn btn-success"> Get the forecast!</button>
          </div>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      <WeatherList forecast={forecast} />
    </div>
  );
}
