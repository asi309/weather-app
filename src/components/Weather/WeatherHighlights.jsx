import { FaLocationArrow } from 'react-icons/fa';

import './WeatherHighlights.scss';

const HighlightCards = ({ title, value, unit, wind, percentage }) => {
  let rotateAngle = 0;

  if (wind) {
    rotateAngle = -45 + wind.wind_direction;
  }

  return (
    <div className="highlight__card app__flex">
      <div className="title">{title}</div>
      <div className="value">
        <p>{Math.round(value)}</p>
        <p className="unit">{unit}</p>
      </div>
      {wind && (
        <div className="wind">
          <div
            className="wind-dir-vis"
            style={{ transform: `rotate(${rotateAngle}deg)` }}
          >
            <FaLocationArrow fontSize={12} color="#E7E7EB" />
          </div>
          <div className="compass-point">{wind.wind_direction_compass}</div>
        </div>
      )}
      {percentage && (
        <div className="percentage__container">
          <div className="percentage__labels">
            <div className="label">0</div>
            <div className="label">50</div>
            <div className="label">100</div>
          </div>
          <div className="percentage__track">
            <div className="percentage__fill" style={{ width: `${value}%` }} />
          </div>
          <div className="percentage__symbol">%</div>
        </div>
      )}
    </div>
  );
};

const WeatherHighlights = ({
  weather: {
    wind_direction,
    wind_direction_compass,
    wind_speed,
    humidity,
    visibility,
    air_pressure,
  },
}) => {
  const highlights = [
    {
      title: 'Wind status',
      value: wind_speed,
      unit: 'mph',
      wind: {
        wind_direction,
        wind_direction_compass,
      },
    },
    {
      title: 'Humidity',
      value: humidity,
      unit: '%',
      percentage: true,
    },
    {
      title: 'Visibility',
      value: visibility,
      unit: 'miles',
    },
    {
      title: 'Air Pressure',
      value: air_pressure,
      unit: 'mb',
    },
  ];

  return (
    <div className="app__highlights">
      <h1>Today’s Hightlights</h1>
      <div className="highlight-cards">
        {highlights.map((highlight, idx) => (
          <HighlightCards
            title={highlight.title}
            value={highlight.value}
            unit={highlight.unit}
            percentage={highlight?.percentage}
            wind={highlight?.wind}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherHighlights;
