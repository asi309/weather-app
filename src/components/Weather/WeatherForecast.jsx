import { dateUtils } from '../../utils';
import { weatherMap } from '../../constants/weatherAbbrImageMap';
import './WeatherForecast.scss';

const WeatherCard = ({ date, weatherAbbr, high, low, unit }) => {
  const oneDay = 24 * 3600 * 1000;
  const today = new Date();
  const weatherDate = new Date(date);

  const difference = weatherDate - today;
  console.log(difference)

  let heading;

  if (difference / oneDay <= 1) {
    heading = 'Tomorrow';
  } else {
    heading = `${
      dateUtils.dayMap[weatherDate.getDay()]
    }, ${weatherDate.getDate()} ${dateUtils.monthMap[weatherDate.getMonth()]}`;
  }

  return (
    <div className="weather__card app__flex">
      <h2>{heading}</h2>
      <div className="weather__card-image">
        <img src={weatherMap[weatherAbbr]} alt="weather" />
      </div>
      <div className="weather__card-info">
        <div className="weather__card-info-high">
          <p className="temp">{high}</p>
          <p className="unit">&deg;{unit}</p>
        </div>
        <div className="weather__card-info-low">
          <p className="temp">{low}</p>
          <p className="unit">&deg;{unit}</p>
        </div>
      </div>
    </div>
  );
};

const WeatherForecast = ({ weather, unit }) => {
  const forecastList = weather && weather.slice(1);

  return (
    <div className="app__forecast">
      {forecastList && forecastList.map((forecast, idx) => (
        <WeatherCard
          key={`forecast-${idx}`}
          date={forecast.applicable_date}
          weatherAbbr={forecast.weather_state_abbr}
          high={Math.round(forecast.max_temp)}
          low={Math.round(forecast.min_temp)}
          unit={unit}
        />
      ))}
    </div>
  );
};

export default WeatherForecast;
