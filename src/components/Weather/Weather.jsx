import { useDispatch, useSelector } from 'react-redux';

import WeatherForecast from './WeatherForecast';
import WeatherHighlights from './WeatherHighlights';
import './Weather.scss';
import { locationActions } from '../../actions';
import { useGetWeatherQuery } from '../../reducers';
import { images } from '../../constants/images';

const Weather = () => {
  const dispatch = useDispatch();
  const woeId = useSelector((state) => state.location.woeId);
  const unit = useSelector((state) => state.location.unit);

  const { data: weather, isFetching } = useGetWeatherQuery(woeId);

  const todayWeather =
    weather?.consolidated_weather && weather.consolidated_weather[0];

  console.log(weather);

  const handleUnits = (e) => {
    dispatch(locationActions.setUnits(e.target.value));
  };

  return (
    <div className="app__weather app__flex">
      <div className="app__weather-controls">
        <button
          type="button"
          className={`app__weather-controls-celcius${
            unit === 'C' ? ' active' : ''
          }`}
          value="C"
          onClick={handleUnits}
        >
          &deg;C
        </button>
        <button
          type="button"
          className={`app__weather-controls-celcius${
            unit === 'F' ? ' active' : ''
          }`}
          value="F"
          onClick={handleUnits}
        >
          &deg;F
        </button>
      </div>
      <WeatherForecast weather={weather?.consolidated_weather} unit={unit} />
      {todayWeather && <WeatherHighlights weather={todayWeather} />}
      <footer className="app__flex">
        <div className="app__footer-copyright app__flex">
          <p>
            created by <b>asi309</b> -{' '}
          </p>
          <div className="app__footer-logo">
            <img src={images.devChallenges} />
          </div>
          <p>devChallenges.io</p>
        </div>
      </footer>
    </div>
  );
};

export default Weather;
