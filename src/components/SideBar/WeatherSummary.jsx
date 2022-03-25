import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationOn } from 'react-icons/md';

import {
  useGetWeatherQuery,
  useSearchLocationLatLongQuery,
} from '../../reducers';
import { locationActions } from '../../actions';
import { images } from '../../constants/images';
import { weatherMap } from '../../constants/weatherAbbrImageMap';
import { tempUtils, dateUtils } from '../../utils';
import './WeatherSummary.scss';

const WeatherSummary = () => {
  const dispatch = useDispatch();
  const latlong = useSelector((state) => state.location.latlong);
  const unit = useSelector((state) => state.location.unit);
  const { lat, long } = latlong;
  const [nearestCity, setNearestCity] = useState({});
  // let nearestCity = {};

  const { data, isFetching } = useSearchLocationLatLongQuery({ lat, long });

  useEffect(() => {
    if (data) {
      setNearestCity(data[0]);
      // nearestCity = data[0];
    }
  }, [data]);

  useEffect(() => {
    dispatch(locationActions.setWoeId(nearestCity.woeid));
    dispatch(locationActions.setLocation(nearestCity.title));
  }, [nearestCity]);

  const { data: weather, isFetching: weatherFetching } = useGetWeatherQuery(
    nearestCity?.woeid
  );

  const consolidatedWeather = weather?.consolidated_weather;
  const todayWeather = consolidatedWeather && consolidatedWeather[0];
  const weatherAbbr = consolidatedWeather
    ? consolidatedWeather[0].weather_state_abbr
    : 'loading';

  const temp = todayWeather?.the_temp;
  const weatherState = todayWeather?.weather_state_name;
  const date = new Date(todayWeather?.applicable_date);
  const location = nearestCity?.title;

  return (
    <div className="weather-summary app__flex">
      <div className="weather-summary__illustrations">
        <div className="weather-summary__bg">
          <img src={images.cloudBg} alt="background" />
        </div>
        <div className="weather-summary__icon">
          <img src={weatherMap[weatherAbbr]} alt="weather" />
        </div>
      </div>
      {todayWeather && (
        <>
          <div className="weather-summary__info app__flex">
            <div className="weather-summary__info-temperature app__flex">
              <div className="weather-summary__info-temp">
                {unit === 'C'
                  ? parseInt(temp)
                  : parseInt(tempUtils.convertToFahrenheit(temp))}
              </div>
              <div className="weather-summary__info-unit">&deg;{unit}</div>
            </div>
            <div className="weather-summary__info-status app__flex">
              {weatherState}
            </div>
          </div>
          <footer className="weather-summary__footer app__flex">
            <div className="date-time app__flex">
              <div className="today">Today</div>
              <div className="seperator-dot" />
              <div className="date">{`${
                dateUtils.dayMap[date.getDay()]
              }, ${date.getDate()} ${
                dateUtils.monthMap[date.getMonth()]
              }`}</div>
            </div>
            <div className="location app__flex">
              <MdLocationOn fontSize={18} color="#88869D" />
              <p>{location}</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default WeatherSummary;
